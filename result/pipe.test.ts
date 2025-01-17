import { assertEquals } from "@std/assert";
import { createSuccess, createFail } from "./result.ts";
import { resultPipe } from "./pipe.ts";

Deno.test("resultPipe - single successful function", async () => {
  const result = await resultPipe(() => createSuccess(1));
  assertEquals(result, createSuccess(1));
});

Deno.test("resultPipe - single failing function", async () => {
  const result = await resultPipe(() => createFail("error"));
  assertEquals(result, createFail("error"));
});

Deno.test("resultPipe - chain of successful functions", async () => {
  const result = await resultPipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n + 1),
    (n: number) => createSuccess(n * 2)
  );
  assertEquals(result, createSuccess(4)); // (1 + 1) * 2 = 4
});

Deno.test("resultPipe - chain fails on first error", async () => {
  const result = await resultPipe(
    () => createSuccess(1),
    (_: number) => createFail("error"),
    (_: number) => createSuccess(3)
  );
  assertEquals(result, createFail("error"));
});

Deno.test("resultPipe - handles async functions", async () => {
  const result = await resultPipe(
    async () => createSuccess(1),
    async (n: number) => createSuccess(n + 1)
  );
  assertEquals(result, createSuccess(2));
});

Deno.test("resultPipe - mixed sync and async functions", async () => {
  const result = await resultPipe(
    () => createSuccess(1),
    async (n: number) => createSuccess(n + 1),
    (n: number) => createSuccess(n * 2)
  );
  assertEquals(result, createSuccess(4));
});

Deno.test("resultPipe - handles type transformations", async () => {
  const result = await resultPipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n.toString()),
    (s: string) => createSuccess(s + "!")
  );
  assertEquals(result, createSuccess("1!"));
});

Deno.test("resultPipe - handles empty function list", async () => {
  const result = await resultPipe(() => createSuccess("test"));
  assertEquals(result, createSuccess("test"));
});

Deno.test("resultPipe - stops execution on first failure", async () => {
  let secondFnCalled = false;

  const result = await resultPipe(
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
  const result = await resultPipe(() => {
    throw new Error("async error");
  });
  assertEquals(result, createFail("async error"));
});

Deno.test("resultPipe - handles non-Error thrown values", async () => {
  const result = await resultPipe(async () => {
    throw "string error"; // Throwing a string instead of Error
  });
  assertEquals(result, createFail("string error"));
});
