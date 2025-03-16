import { assertEquals } from "@std/assert";
import { createErrorString, createErrorProperties, rTry, rTryAsync } from "./error.ts";

Deno.test("createErrorString", async (t) => {
  await t.step("formats Error with stack and context", () => {
    const testError = new Error("test error");
    testError.stack = "Error: test error\n    at Test.fn";
    const withStack = createErrorString(testError);
    assertEquals(withStack, "Error: test error\n    at Test.fn");

    testError.stack = undefined;
    const withoutStack = createErrorString(testError);
    assertEquals(withoutStack, "test error");

    const withContext = createErrorString(testError, "Context: ");
    assertEquals(withContext, "Context: test error");
  });

  await t.step("formats non-Error values", () => {
    assertEquals(createErrorString("test error"), "test error");
    assertEquals(createErrorString({ message: "test error" }), "[object Object]");
    assertEquals(createErrorString(42), "42");
  });
});

Deno.test("createErrorProperties", async (t) => {
  await t.step("creates properties from Error with cause", () => {
    const cause = new Error("root cause");
    const testError = new Error("test error", { cause });
    testError.name = "TestError";
    const result = createErrorProperties(testError, "Context: ");
    assertEquals(result, {
      error: createErrorString(testError, "Context: "),
      context: "Context: ",
      message: testError.message,
      stack: testError.stack,
      cause: cause,
      name: testError.name,
    });
  });

  await t.step("creates properties from string error", () => {
    const result = createErrorProperties("test error", "Context: ");
    assertEquals(result, {
      error: "Context: test error",
      context: "Context: ",
      message: undefined,
      stack: undefined,
      cause: undefined,
      name: undefined,
    });
  });

  await t.step("creates properties from non-Error object", () => {
    const obj = { message: "test error", name: "CustomError" };
    const result = createErrorProperties(obj, "Context: ");
    assertEquals(result, {
      error: "Context: [object Object]",
      context: "Context: ",
      message: undefined,
      stack: undefined,
      cause: undefined,
      name: undefined,
    });
  });
});

Deno.test("rTry", async (t) => {
  await t.step("returns success for non-throwing function", () => {
    const result = rTry(() => 42);
    assertEquals(result.success, true);
    if (result.success) {
      assertEquals(result.output, 42);
    }
  });

  await t.step("returns fail for thrown Error", () => {
    const cause = new Error("root cause");
    const testError = new Error("test error", { cause });
    testError.name = "TestError";

    const result = rTry(() => {
      throw testError;
    });

    assertEquals(result.success, false);
    if (!result.success) {
      assertEquals(result.error, createErrorString(testError));
      assertEquals(result.message, testError.message);
      assertEquals(result.stack, testError.stack);
      assertEquals(result.cause, cause);
      assertEquals(result.name, testError.name);
    }
  });
});

Deno.test("rTryAsync", async (t) => {
  await t.step("returns success for non-throwing async function", async () => {
    const result = await rTryAsync(async () => {
      await Promise.resolve();
      return 42;
    });

    assertEquals(result.success, true);
    if (result.success) {
      assertEquals(result.output, 42);
    }
  });

  await t.step("returns fail for thrown Error in async function", async () => {
    const cause = new Error("root cause");
    const testError = new Error("test error", { cause });
    testError.name = "TestError";

    const result = await rTryAsync(async () => {
      await Promise.resolve();
      throw testError;
    });

    assertEquals(result.success, false);
    if (!result.success) {
      assertEquals(result.error, createErrorString(testError));
      assertEquals(result.message, testError.message);
      assertEquals(result.stack, testError.stack);
      assertEquals(result.cause, cause);
      assertEquals(result.name, testError.name);
    }
  });
});
