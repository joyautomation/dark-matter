import { assertEquals } from "@std/assert";
import { createSuccess, createFail } from "../result/result.ts";
import { rpipe, rpipeAsync } from "./rpipe.ts";

// Synchronous rpipe tests
Deno.test("rpipe - single successful function", () => {
  const result = rpipe(() => createSuccess(1));
  assertEquals(result, createSuccess(1));
});

Deno.test("rpipe - single failing function", () => {
  const result = rpipe(() => createFail("error"));
  assertEquals(result, createFail("error"));
});

Deno.test("rpipe - chain of successful functions", () => {
  const result = rpipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n + 1),
    (n: number) => createSuccess(n * 2)
  );
  assertEquals(result, createSuccess(4)); // (1 + 1) * 2 = 4
});

Deno.test("rpipe - chain fails on first error", () => {
  const result = rpipe(
    () => createSuccess(1),
    (_: number) => createFail("error"),
    (_: number) => createSuccess(3)
  );
  assertEquals(result, createFail("error"));
});

Deno.test("rpipe - handles type transformations", () => {
  const result = rpipe(
    () => createSuccess(1),
    (n: number) => createSuccess(n.toString()),
    (s: string) => createSuccess(s + "!")
  );
  assertEquals(result, createSuccess("1!"));
});

Deno.test("rpipe - handles empty function list", () => {
  const result = rpipe(() => createSuccess("test"));
  assertEquals(result, createSuccess("test"));
});

Deno.test("rpipe - stops execution on first failure", () => {
  let secondFnCalled = false;

  const result = rpipe(
    () => createFail("first error"),
    () => {
      secondFnCalled = true;
      return createSuccess(2);
    }
  );

  assertEquals(result, createFail("first error"));
  assertEquals(secondFnCalled, false);
});

Deno.test("rpipe - handles thrown errors", () => {
  const result = rpipe(() => {
    throw new Error("sync error");
  });
  assertEquals(result, createFail("sync error"));
});

Deno.test("rpipe - handles non-Error thrown values", () => {
  const result = rpipe(() => {
    throw "string error"; // Throwing a string instead of Error
  });
  assertEquals(result, createFail("string error"));
});

// Asynchronous rpipeAsync tests
Deno.test("rpipeAsync - single successful function", async () => {
  const result = await rpipeAsync(() => createSuccess(1));
  assertEquals(result, createSuccess(1));
});

Deno.test("rpipeAsync - single failing function", async () => {
  const result = await rpipeAsync(() => createFail("error"));
  assertEquals(result, createFail("error"));
});

Deno.test("rpipeAsync - chain of successful functions", async () => {
  const result = await rpipeAsync(
    () => createSuccess(1),
    (n: number) => createSuccess(n + 1),
    (n: number) => createSuccess(n * 2)
  );
  assertEquals(result, createSuccess(4)); // (1 + 1) * 2 = 4
});

Deno.test("rpipeAsync - chain fails on first error", async () => {
  const result = await rpipeAsync(
    () => createSuccess(1),
    (_: number) => createFail("error"),
    (_: number) => createSuccess(3)
  );
  assertEquals(result, createFail("error"));
});

Deno.test("rpipeAsync - handles async functions", async () => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const result = await rpipeAsync(
    async () => {
      await delay(10);
      return createSuccess(1);
    },
    async (n: number) => {
      await delay(10);
      return createSuccess(n + 1);
    },
    async (n: number) => {
      await delay(10);
      return createSuccess(n * 2);
    }
  );
  assertEquals(result, createSuccess(4)); // (1 + 1) * 2 = 4
});

Deno.test("rpipeAsync - handles mix of sync and async functions", async () => {
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const result = await rpipeAsync(
    () => createSuccess(1),
    async (n: number) => {
      await delay(10);
      return createSuccess(n + 1);
    },
    (n: number) => createSuccess(n * 2)
  );
  assertEquals(result, createSuccess(4));
});

Deno.test("rpipeAsync - handles type transformations", async () => {
  const result = await rpipeAsync(
    () => createSuccess(1),
    (n: number) => createSuccess(n.toString()),
    (s: string) => createSuccess(s + "!")
  );
  assertEquals(result, createSuccess("1!"));
});

Deno.test("rpipeAsync - handles empty function list", async () => {
  const result = await rpipeAsync(() => createSuccess("test"));
  assertEquals(result, createSuccess("test"));
});

Deno.test("rpipeAsync - stops execution on first failure", async () => {
  let secondFnCalled = false;

  const result = await rpipeAsync(
    () => createFail("first error"),
    () => {
      secondFnCalled = true;
      return createSuccess(2);
    }
  );

  assertEquals(result, createFail("first error"));
  assertEquals(secondFnCalled, false);
});

Deno.test("rpipeAsync - handles rejected promises", async () => {
  const result = await rpipeAsync(() => {
    throw new Error("async error");
  });
  assertEquals(result, createFail("async error"));
});

Deno.test("rpipeAsync - handles non-Error thrown values", async () => {
  const result = await rpipeAsync(() => {
    throw "string error"; // Throwing a string instead of Error
  });
  assertEquals(result, createFail("string error"));
});

Deno.test("rpipeAsync - handles Promise.resolve wrapped Results", async () => {
  const result = await rpipeAsync(
    () => Promise.resolve(createSuccess(1)),
    (n: number) => Promise.resolve(createSuccess(n + 1)),
    (n: number) => Promise.resolve(createSuccess(n * 2))
  );
  assertEquals(result, createSuccess(4));
});
