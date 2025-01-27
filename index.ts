/**
 * @module dark-matter
 *
 * Dark matter is a TypeScript library for handling success and failure cases in a type-safe way.
 * It provides a Result type system and utilities for working with Results, including type guards,
 * creation functions, and composition utilities.
 *
 * @example
 * ```ts
 * import { createSuccess, createFail, isSuccess, resultPipe } from "@joyautomation/dark-matter";
 *
 * // Create Results
 * const success = createSuccess(42);
 * const failure = createFail("Something went wrong");
 *
 * // Use type guards
 * if (isSuccess(success)) {
 *   console.log(success.output); // 42
 * }
 *
 * // Compose functions
 * const result = await resultPipe(
 *   () => createSuccess(1),
 *   (n) => createSuccess(n + 1)
 * );
 * ```
 */

/**
 * Type guard that checks if a Result is a failure.
 *
 * @template T - The type of the successful result value
 * @param result - The Result to check
 * @returns True if the result is a failure, false otherwise
 * @example
 * ```ts
 * const result = createFail("error");
 * if (isFail(result)) {
 *   console.log(result.error); // "error"
 * }
 * ```
 */
export { isFail } from "./result/result.ts";

/**
 * Type guard that checks if a Result is successful.
 *
 * @template T - The type of the successful result value
 * @param result - The Result to check
 * @returns True if the result is successful, false otherwise
 * @example
 * ```ts
 * const result = createSuccess(42);
 * if (isSuccess(result)) {
 *   console.log(result.output); // 42
 * }
 * ```
 */
export { isSuccess } from "./result/result.ts";

/**
 * Creates a new failure Result with the given error message.
 *
 * @param error - The error message
 * @returns A failure Result containing the error message
 * @example
 * ```ts
 * const result = createFail("Something went wrong");
 * console.log(result.error); // "Something went wrong"
 * ```
 */
export { createFail } from "./result/result.ts";

/**
 * Creates a new successful Result with the given value.
 *
 * @template T - The type of the successful value
 * @param output - The successful value
 * @returns A successful Result containing the value
 * @example
 * ```ts
 * const result = createSuccess(42);
 * console.log(result.output); // 42
 * ```
 */
export { createSuccess } from "./result/result.ts";

/**
 * Unwraps an array of Results into an array of their values.
 * Throws an error if any of the Results are failures.
 *
 * @template T - Tuple type extending Result<unknown>[]
 * @param results - Array of Results to unwrap
 * @returns Array of unwrapped values with correct types
 * @throws Error if any Result is a failure
 * @example
 * ```ts
 * const results = [createSuccess(1), createSuccess("test")];
 * const [num, str] = unwrapResults(results); // [1, "test"]
 * ```
 */
export { unwrapResults } from "./result/result.ts";

/**
 * Type guard that checks if all Results in an array are successful.
 * Provides tuple type inference for up to 9 elements.
 *
 * @template T - Type of the array elements or tuple types
 * @param results - Array or tuple of Results to check
 * @returns True if all Results are successful, false otherwise
 * @example
 * ```ts
 * const results = [createSuccess(1), createSuccess("test")];
 * if (allSuccess(results)) {
 *   // TypeScript knows results is [ResultSuccess<number>, ResultSuccess<string>]
 *   console.log(results.map(r => r.output)); // [1, "test"]
 * }
 * ```
 */
export { allSuccess } from "./result/aggregate.ts";

/**
 * A Result type that can either be successful with a value of type T,
 * or a failure with an error message. This is the main type used throughout
 * the library for handling operations that can fail.
 *
 * @template T - The type of the successful value
 *
 * @example
 * ```ts
 * function divide(a: number, b: number): Result<number> {
 *   if (b === 0) {
 *     return createFail("Division by zero");
 *   }
 *   return createSuccess(a / b);
 * }
 * ```
 */
export type { Result } from "./result/result.ts";

/**
 * Represents a successful result containing a value of type T.
 * This type is used when an operation succeeds and returns a value.
 *
 * @template T - The type of the successful value
 *
 * @example
 * ```ts
 * const success: ResultSuccess<number> = {
 *   success: true,
 *   output: 42
 * };
 * ```
 */
export type { ResultSuccess } from "./result/result.ts";

/**
 * Represents a failed result containing an error message.
 * This type is used when an operation fails and returns an error.
 *
 * @example
 * ```ts
 * const failure: ResultFail = {
 *   success: false,
 *   error: "Something went wrong"
 * };
 * ```
 */
export type { ResultFail } from "./result/result.ts";

/**
 * Evaluates a series of condition-action pairs and returns the output of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template U - The return type of the actions
 * @param {T} args - The value to test against conditions
 * @param {Array<{ condition: (input: T) => boolean; action: (input: T) => U }>} conditionals - Array of condition-action pairs
 * @returns {U} The output of the first matching action
 * @throws {Error} When no condition matches
 * @example
 * ```ts
 * const result = cond(
 *   5,
 *   [
 *     { condition: (n) => n < 0, action: (n) => `${n} is negative` },
 *     { condition: (n) => n > 0, action: (n) => `${n} is positive` }
 *   ]
 * ); // "5 is positive"
 * ```
 */
