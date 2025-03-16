import type { Result } from "./result.ts";

/**
 * A record type where each value is a Result type.
 * Used for combining multiple Results in an object.
 * 
 * @template T - The type of the object containing Result values
 * @example
 * ```ts
 * const results: ResultRecord<{
 *   name: string;
 *   age: number;
 * }> = {
 *   name: createSuccess("Alice"),
 *   age: createSuccess(25)
 * };
 * ```
 */
export type ResultRecord<T extends Record<string, unknown>> = {
  [K in keyof T]: Result<T[K]>;
};

/**
 * Type helper for extracting success values from a ResultRecord
 * @internal
 */
type SuccessRecord<T extends ResultRecord<Record<string, unknown>>> = {
  [K in keyof T]: T[K] extends Result<infer U> ? U : never;
};

/**
 * Combines multiple Results into a single Result.
 * If all Results are successful, returns a success Result containing all values.
 * If any Result is a failure, returns the first failure encountered.
 * Preserves full error properties (error, message, stack, cause, name) when returning failures.
 *
 * @template T - Type of the array or object containing Results
 * @param results - Array or object of Results to combine
 * @returns A Result containing either all successful values or the first failure with full error details
 *
 * @example
 * ```ts
 * // Array of Results
 * const arrayResults = [createSuccess(1), createSuccess("test")];
 * const combined = combineResults(arrayResults);
 * // Success: [1, "test"]
 *
 * // Object of Results
 * const objectResults = {
 *   name: createSuccess("Alice"),
 *   age: createSuccess(25)
 * };
 * const combined = combineResults(objectResults);
 * // Success: { name: "Alice", age: 25 }
 * 
 * // Failure case preserves full error properties
 * const results = {
 *   name: createSuccess("Alice"),
 *   age: createFail({
 *     error: "Invalid age",
 *     message: "Age must be positive",
 *     cause: new Error("Validation failed"),
 *     name: "ValidationError"
 *   })
 * };
 * const combined = combineResults(results);
 * // Failure with full error details
 * ```
 */
export function combineResults<T extends Record<string, unknown>>(
  results: ResultRecord<T>
): Result<SuccessRecord<ResultRecord<T>>>;
/**
 * Combines an array of Results into a single Result.
 * If all Results are successful, returns a success Result containing an array of values.
 * If any Result is a failure, returns the first failure encountered.
 * Preserves full error properties (error, message, stack, cause, name) when returning failures.
 *
 * @template T - Type of values in the Result array
 * @param results - Array of Results to combine
 * @returns A Result containing either an array of successful values or the first failure with full error details
 */
export function combineResults<T>(results: Result<T>[]): Result<T[]>;
export function combineResults<T>(
  results: Result<T>[] | ResultRecord<Record<string, unknown>>
): Result<T[]> | Result<Record<string, unknown>> {
  if (Array.isArray(results)) {
    const values: T[] = [];
    for (const result of results) {
      if (!result.success) {
        return result;
      }
      values.push(result.output);
    }
    return { success: true, output: values };
  } else {
    const entries = Object.entries(results);
    const values: Record<string, unknown> = {};
    for (const [key, result] of entries) {
      if (!result.success) {
        return result;
      }
      values[key] = result.output;
    }
    return { success: true, output: values };
  }
}

// Aliases for backward compatibility and explicit naming
export const combineObjectOfResults = combineResults;
export const combineArrayOfResults = combineResults;
