import { assertEquals } from "@std/assert";
import { rcond } from "./rcond.ts";
import { isSuccess } from "../result/result.ts";
import { createSuccess } from "../index.ts";

Deno.test("cond - matches first true condition and executes its action", () => {
  const result = rcond(5, [
    {
      condition: (n: number) => n > 10,
      action: () => createSuccess("greater than 10"),
    },
    {
      condition: (n: number) => n > 0,
      action: () => createSuccess("greater than 0"),
    },
    {
      condition: (n: number) => n === 0,
      action: () => createSuccess("equals 0"),
    },
  ]);
  assertEquals(isSuccess(result), true);
  if (isSuccess(result)) {
    assertEquals(result.output, "greater than 0");
  }
});

Deno.test("cond - works with different types", () => {
  const result = rcond("test", [
    {
      condition: (s: string) => s.length > 5,
      action: (s: string) => createSuccess(s.toUpperCase()),
    },
    {
      condition: (s: string) => s.length > 0,
      action: (s: string) => createSuccess(s.charAt(0)),
    },
  ]);
  assertEquals(isSuccess(result), true);
  if (isSuccess(result)) {
    assertEquals(result.output, "t");
  }
});

Deno.test("cond - returns failure when no condition matches", () => {
  const result = rcond(5, [
    {
      condition: (n: number) => n < 0,
      action: () => createSuccess("negative"),
    },
  ]);
  assertEquals(isSuccess(result), false);
  if (!isSuccess(result)) {
    assertEquals(result.error, "No conditional found");
  }
});

Deno.test("cond - handles complex conditions and transformations", () => {
  interface Person {
    name: string;
    age: number;
  }

  const person: Person = { name: "Alice", age: 25 };

  const result = rcond(person, [
    {
      condition: (p: Person) => p.age >= 65,
      action: () => createSuccess("Senior"),
    },
    {
      condition: (p: Person) => p.age >= 18,
      action: () => createSuccess("Adult"),
    },
    {
      condition: (p: Person) => p.age >= 13,
      action: () => createSuccess("Teen"),
    },
  ]);

  assertEquals(isSuccess(result), true);
  if (isSuccess(result)) {
    assertEquals(result.output, "Adult");
  }
});
