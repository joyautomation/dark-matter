import { assertEquals } from "@std/assert";
import {
  createFail,
  createSuccess,
  isFail,
  isSuccess,
  type Result,
} from "./result.ts";

Deno.test("createSuccess", () => {
  const result = createSuccess(42);
  assertEquals(result.success, true);
  assertEquals(result.output, 42);
});

Deno.test("createFail", () => {
  const result = createFail({
    error: "Operation failed",
    message: "Invalid input",
    cause: "Value out of range",
    name: "ValidationError",
  });
  assertEquals(result.success, false);
  assertEquals(result.error, "Operation failed");
  assertEquals(result.message, "Invalid input");
  assertEquals(result.cause, "Value out of range");
  assertEquals(result.name, "ValidationError");
});

Deno.test("isSuccess - success case", () => {
  const result = createSuccess(42);
  assertEquals(isSuccess(result), true);
});

Deno.test("isSuccess - failure case", () => {
  const result = createFail({
    error: "Operation failed",
    name: "ValidationError",
  });
  assertEquals(isSuccess(result), false);
});

Deno.test("isFail - success case", () => {
  const result = createFail({
    error: "Operation failed",
    name: "ValidationError",
  });
  assertEquals(isFail(result), true);
});

Deno.test("isFail - failure case", () => {
  const result = createSuccess(42);
  assertEquals(isFail(result), false);
});

Deno.test("Result type inference - success", () => {
  const result: Result<number> = createSuccess(42);
  if (isSuccess(result)) {
    const num: number = result.output;
    assertEquals(num, 42);
  }
});

Deno.test("Result type inference - failure", () => {
  const result: Result<number> = createFail({
    error: "Operation failed",
    message: "Invalid input",
    cause: "Value out of range",
    name: "ValidationError",
  });
  if (!isSuccess(result)) {
    assertEquals(result.error, "Operation failed");
    assertEquals(result.message, "Invalid input");
    assertEquals(result.cause, "Value out of range");
    assertEquals(result.name, "ValidationError");
  }
});
