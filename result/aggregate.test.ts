import { assertEquals } from "@std/assert";
import { createFail, createSuccess, Result } from "./result.ts";
import { allSuccess } from "./aggregate.ts";

Deno.test("allSuccess - empty array returns true", () => {
  const results: Result<unknown>[] = [];
  assertEquals(allSuccess(results), true);
});

Deno.test("allSuccess - array with single success returns true", () => {
  const results = [createSuccess(1)];
  assertEquals(allSuccess(results), true);
});

Deno.test("allSuccess - array with single failure returns false", () => {
  const results = [createFail("error")];
  assertEquals(allSuccess(results), false);
});

Deno.test("allSuccess - array with all successes returns true", () => {
  const results: Result<unknown>[] = [
    createSuccess(1),
    createSuccess("test"),
    createSuccess({ key: "value" }),
  ];
  assertEquals(allSuccess(results), true);
});

Deno.test("allSuccess - array with one failure returns false", () => {
  const results: Result<unknown>[] = [
    createSuccess(1),
    createFail("error"),
    createSuccess("test"),
  ];
  assertEquals(allSuccess(results), false);
});

Deno.test("allSuccess - array with all failures returns false", () => {
  const results = [
    createFail("error1"),
    createFail("error2"),
    createFail("error3"),
  ];
  assertEquals(allSuccess(results), false);
});

Deno.test("allSuccess - type guard works with tuple", () => {
  const results: Result<unknown>[] = [
    createSuccess(1),
    createSuccess("test"),
  ] as const;
  if (allSuccess(results)) {
    // TypeScript should recognize these as success results
    const [num, str] = results;
    assertEquals(num.output, 1);
    assertEquals(str.output, "test");
  } else {
    throw new Error("Should be success");
  }
});

Deno.test("allSuccess - type guard fails with mixed results", () => {
  const results: Result<unknown>[] = [
    createSuccess(1),
    createFail("error"),
  ] as const;
  if (allSuccess(results)) {
    throw new Error("Should not be success");
  } else {
    // TypeScript should recognize this branch will be taken
    assertEquals(results[1].success, false);
  }
});
