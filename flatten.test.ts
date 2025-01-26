import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { flatten, unflatten } from "./flatten.ts";

describe("flatten", () => {
  it("should flatten an object into an array with id and name properties", () => {
    const input = {
      foo: { value: 1, description: "First" },
      bar: { value: 2, description: "Second" },
    };

    const result = flatten(input);

    expect(result).toEqual([
      { id: "foo", name: "foo", value: 1, description: "First" },
      { id: "bar", name: "bar", value: 2, description: "Second" },
    ]);
  });

  it("should handle empty objects", () => {
    const input = {};
    const result = flatten(input);
    expect(result).toEqual([]);
  });

  it("should handle objects with nested properties", () => {
    const input = {
      foo: {
        nested: { value: 1 },
        description: "Nested object",
      },
    };

    const result = flatten(input);

    expect(result).toEqual([
      {
        id: "foo",
        name: "foo",
        nested: { value: 1 },
        description: "Nested object",
      },
    ]);
  });
});

describe("unflatten", () => {
  it("should convert an array of objects back into an object using id as key", () => {
    const input = [
      { id: "foo", value: 1, description: "First" },
      { id: "bar", value: 2, description: "Second" },
    ];

    const result = unflatten(input);

    expect(result).toEqual({
      foo: { id: "foo", value: 1, description: "First" },
      bar: { id: "bar", value: 2, description: "Second" },
    });
  });

  it("should use name as key if id is not present", () => {
    const input = [
      { name: "foo", value: 1 },
      { name: "bar", value: 2 },
    ];

    const result = unflatten(input);

    expect(result).toEqual({
      foo: { name: "foo", value: 1 },
      bar: { name: "bar", value: 2 },
    });
  });

  it("should handle null or undefined input", () => {
    expect(unflatten(null)).toEqual({});
    expect(unflatten(undefined)).toEqual({});
  });

  it("should handle empty array", () => {
    expect(unflatten([])).toEqual({});
  });

  it("should skip items without id or name", () => {
    const input = [
      { id: "foo", value: 1 },
      { value: 2 }, // Should be skipped
      { name: "bar", value: 3 },
    ];

    const result = unflatten(input);

    expect(result).toEqual({
      foo: { id: "foo", value: 1 },
      bar: { name: "bar", value: 3 },
    });
  });

  it("should prefer id over name when both are present", () => {
    const input = [{ id: "foo", name: "different", value: 1 }];

    const result = unflatten(input);

    expect(result).toEqual({
      foo: { id: "foo", name: "different", value: 1 },
    });
  });
});
