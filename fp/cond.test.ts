import { assertEquals } from "@std/assert";
import { cond } from "./cond.ts";
import { isSuccess } from "../result/result.ts";

Deno.test("cond - matches first true condition and executes its action", () => {
  const result = cond(5, [
    {
      condition: (n: number) => n > 10,
      action: () => "greater than 10",
    },
    {
      condition: (n: number) => n > 0,
      action: () => "greater than 0",
    },
    {
      condition: (n: number) => n === 0,
      action: () => "equals 0",
    },
  ]);
  assertEquals(isSuccess(result), true);
  if (isSuccess(result)) {
    assertEquals(result.output, "greater than 0");
  }
});

Deno.test("cond - works with different types", () => {
  const result = cond("test", [
    {
      condition: (s: string) => s.length > 5,
      action: (s: string) => s.toUpperCase(),
    },
    {
      condition: (s: string) => s.length > 0,
      action: (s: string) => s.charAt(0),
    },
  ]);
  assertEquals(isSuccess(result), true);
  if (isSuccess(result)) {
    assertEquals(result.output, "t");
  }
});

Deno.test("cond - returns failure when no condition matches", () => {
  const result = cond(5, [
    {
      condition: (n: number) => n < 0,
      action: () => "negative",
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

  const result = cond(person, [
    {
      condition: (p: Person) => p.age >= 65,
      action: () => "Senior",
    },
    {
      condition: (p: Person) => p.age >= 18,
      action: () => "Adult",
    },
    {
      condition: (p: Person) => p.age >= 13,
      action: () => "Teen",
    },
  ]);

  assertEquals(isSuccess(result), true);
  if (isSuccess(result)) {
    assertEquals(result.output, "Adult");
  }
});
