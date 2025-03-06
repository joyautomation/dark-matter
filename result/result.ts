/**
 * @module result
 *
 * Core Result type implementation for handling success and failure cases in a type-safe way.
 * The Result type is a union of ResultSuccess and ResultFail, providing a robust way to
 * handle operations that can fail without throwing exceptions.
 *
 * @example
 * ```ts
 * const divide = (a: number, b: number): Result<number> => {
 *   if (b === 0) {
 *     return createFail("Division by zero");
 *   }
 *   return createSuccess(a / b);
 * };
 *
 * const result = divide(10, 2);
 * if (isSuccess(result)) {
 *   console.log(result.output); // 5
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */

/**
 * Represents a successful result containing a value of type T.
 *
 * @template T - The type of the successful value
 */
export interface ResultSuccess<T> {
  /** Indicates this is a successful result */
  success: true;
  /** The successful value */
  output: T;
}

/**
 * Converts an error into a string representation.
 *
 * @param error - The error to convert into a string
 * @param prefix - An optional prefix to add to the error string
 * @returns A string representation of the error
 */
export const createErrorString = (error: unknown, prefix = ""): string =>
  `${prefix}${
    error instanceof Error ? error.stack || error.message : String(error)
  }`;

/**
 * Represents a failed result containing an error message.
 */
export interface ResultFail {
  /** Indicates this is a failed result */
  success: false;
  /** Full error message string */
  error: string;
  /** short error message */
  message?: string;
  /** full stack trace */
  stack?: string;
  /** underlying cause of the error */
  cause?: unknown;
  /** error type name */
  name?: string;
}

/**
 * A Result type that can either be successful with a value of type T,
 * or a failure with an error message.
 *
 * @template T - The type of the successful value
 */
export type Result<T> = ResultSuccess<T> | ResultFail;

/**
 * Type guard that checks if a Result is successful.
 *
 * @template T - The type of the successful value
 * @param result - The Result to check
 * @returns True if the result is successful, false otherwise
 *
 * @example
 * ```ts
 * const result = createSuccess(42);
 * if (isSuccess(result)) {
 *   console.log(result.output); // TypeScript knows result.output is number
 * }
 * ```
 */
export const isSuccess = <T>(result: Result<T>): result is ResultSuccess<T> => {
  return result.success === true;
};

/**
 * Type guard that checks if a Result is a failure.
 *
 * @template T - The type of the successful value
 * @param result - The Result to check
 * @returns True if the result is a failure, false otherwise
 *
 * @example
 * ```ts
 * const result = createFail("error");
 * if (isFail(result)) {
 *   console.log(result.error); // TypeScript knows result.error exists
 * }
 * ```
 */
export const isFail = <T>(result: Result<T>): result is ResultFail => {
  return result.success === false;
};

/**
 * Creates a new successful Result containing the given value.
 *
 * @template T - The type of the successful value
 * @param output - The successful value to wrap
 * @returns A successful Result containing the value
 *
 * @example
 * ```ts
 * const result = createSuccess(42);
 * console.log(result.output); // 42
 * ```
 */
export const createSuccess = <T>(output: T): ResultSuccess<T> => ({
  success: true,
  output,
});

/**
 * Creates a new failure Result with the given error message.
 *
 * @param error - The error message describing what went wrong
 * @returns A failure Result containing the error message
 *
 * @example
 * ```ts
 * const result = createFail("Something went wrong");
 * console.log(result.error); // "Something went wrong"
 * ```
 */
export const createFail = (
  error:
    | string
    | {
      error: string;
      message?: string;
      stack?: string;
      cause?: unknown;
      name?: string;
    },
): ResultFail => ({
  success: false,
  error: typeof error === "string" ? error : error.error,
  ...(typeof error === "string" ? {} : {
    message: error.message,
    stack: error.stack,
    cause: error.cause,
    name: error.name,
  }),
});

/**
 * Unwraps a single successful Result into its value.
 * @template A - Type of the first Result value
 * @param results - Tuple containing one successful Result
 * @returns Tuple containing the unwrapped value
 */
export function unwrapResults<A>(results: readonly [ResultSuccess<A>]): [A];

