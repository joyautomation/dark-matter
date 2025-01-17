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
 * Pipes a series of Result-returning functions together, where each function
 * receives the output of the previous function. Supports both synchronous and
 * asynchronous functions. If any function returns a failure, the pipe stops
 * and returns that failure.
 *
 * @template T - Tuple of function types that return Result or Promise<Result>
 * @param fns - Functions to pipe together
 * @returns Promise of the final Result
 * @example
 * ```ts
 * const result = await resultPipe(
 *   () => createSuccess(1),
 *   (n) => createSuccess(n + 1),
 *   (n) => createSuccess(n * 2)
 * ); // Success(4)
 * ```
 */
export { resultPipe } from "./result/pipe.ts";

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
