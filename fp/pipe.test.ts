import { assertEquals } from "@std/assert";
import { pipe, pipeAsync } from "./pipe.ts";

// Synchronous pipe tests
Deno.test("pipe - single function", () => {
  const result = pipe(1, (_x: number) => _x + 1);
  assertEquals(result, 2);
});

Deno.test("pipe - multiple functions", () => {
  const result = pipe(
    1,
    (_x: number) => _x + 1,
    (_x: number) => _x * 2
  );
  assertEquals(result, 4); // (1 + 1) * 2 = 4
});

Deno.test("pipe - functions of different types", () => {
  const result = pipe(
    1,
    (_x: number) => _x.toString(),
    (_x: string) => _x + "!"
  );
  assertEquals(result, "1!");
});

Deno.test("pipe - empty function list", () => {
  const result = pipe(1);
  assertEquals(result, 1);
});

Deno.test("pipe - functions returning undefined", () => {
  const result = pipe(
    1,
    (_x: number) => {
      _x + 1; // No return statement
    }
  );
  assertEquals(result, undefined);
});

// Asynchronous pipeAsync tests
Deno.test("pipeAsync - single async function", async () => {
  const result = await pipeAsync(1, (_x: number) => Promise.resolve(_x + 1));
  assertEquals(result, 2);
});

Deno.test("pipeAsync - multiple async functions", async () => {
  const result = await pipeAsync(
    1,
    (_x: number) => Promise.resolve(_x + 1),
    (_x: number) => Promise.resolve(_x * 2)
  );
  assertEquals(result, 4); // (1 + 1) * 2 = 4
});

Deno.test("pipeAsync - mix of sync and async functions", async () => {
  const result = await pipeAsync(
    1,
    (_x: number) => _x + 1,
    (_x: number) => Promise.resolve(_x * 2)
  );
  assertEquals(result, 4);
});

Deno.test("pipeAsync - async functions of different types", async () => {
  const result = await pipeAsync(
    1,
    (_x: number) => Promise.resolve(_x.toString()),
    (_x: string) => Promise.resolve(_x + "!")
  );
  assertEquals(result, "1!");
});

Deno.test("pipeAsync - empty function list", async () => {
  const result = await pipeAsync(1);
  assertEquals(result, 1);
});

Deno.test("pipeAsync - async functions returning undefined", async () => {
  const result = await pipeAsync(
    1,
    (_x: number) => Promise.resolve(undefined)
  );
  assertEquals(result, undefined);
});

Deno.test("pipeAsync - initial Promise value", async () => {
  const result = await pipeAsync(
    Promise.resolve(1),
    (_x: number) => Promise.resolve(_x + 1),
    (_x: number) => Promise.resolve(_x * 2)
  );
  assertEquals(result, 4);
});

Deno.test("pipeAsync - error propagation", async () => {
  try {
    await pipeAsync(
      1,
      (_x: number) => Promise.reject(new Error("Test error"))
    );
    throw new Error("Should not reach here");
  } catch (error) {
    if (error instanceof Error) {
      assertEquals(error.message, "Test error");
    } else {
      throw new Error("Unexpected error type");
    }
  }
});