/**
 * Unwraps two successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @param results - Tuple containing two successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B>(
  results: readonly [ResultSuccess<A>, ResultSuccess<B>],
): [A, B];

/**
 * Unwraps three successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @template C - Type of the third Result value
 * @param results - Tuple containing three successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B, C>(
  results: readonly [ResultSuccess<A>, ResultSuccess<B>, ResultSuccess<C>],
): [A, B, C];

/**
 * Unwraps four successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @template C - Type of the third Result value
 * @template D - Type of the fourth Result value
 * @param results - Tuple containing four successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B, C, D>(
  results: readonly [
    ResultSuccess<A>,
    ResultSuccess<B>,
    ResultSuccess<C>,
    ResultSuccess<D>,
  ],
): [A, B, C, D];

/**
 * Unwraps five successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @template C - Type of the third Result value
 * @template D - Type of the fourth Result value
 * @template E - Type of the fifth Result value
 * @param results - Tuple containing five successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B, C, D, E>(
  results: readonly [
    ResultSuccess<A>,
    ResultSuccess<B>,
    ResultSuccess<C>,
    ResultSuccess<D>,
    ResultSuccess<E>,
  ],
): [A, B, C, D, E];

/**
 * Unwraps six successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @template C - Type of the third Result value
 * @template D - Type of the fourth Result value
 * @template E - Type of the fifth Result value
 * @template F - Type of the sixth Result value
 * @param results - Tuple containing six successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B, C, D, E, F>(
  results: readonly [
    ResultSuccess<A>,
    ResultSuccess<B>,
    ResultSuccess<C>,
    ResultSuccess<D>,
    ResultSuccess<E>,
    ResultSuccess<F>,
  ],
): [A, B, C, D, E, F];

/**
 * Unwraps seven successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @template C - Type of the third Result value
 * @template D - Type of the fourth Result value
 * @template E - Type of the fifth Result value
 * @template F - Type of the sixth Result value
 * @template G - Type of the seventh Result value
 * @param results - Tuple containing seven successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B, C, D, E, F, G>(
  results: readonly [
    ResultSuccess<A>,
    ResultSuccess<B>,
    ResultSuccess<C>,
    ResultSuccess<D>,
    ResultSuccess<E>,
    ResultSuccess<F>,
    ResultSuccess<G>,
  ],
): [A, B, C, D, E, F, G];

/**
 * Unwraps eight successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @template C - Type of the third Result value
 * @template D - Type of the fourth Result value
 * @template E - Type of the fifth Result value
 * @template F - Type of the sixth Result value
 * @template G - Type of the seventh Result value
 * @template H - Type of the eighth Result value
 * @param results - Tuple containing eight successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B, C, D, E, F, G, H>(
  results: readonly [
    ResultSuccess<A>,
    ResultSuccess<B>,
    ResultSuccess<C>,
    ResultSuccess<D>,
    ResultSuccess<E>,
    ResultSuccess<F>,
    ResultSuccess<G>,
    ResultSuccess<H>,
  ],
): [A, B, C, D, E, F, G, H];

/**
 * Unwraps nine successful Results into their values.
 * @template A - Type of the first Result value
 * @template B - Type of the second Result value
 * @template C - Type of the third Result value
 * @template D - Type of the fourth Result value
 * @template E - Type of the fifth Result value
 * @template F - Type of the sixth Result value
 * @template G - Type of the seventh Result value
 * @template H - Type of the eighth Result value
 * @template I - Type of the ninth Result value
 * @param results - Tuple containing nine successful Results
 * @returns Tuple containing the unwrapped values in order
 */
export function unwrapResults<A, B, C, D, E, F, G, H, I>(
  results: readonly [
    ResultSuccess<A>,
    ResultSuccess<B>,
    ResultSuccess<C>,
    ResultSuccess<D>,
    ResultSuccess<E>,
    ResultSuccess<F>,
    ResultSuccess<G>,
    ResultSuccess<H>,
    ResultSuccess<I>,
  ],
): [A, B, C, D, E, F, G, H, I];

/**
 * Generic implementation that unwraps an array of successful Results into their values.
 * This implementation handles arrays of any length and falls back to a mapped type
 * for type inference.
 *
 * @template T - Array type extending ResultSuccess<unknown>[]
 * @param results - Array of successful Results to unwrap
 * @returns Array of unwrapped values with inferred types
 *
 * @example
 * ```ts
 * const results = [createSuccess(1), createSuccess("test")];
 * const [num, str] = unwrapResults(results); // [1, "test"]
 * ```
 */
export function unwrapResults<T extends ResultSuccess<unknown>[]>(
  results: readonly [...T],
): { [K in keyof T]: T[K] extends ResultSuccess<infer U> ? U : never } {
  return results.map((r) => {
    return r.output;
  }) as { [K in keyof T]: T[K] extends ResultSuccess<infer U> ? U : never };
}
