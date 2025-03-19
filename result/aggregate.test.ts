import { assertEquals } from "@std/assert";
import { createFail, createSuccess, type Result } from "./result.ts";
import { combineResults, type ResultRecord } from "./aggregate.ts";

Deno.test("combineResults - array of successes", () => {
  const results = [createSuccess(1), createSuccess(2), createSuccess(3)];
  const combined = combineResults(results);
  assertEquals(combined.success, true);
  if (combined.success) {
    assertEquals(combined.output, [1, 2, 3]);
  }
});

Deno.test("combineResults - array with failure", () => {
  const results = [
    createSuccess(1),
    createFail({
      error: "Failed to process value",
      cause: "Invalid input",
      name: "ValidationError",
    }),
    createSuccess(3),
  ];
  const combined = combineResults(results);
  assertEquals(combined.success, false);
  if (!combined.success) {
    assertEquals(combined.error, "Failed to process value");
    assertEquals(combined.cause, "Invalid input");
    assertEquals(combined.name, "ValidationError");
  }
});

Deno.test("combineResults - empty array", () => {
  const results: Result<number>[] = [];
  const combined = combineResults(results);
  assertEquals(combined.success, true);
  if (combined.success) {
    assertEquals(combined.output, []);
  }
});

Deno.test("combineResults - object with all successes", () => {
  const results = {
    name: createSuccess("test"),
    count: createSuccess(42),
    active: createSuccess(true),
  };
  const combined = combineResults(results);
  assertEquals(combined.success, true);
  if (combined.success) {
    assertEquals(combined.output, {
      name: "test",
      count: 42,
      active: true,
    });
  }
});

Deno.test("combineResults - object with failure", () => {
  const results = {
    name: createSuccess("test"),
    count: createFail({
      error: "Invalid count",
      cause: "Must be positive",
      name: "ValidationError",
    }),
  };
  const combined = combineResults(results);
  assertEquals(combined.success, false);
  if (!combined.success) {
    assertEquals(combined.error, "Invalid count");
    assertEquals(combined.cause, "Must be positive");
    assertEquals(combined.name, "ValidationError");
  }
});

Deno.test("combineResults - empty object", () => {
  const results = {} as Record<string, Result<unknown>>;
  const combined = combineResults(results);
  assertEquals(combined.success, true);
  if (combined.success) {
    assertEquals(combined.output, {});
  }
});

Deno.test("combineResults - preserves type safety for objects", () => {
  type User = Record<string, unknown> & {
    id: number;
    name: string;
    roles: string[];
  };
  
  const results = {
    id: createSuccess(1),
    name: createSuccess("test"),
    roles: createSuccess(["admin"]),
  } satisfies ResultRecord<User>;
  
  const combined = combineResults(results);
  assertEquals(combined.success, true);
  if (combined.success) {
    const user: User = combined.output;
    assertEquals(user, {
      id: 1,
      name: "test",
      roles: ["admin"],
    });
  }
});

Deno.test("combineResults - preserves type safety for arrays", () => {
  const results: Result<number>[] = [
    createSuccess(1),
    createSuccess(2),
    createSuccess(3),
  ];
  
  const combined = combineResults(results);
  assertEquals(combined.success, true);
  if (combined.success) {
    const numbers: number[] = combined.output;
    assertEquals(numbers, [1, 2, 3]);
  }
});

Deno.test("combineResults - preserves error properties", () => {
  const results = [
    createSuccess(1),
    createFail({
      error: "Failed to process value",
      cause: "Invalid input",
      name: "ValidationError",
      message: "Custom error message",
    }),
    createSuccess(3),
  ];
  const combined = combineResults(results);
  assertEquals(combined.success, false);
  if (!combined.success) {
    assertEquals(combined.error, "Failed to process value");
    assertEquals(combined.cause, "Invalid input");
    assertEquals(combined.name, "ValidationError");
    assertEquals(combined.message, "Custom error message");
  }
});