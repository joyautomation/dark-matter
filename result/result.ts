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
 * Represents a failed result containing an error message.
 */
export interface ResultFail {
  /** Indicates this is a failed result */
  success: false;
  /** The error message describing what went wrong */
  error: string;
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
export const createFail = (error: string): ResultFail => ({
  success: false,
  error,
});

/**
 * Unwraps an array of Results into an array of their successful values.
 * If any Result in the array is a failure, throws an error.
 * 
 * @template T - Tuple type extending Result<unknown>[]
 * @param results - Array of Results to unwrap
 * @returns Array of unwrapped values with correct types
 * @throws Error if any Result is a failure
 * 
 * @example
 * ```ts
 * const results = [createSuccess(1), createSuccess("test")];
 * const [num, str] = unwrapResults(results); // [1, "test"]
 * ```
 */
export function unwrapResults<T extends Result<unknown>[]>(
  results: [...T]
): { [K in keyof T]: T[K] extends Result<infer U> ? U : never } {
  return results.map((r) => {
    if (!isSuccess(r)) {
      throw new Error(`Cannot unwrap failed result: ${r.error}`);
    }
    return r.output;
  }) as { [K in keyof T]: T[K] extends Result<infer U> ? U : never };
}