export { cond } from "./fp/cond.ts";

/**
 * Evaluates a series of condition-action pairs and returns the Result of the first matching condition's action.
 * Each condition returns a Result type, making this function highly flexible for branching logic with error handling.
 *
 * @template T - The type of the input value to check against conditions
 * @template U - The type of value wrapped in the Result returned by the action functions
 *
 * @example
 * ```ts
 * const ageGroup = rcond(25, [
 *   {
 *     condition: (age: number) => age >= 65,
 *     action: () => createSuccess("Senior")
 *   },
 *   {
 *     condition: (age: number) => age >= 18,
 *     action: () => createSuccess("Adult")
 *   },
 *   {
 *     condition: (age: number) => age >= 13,
 *     action: () => createSuccess("Teen")
 *   }
 * ]);
 *
 * if (isSuccess(ageGroup)) {
 *   console.log(ageGroup.output); // "Adult"
 * }
 * ```
 */
export { rcond } from "./fp/rcond.ts";

/**
 * Pipes a series of functions together, where each function receives the output of the previous function.
 * Supports both synchronous and asynchronous functions. If any function returns a failure, the pipe stops
 * and returns that failure.
 *
 * @template T - The type of the input value to pipe through the functions
 * @template A - The type of the output value returned by the last function
 * @template B - The type of the output value returned by the second-to-last function
 * @template C - The type of the output value returned by the third-to-last function
 *
 * @example
 * ```ts
 * const result = pipe(3, addOne, double, square);
 * console.log(result); // 64
 * ```
 */
export { pipe } from "./fp/pipe.ts";

/**
 * Pipes a series of synchronous Result-returning functions together, where each function
 * receives the output of the previous function. If any function returns a failure,
 * the pipe stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @returns The final Result
 * @example
 * ```ts
 * const result = rpipe(
 *   () => createSuccess(1),
 *   (n) => createSuccess(n + 1)
 * ); // Success(2)
 * ```
 */
export { rpipe } from "./fp/rpipe.ts";

/**
 * Pipes a series of Result-returning functions together, where each function
 * receives the output of the previous function. Supports both synchronous and
 * asynchronous functions. If any function returns a failure or throws an error,
 * the pipe stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @returns Promise of the final Result
 * @example
 * ```ts
 * const result = await rpipeAsync(
 *   () => createSuccess(1),
 *   async (n) => createSuccess(n + 1)
 * ); // Success(2)
 * ```
 */
export { rpipeAsync } from "./fp/rpipe.ts";

/**
 * Performs left-to-right function composition with support for both synchronous and asynchronous functions.
 * Takes an initial value and applies a series of functions to it in sequence, awaiting any Promise results.
 *
 * @template T - The type of the initial value
 * @template A,B,C,D,E,F,G,H,I - The return types of each function in the pipeline
 * @param initial - The starting value to pipe through the functions
 * @param fns - A series of async or sync functions to apply in sequence
 * @returns Promise of the result of applying all functions in sequence to the initial value
 * @example
 * ```ts
 * // Mix of sync and async functions
 * await pipeAsync(
 *   3,
 *   x => x + 1,                    // sync
 *   async x => x * 2,              // async
 *   x => x * x                     // sync
 * )
 * ```
 */
export { pipeAsync } from "./fp/pipe.ts";

/**
 * Creates a formatted error string from an error object or any unknown value.
 * If the input is an Error object, it will use the stack trace if available,
 * otherwise falling back to the error message. For non-Error values, it converts
 * them to strings.
 *
 * @param {unknown} error - The error object or value to format
 * @param {string} [prefix=""] - Optional prefix to prepend to the error string
 * @returns {string} A formatted error string with optional prefix
 *
 * @example
 * ```ts
 * // With an Error object
 * const error = new Error("Something went wrong");
 * createErrorString(error); // Returns stack trace or "Something went wrong"
 *
 * // With a prefix
 * createErrorString(error, "MyApp: "); // Returns "MyApp: Something went wrong"
 *
 * // With a non-Error value
 * createErrorString("Invalid input"); // Returns "Invalid input"
 * ```
 */
export const createErrorString = (error: unknown, prefix = ""): string =>
  `${prefix}${
    error instanceof Error ? error.stack || error.message : String(error)
  }`;

/**
 * Flattens an object into an array of objects, adding 'id' and 'name' properties to each.
 * @template T - The type of the values in the input object
 * @example
 * const input = { foo: { bar: 1 }, baz: { qux: 2 } };
 * const result = flatten(input);
 * // Result: [{ id: 'foo', name: 'foo', bar: 1 }, { id: 'baz', name: 'baz', qux: 2 }]
 */
export { flatten } from "./flatten.ts";

/**
 * Converts an array of objects with 'id' or 'name' properties back into an object.
 * The 'id' or 'name' property of each item becomes the key in the resulting object.
 * @template T - The type of objects in the input array
 * @example
 * const input = [{ id: 'foo', bar: 1 }, { id: 'baz', qux: 2 }];
 * const result = unflatten(input);
 * // Result: { foo: { id: 'foo', bar: 1 }, baz: { id: 'baz', qux: 2 } }
 */
export { unflatten } from "./flatten.ts";
