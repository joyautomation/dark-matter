import { assertEquals } from "@std/assert";
import {
  createFail,
  createSuccess,
  isFail,
  isSuccess,
  type Result,
  ResultSuccess,
  unwrapResults,
} from "./result.ts";

// Test createSuccess
Deno.test("createSuccess - creates success result with number", () => {
  const result = createSuccess(42);
  assertEquals(result, { success: true, output: 42 });
});

Deno.test("createSuccess - creates success result with string", () => {
  const result = createSuccess("test");
  assertEquals(result, { success: true, output: "test" });
});

Deno.test("createSuccess - creates success result with object", () => {
  const result = createSuccess({ key: "value" });
  assertEquals(result, { success: true, output: { key: "value" } });
});

Deno.test("createSuccess - creates success result with array", () => {
  const result = createSuccess([1, 2, 3]);
  assertEquals(result, { success: true, output: [1, 2, 3] });
});

// Test createFail
Deno.test("createFail - creates fail result with string error", () => {
  const result = createFail("error message");
  assertEquals(result, { success: false, error: "error message" });
});

// Test isSuccess type guard
Deno.test("isSuccess - returns true for success result", () => {
  const result = createSuccess(42);
  assertEquals(isSuccess(result), true);
});

Deno.test("isSuccess - returns false for fail result", () => {
  const result = createFail("error");
  assertEquals(isSuccess(result), false);
});

Deno.test("isSuccess - type guard narrows type correctly", () => {
  const result: Result<number> = createSuccess(42);
  if (isSuccess(result)) {
    // TypeScript should recognize result as ResultSuccess<number>
    const output: number = result.output;
    assertEquals(output, 42);
  }
});

// Test isFail type guard
Deno.test("isFail - returns true for fail result", () => {
  const result = createFail("error");
  assertEquals(isFail(result), true);
});

Deno.test("isFail - returns false for success result", () => {
  const result = createSuccess(42);
  assertEquals(isFail(result), false);
});

Deno.test("isFail - type guard narrows type correctly", () => {
  const result: Result<number> = createFail("error");
  if (isFail(result)) {
    // TypeScript should recognize result as ResultFail
    const error: string = result.error;
    assertEquals(error, "error");
  }
});

// Test type inference
Deno.test("Result type - infers correct types", () => {
  const numberResult: Result<number> = createSuccess(42);
  const stringResult: Result<string> = createSuccess("test");
  const objectResult: Result<{ key: string }> = createSuccess({ key: "value" });
  const failResult: Result<never> = createFail("error");

  assertEquals(isSuccess(numberResult), true);
  assertEquals(isSuccess(stringResult), true);
  assertEquals(isSuccess(objectResult), true);
  assertEquals(isFail(failResult), true);
});

// Test unwrapResults with different types
Deno.test("unwrapResults - works with tuples of different lengths", () => {
  const results: readonly [
    ResultSuccess<number>,
    ResultSuccess<string>,
    ResultSuccess<{ key: string }>,
    ResultSuccess<[number, number, number]>,
  ] = [
    createSuccess(1),
    createSuccess("test"),
    createSuccess({ key: "value" }),
    createSuccess([1, 2, 3]),
  ];

  const unwrapped = unwrapResults(results);
  assertEquals(unwrapped, [1, "test", { key: "value" }, [1, 2, 3]]);
});
