import { assertEquals, assertThrows } from "@std/assert";
import { cond } from "./cond.ts";

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
  assertEquals(result, "greater than 0");
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
  assertEquals(result, "t");
});

Deno.test("cond - throws error when no condition matches", () => {
  assertThrows(
    () =>
      cond(5, [
        {
          condition: (n: number) => n < 0,
          action: () => "negative",
        },
      ]),
    Error,
    "No conditional found"
  );
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

  assertEquals(result, "Adult");
});
