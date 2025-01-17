/**
 * @module aggregate
 *
 * Provides utility functions for working with collections of Result objects.
 * These functions help in aggregating and processing multiple Results together
 * in a type-safe way.
 */

import { Result, ResultSuccess, isSuccess } from "./result.ts";

/**
 * Checks if all Results in an array are successful.
 * Acts as a type guard to narrow the type of the array to all successful Results
 * when used in a conditional.
 *
 * @template T - Array type extending Result<unknown>[]
 * @param results - Array of Results to check
 * @returns True if all Results are successful, false if any are failures
 *
 * @example
 * ```ts
 * const results = [createSuccess(1), createSuccess("test")] as const;
 * if (allSuccess(results)) {
 *   // TypeScript knows results is [ResultSuccess<1>, ResultSuccess<"test">]
 *   console.log(results[0].output); // 1
 * }
 * ```
 */
export function allSuccess<T>(
  results: Result<T>[]
): results is ResultSuccess<T>[];

/**
 * Checks if a single Result is successful.
 * Acts as a type guard to narrow the type to a successful Result.
 *
 * @template A - Type of the successful value
 * @param results - Single-element tuple containing a Result
 * @returns True if the Result is successful, false if it's a failure
 */
export function allSuccess<A>(
  results: readonly [Result<A>]
): results is readonly [ResultSuccess<A>];

/**
 * Checks if both Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @param results - Two-element tuple containing Results
 * @returns True if both Results are successful, false if any are failures
 */
export function allSuccess<A, B>(
  results: readonly [Result<A>, Result<B>]
): results is readonly [ResultSuccess<A>, ResultSuccess<B>];

/**
 * Checks if all three Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @template C - Type of the third successful value
 * @param results - Three-element tuple containing Results
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<A, B, C>(
  results: readonly [Result<A>, Result<B>, Result<C>]
): results is readonly [ResultSuccess<A>, ResultSuccess<B>, ResultSuccess<C>];

/**
 * Checks if all four Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @template C - Type of the third successful value
 * @template D - Type of the fourth successful value
 * @param results - Four-element tuple containing Results
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<A, B, C, D>(
  results: readonly [Result<A>, Result<B>, Result<C>, Result<D>]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>
];

/**
 * Checks if all five Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @template C - Type of the third successful value
 * @template D - Type of the fourth successful value
 * @template E - Type of the fifth successful value
 * @param results - Five-element tuple containing Results
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<A, B, C, D, E>(
  results: readonly [Result<A>, Result<B>, Result<C>, Result<D>, Result<E>]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>
];

/**
 * Checks if all six Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @template C - Type of the third successful value
 * @template D - Type of the fourth successful value
 * @template E - Type of the fifth successful value
 * @template F - Type of the sixth successful value
 * @param results - Six-element tuple containing Results
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<A, B, C, D, E, F>(
  results: readonly [
    Result<A>,
    Result<B>,
    Result<C>,
    Result<D>,
    Result<E>,
    Result<F>
  ]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>,
  ResultSuccess<F>
];

/**
 * Checks if all seven Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @template C - Type of the third successful value
 * @template D - Type of the fourth successful value
 * @template E - Type of the fifth successful value
 * @template F - Type of the sixth successful value
 * @template G - Type of the seventh successful value
 * @param results - Seven-element tuple containing Results
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<A, B, C, D, E, F, G>(
  results: readonly [
    Result<A>,
    Result<B>,
    Result<C>,
    Result<D>,
    Result<E>,
    Result<F>,
    Result<G>
  ]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>,
  ResultSuccess<F>,
  ResultSuccess<G>
];

/**
 * Checks if all eight Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @template C - Type of the third successful value
 * @template D - Type of the fourth successful value
 * @template E - Type of the fifth successful value
 * @template F - Type of the sixth successful value
 * @template G - Type of the seventh successful value
 * @template H - Type of the eighth successful value
 * @param results - Eight-element tuple containing Results
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<A, B, C, D, E, F, G, H>(
  results: readonly [
    Result<A>,
    Result<B>,
    Result<C>,
    Result<D>,
    Result<E>,
    Result<F>,
    Result<G>,
    Result<H>
  ]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>,
  ResultSuccess<F>,
  ResultSuccess<G>,
  ResultSuccess<H>
];

/**
 * Checks if all nine Results in a tuple are successful.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template A - Type of the first successful value
 * @template B - Type of the second successful value
 * @template C - Type of the third successful value
 * @template D - Type of the fourth successful value
 * @template E - Type of the fifth successful value
 * @template F - Type of the sixth successful value
 * @template G - Type of the seventh successful value
 * @template H - Type of the eighth successful value
 * @template I - Type of the ninth successful value
 * @param results - Nine-element tuple containing Results
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<A, B, C, D, E, F, G, H, I>(
  results: readonly [
    Result<A>,
    Result<B>,
    Result<C>,
    Result<D>,
    Result<E>,
    Result<F>,
    Result<G>,
    Result<H>,
    Result<I>
  ]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>,
  ResultSuccess<F>,
  ResultSuccess<G>,
  ResultSuccess<H>,
  ResultSuccess<I>
];

/**
 * Implementation of allSuccess that works with any array or tuple of Results.
 * Acts as a type guard to narrow the types to successful Results.
 *
 * @template T - Array type extending Result<unknown>[]
 * @param results - Array or tuple of Results to check
 * @returns True if all Results are successful, false if any are failures
 */
export function allSuccess<T extends Result<unknown>[]>(
  results: readonly [...T]
): results is {
  [K in keyof T]: T[K] extends Result<unknown>
    ? Extract<T[K], { success: true }>
    : never;
} {
  return results.every(isSuccess);
}
