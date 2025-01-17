import { Result, ResultSuccess, isSuccess } from "./result.ts";

/**
 * Type guard that checks if all Results in an array are successful.
 * Provides tuple type inference for up to 9 elements.
 */
export function allSuccess<T>(
  results: Result<T>[]
): results is ResultSuccess<T>[];
export function allSuccess<A>(
  results: [Result<A>]
): results is [ResultSuccess<A>];
export function allSuccess<A, B>(
  results: [Result<A>, Result<B>]
): results is [ResultSuccess<A>, ResultSuccess<B>];
export function allSuccess<A, B, C>(
  results: [Result<A>, Result<B>, Result<C>]
): results is [ResultSuccess<A>, ResultSuccess<B>, ResultSuccess<C>];
export function allSuccess<A, B, C, D>(
  results: [Result<A>, Result<B>, Result<C>, Result<D>]
): results is [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>
];
export function allSuccess<A, B, C, D, E>(
  results: [Result<A>, Result<B>, Result<C>, Result<D>, Result<E>]
): results is [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>
];
export function allSuccess<A, B, C, D, E, F>(
  results: [Result<A>, Result<B>, Result<C>, Result<D>, Result<E>, Result<F>]
): results is [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>,
  ResultSuccess<F>
];
export function allSuccess<A, B, C, D, E, F, G>(
  results: [
    Result<A>,
    Result<B>,
    Result<C>,
    Result<D>,
    Result<E>,
    Result<F>,
    Result<G>
  ]
): results is [
  ResultSuccess<A>,
  ResultSuccess<B>,
  ResultSuccess<C>,
  ResultSuccess<D>,
  ResultSuccess<E>,
  ResultSuccess<F>,
  ResultSuccess<G>
];
export function allSuccess<A, B, C, D, E, F, G, H>(
  results: [
    Result<A>,
    Result<B>,
    Result<C>,
    Result<D>,
    Result<E>,
    Result<F>,
    Result<G>,
    Result<H>
  ]
): results is [
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
  results: [
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
): results is [
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
export function allSuccess(results: Result<unknown>[]): boolean {
  return results.every((result) => isSuccess(result));
}
