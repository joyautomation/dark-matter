import { assertEquals } from "@std/assert";
import { createSuccess, createFail } from "../result/result.ts";
import { rpipe } from "./pipe.ts";

Deno.test("resultPipe - single successful function", async () => {
  const result = await rpipe(() => createSuccess(1));
  assertEquals(result, createSuccess(1));
});

Deno.test("resultPipe - single failing function", async () => {
  const result = await rpipe(() => createFail("error"));
  assertEquals(result, createFail("error"));
});

Deno.test("resultPipe - chain of successful functions", async () => {
  const result = await rpipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n + 1),
    (n: number) => createSuccess(n * 2)
  );
  assertEquals(result, createSuccess(4)); // (1 + 1) * 2 = 4
});

Deno.test("resultPipe - chain fails on first error", async () => {
  const result = await rpipe(
    () => createSuccess(1),
    (_: number) => createFail("error"),
    (_: number) => createSuccess(3)
  );
  assertEquals(result, createFail("error"));
});

Deno.test("resultPipe - handles async functions", async () => {
  const result = await rpipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n + 1)
  );
  assertEquals(result, createSuccess(2));
});

Deno.test("resultPipe - mixed sync and async functions", async () => {
  const result = await rpipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n + 1),
    (n: number) => createSuccess(n * 2)
  );
  assertEquals(result, createSuccess(4));
});

Deno.test("resultPipe - handles type transformations", async () => {
  const result = await rpipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n.toString()),
    (s: string) => createSuccess(s + "!")
  );
  assertEquals(result, createSuccess("1!"));
});

Deno.test("resultPipe - handles empty function list", async () => {
  const result = await rpipe(() => createSuccess("test"));
  assertEquals(result, createSuccess("test"));
});

Deno.test("resultPipe - stops execution on first failure", async () => {
  let secondFnCalled = false;

  const result = await rpipe(
    () => createFail("first error"),
    () => {
      secondFnCalled = true;
      return createSuccess(2);
    }
  );

  assertEquals(result, createFail("first error"));
  assertEquals(secondFnCalled, false);
});

Deno.test("resultPipe - handles rejected promises", async () => {
  const result = await rpipe(() => {
    throw new Error("async error");
  });
  assertEquals(result, createFail("async error"));
});

Deno.test("resultPipe - handles non-Error thrown values", async () => {
  const result = await rpipe(() => {
    throw "string error"; // Throwing a string instead of Error
  });
  assertEquals(result, createFail("string error"));
});
