import { assertEquals, assertMatch } from "https://deno.land/std/assert/mod.ts";
import { createErrorString, createErrorProperties, rTry, rTryAsync } from "./error.ts";
import { isFail, isSuccess } from "./result.ts";

Deno.test("createErrorString", async (t) => {
  await t.step("formats Error object with stack trace", () => {
    const error = new Error("test error");
    const result = createErrorString(error);
    assertMatch(result, /^Error: test error(\n\s+at|$)/);
  });

  await t.step("formats Error object without stack trace", () => {
    const error = new Error("test error");
    error.stack = undefined;
    assertEquals(createErrorString(error), "test error");
  });

  await t.step("formats non-Error values", () => {
    assertEquals(createErrorString("string error"), "string error");
    assertEquals(createErrorString(123), "123");
    assertEquals(createErrorString({ foo: "bar" }), "[object Object]");
  });

  await t.step("adds context prefix", () => {
    const error = new Error("test error");
    assertEquals(
      createErrorString("string error", "Context: "),
      "Context: string error"
    );
  });
});

Deno.test("createErrorProperties", async (t) => {
  await t.step("creates properties from Error object", () => {
    const cause = new Error("cause error");
    const error = new Error("test error", { cause });
    error.name = "TestError";
    const props = createErrorProperties(error);

    assertMatch(props.error, /^TestError: test error(\n\s+at|$)/);
    assertEquals(props.message, "test error");
    assertMatch(props.stack || "", /^TestError: test error(\n\s+at|$)/);
    assertEquals(props.cause, cause);
    assertEquals(props.name, "TestError");
  });

  await t.step("creates properties from non-Error value", () => {
    const props = createErrorProperties("string error");
    assertEquals(props.error, "string error");
    assertEquals(props.message, undefined);
    assertEquals(props.stack, undefined);
    assertEquals(props.cause, undefined);
    assertEquals(props.name, undefined);
  });

  await t.step("includes context in error string", () => {
    const error = new Error("test error");
    const props = createErrorProperties(error, "Context: ");
    assertMatch(props.error, /^Context: Error: test error(\n\s+at|$)/);
    assertEquals(props.context, "Context: ");
  });
});

Deno.test("rTry", async (t) => {
  await t.step("returns success for successful function", () => {
    const result = rTry(() => "success");
    assertEquals(isSuccess(result), true);
    if (isSuccess(result)) {
      assertEquals(result.output, "success");
    }
  });

  await t.step("returns success with function arguments", () => {
    const fn = (x: number, y: number) => x + y;
    const result = rTry(() => fn(2, 3));
    assertEquals(isSuccess(result), true);
    if (isSuccess(result)) {
      assertEquals(result.output, 5);
    }
  });

  await t.step("returns fail for thrown Error", () => {
    const cause = new Error("cause error");
    const error = new Error("test error", { cause });
    error.name = "TestError";

    const result = rTry(() => {
      throw error;
    });

    assertEquals(isFail(result), true);
    if (isFail(result)) {
      assertMatch(result.error, /^TestError: test error(\n\s+at|$)/);
      assertEquals(result.message, "test error");
      assertMatch(result.stack || "", /^TestError: test error(\n\s+at|$)/);
      assertEquals(result.cause, cause);
      assertEquals(result.name, "TestError");
    }
  });

  await t.step("returns fail for thrown non-Error value", () => {
    const result = rTry(() => {
      throw "string error";
    });

    assertEquals(isFail(result), true);
    if (isFail(result)) {
      assertEquals(result.error, "string error");
      assertEquals(result.message, undefined);
      assertEquals(result.stack, undefined);
      assertEquals(result.cause, undefined);
      assertEquals(result.name, undefined);
    }
  });
});

Deno.test("rTryAsync", async (t) => {
  await t.step("returns success for successful async function", async () => {
    const asyncFn = async () => {
      await Promise.resolve();
      return "async success";
    };

    const result = await rTryAsync(asyncFn);
    assertEquals(isSuccess(result), true);
    if (isSuccess(result)) {
      assertEquals(result.output, "async success");
    }
  });

  await t.step("returns success with async function arguments", async () => {
    const fn = async (x: number, y: number) => {
      await Promise.resolve();
      return x + y;
    };
    const result = await rTryAsync(() => fn(2, 3));
    assertEquals(isSuccess(result), true);
    if (isSuccess(result)) {
      assertEquals(result.output, 5);
    }
  });

  await t.step("returns fail for thrown Error in async function", async () => {
    const cause = new Error("cause error");
    const error = new Error("test error", { cause });
    error.name = "TestError";

    const result = await rTryAsync(async () => {
      await Promise.resolve();
      throw error;
    });

    assertEquals(isFail(result), true);
    if (isFail(result)) {
      assertMatch(result.error, /^TestError: test error(\n\s+at|$)/);
      assertEquals(result.message, "test error");
      assertMatch(result.stack || "", /^TestError: test error(\n\s+at|$)/);
      assertEquals(result.cause, cause);
      assertEquals(result.name, "TestError");
    }
  });

  await t.step("returns fail for thrown non-Error value in async function", async () => {
    const result = await rTryAsync(async () => {
      await Promise.resolve();
      throw "string error";
    });

    assertEquals(isFail(result), true);
    if (isFail(result)) {
      assertEquals(result.error, "string error");
      assertEquals(result.message, undefined);
      assertEquals(result.stack, undefined);
      assertEquals(result.cause, undefined);
      assertEquals(result.name, undefined);
    }
  });
});
