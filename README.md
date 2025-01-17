# Dark Matter

Dark matter is a TypeScript library for handling success and failure cases in a type-safe way. It provides a Result type system and utilities for working with Results, including type guards, creation functions, and composition utilities.

## Installation

```bash
deno add @joyautomation/dark-matter
```

## Usage

### Creating Results

Use `createSuccess` and `createFail` to create Result objects:

```typescript
import { createSuccess, createFail } from "@joyautomation/dark-matter";

// Create a success result
const success = createSuccess(42);
// Type: ResultSuccess<number>
// Value: { success: true, output: 42 }

// Create a failure result
const failure = createFail("Something went wrong");
// Type: ResultFail
// Value: { success: false, error: "Something went wrong" }
```

### Type Guards

Use `isSuccess` and `isFail` to check the type of a Result:

```typescript
import { isSuccess, isFail } from "@joyautomation/dark-matter";

const result = createSuccess(42);

if (isSuccess(result)) {
  // TypeScript knows result.output is a number
  console.log(result.output * 2); // 84
}

if (isFail(result)) {
  // TypeScript knows result.error exists
  console.log(result.error);
}
```

### Unwrapping Results

Use `unwrapResults` to safely extract values from an array of Results:

```typescript
import { unwrapResults } from "@joyautomation/dark-matter";

const results = [
  createSuccess(1),
  createSuccess("hello"),
  createSuccess({ key: "value" })
] as const;

// Unwrap all results at once
const [num, str, obj] = unwrapResults(results);
// num: 1
// str: "hello"
// obj: { key: "value" }

// Throws if any result is a failure
try {
  unwrapResults([createSuccess(1), createFail("error")]);
} catch (e) {
  console.error(e); // "Cannot unwrap failed result: error"
}
```

### Piping Functions

Use `resultPipe` to compose functions that return Results:

```typescript
import { resultPipe } from "@joyautomation/dark-matter";

const addOne = (n: number) => createSuccess(n + 1);
const double = (n: number) => createSuccess(n * 2);
const validatePositive = (n: number) =>
  n > 0 ? createSuccess(n) : createFail("Number must be positive");

// Pipe synchronous functions
const result1 = await resultPipe(
  () => createSuccess(5),
  addOne,
  double
); // Success(12)

// Pipe async functions
const result2 = await resultPipe(
  async () => createSuccess(1),
  async (n) => createSuccess(n + 1),
  validatePositive
); // Success(2)

// Early failure
const result3 = await resultPipe(
  () => createSuccess(-1),
  validatePositive, // Fails here
  double // Never executed
); // Fail("Number must be positive")
```

### Working with Collections

Use `allSuccess` to check if all Results in a collection are successful:

```typescript
import { allSuccess } from "@joyautomation/dark-matter";

const results = [
  createSuccess(1),
  createSuccess("test")
] as const;

if (allSuccess(results)) {
  // TypeScript knows results is [ResultSuccess<1>, ResultSuccess<"test">]
  const [num, str] = results.map(r => r.output);
  console.log(num, str); // 1, "test"
}

// Works with any number of results
const mixed = [createSuccess(1), createFail("error"), createSuccess(3)];
console.log(allSuccess(mixed)); // false
```

## License

GPL-3.0