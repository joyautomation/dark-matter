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
export function allSuccess<A>(
  results: readonly [Result<A>]
): results is readonly [ResultSuccess<A>];
export function allSuccess<A, B>(
  results: readonly [Result<A>, Result<B>]
): results is readonly [ResultSuccess<A>, ResultSuccess<B>];
export function allSuccess<A, B, C>(
  results: readonly [Result<A>, Result<B>, Result<C>]
): results is readonly [ResultSuccess<A>, ResultSuccess<B>, ResultSuccess<C>];
export function allSuccess<A, B, C, D>(
  results: readonly [Result<A>, Result<B>, Result<C>, Result<D>]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>
];
export function allSuccess<A, B, C, D, E>(
  results: readonly [Result<A>, Result<B>, Result<C>, Result<D>, Result<E>]
): results is readonly [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>
];
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
export function allSuccess<T extends Result<unknown>[]>(
  results: readonly [...T]
): results is {
  [K in keyof T]: T[K] extends Result<unknown>
    ? Extract<T[K], { success: true }>
    : never;
} {
  return results.every(isSuccess);
}
