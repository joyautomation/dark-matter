/**
 * @module pipe
 *
 * Provides a pipe function for composing Result-returning functions in a type-safe way.
 * The pipe function handles both synchronous and asynchronous functions, and properly
 * propagates failures through the pipeline.
 *
 * @example
 * ```ts
 * const result = await resultPipe(
 *   () => createSuccess(1),
 *   (n) => createSuccess(n + 1),
 *   async (n) => createSuccess(n * 2)
 * ); // Success(4)
 * ```
 */

import type { Result } from "../result/result.ts";
import { isFail, createFail } from "../result/result.ts";

/**
 * Pipes a series of Result-returning functions together, where each function
 * receives the output of the previous function. Supports both synchronous and
 * asynchronous functions. If any function returns a failure or throws an error,
 * the pipe stops and returns that failure.
 *
 * The pipe function is overloaded to support up to 9 functions in the pipeline
 * while maintaining proper type inference for each step.
 *
 * @template A - Type of the first function's success value
 * @returns Promise of the final Result
 */
export function resultPipe<A>(
  fn1: () => Result<A> | Promise<Result<A>>
): Promise<Result<A>>;

/**
 * Pipes two Result-returning functions together.
 * Takes the output of the first function and passes it to the second.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>
): Promise<Result<B>>;

/**
 * Pipes three Result-returning functions together.
 * Takes the output of each function and passes it to the next.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @template C - Type of the third function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @param fn3 - The third function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B, C>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>
): Promise<Result<C>>;

/**
 * Pipes four Result-returning functions together.
 * Takes the output of each function and passes it to the next.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @template C - Type of the third function's success value
 * @template D - Type of the fourth function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @param fn3 - The third function to pipe
 * @param fn4 - The fourth function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B, C, D>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>
): Promise<Result<D>>;

/**
 * Pipes five Result-returning functions together.
 * Takes the output of each function and passes it to the next.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @template C - Type of the third function's success value
 * @template D - Type of the fourth function's success value
 * @template E - Type of the fifth function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @param fn3 - The third function to pipe
 * @param fn4 - The fourth function to pipe
 * @param fn5 - The fifth function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B, C, D, E>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>
): Promise<Result<E>>;

/**
 * Pipes six Result-returning functions together.
 * Takes the output of each function and passes it to the next.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @template C - Type of the third function's success value
 * @template D - Type of the fourth function's success value
 * @template E - Type of the fifth function's success value
 * @template F - Type of the sixth function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @param fn3 - The third function to pipe
 * @param fn4 - The fourth function to pipe
 * @param fn5 - The fifth function to pipe
 * @param fn6 - The sixth function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B, C, D, E, F>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>,
  fn6: (arg: E) => Result<F> | Promise<Result<F>>
): Promise<Result<F>>;

/**
 * Pipes seven Result-returning functions together.
 * Takes the output of each function and passes it to the next.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @template C - Type of the third function's success value
 * @template D - Type of the fourth function's success value
 * @template E - Type of the fifth function's success value
 * @template F - Type of the sixth function's success value
 * @template G - Type of the seventh function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @param fn3 - The third function to pipe
 * @param fn4 - The fourth function to pipe
 * @param fn5 - The fifth function to pipe
 * @param fn6 - The sixth function to pipe
 * @param fn7 - The seventh function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B, C, D, E, F, G>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>,
  fn6: (arg: E) => Result<F> | Promise<Result<F>>,
  fn7: (arg: F) => Result<G> | Promise<Result<G>>
): Promise<Result<G>>;

/**
 * Pipes eight Result-returning functions together.
 * Takes the output of each function and passes it to the next.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @template C - Type of the third function's success value
 * @template D - Type of the fourth function's success value
 * @template E - Type of the fifth function's success value
 * @template F - Type of the sixth function's success value
 * @template G - Type of the seventh function's success value
 * @template H - Type of the eighth function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @param fn3 - The third function to pipe
 * @param fn4 - The fourth function to pipe
 * @param fn5 - The fifth function to pipe
 * @param fn6 - The sixth function to pipe
 * @param fn7 - The seventh function to pipe
 * @param fn8 - The eighth function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B, C, D, E, F, G, H>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>,
  fn6: (arg: E) => Result<F> | Promise<Result<F>>,
  fn7: (arg: F) => Result<G> | Promise<Result<G>>,
  fn8: (arg: G) => Result<H> | Promise<Result<H>>
): Promise<Result<H>>;

/**
 * Pipes nine Result-returning functions together.
 * Takes the output of each function and passes it to the next.
 * If any function returns a failure, the chain stops and returns that failure.
 *
 * @template A - Type of the first function's success value
 * @template B - Type of the second function's success value
 * @template C - Type of the third function's success value
 * @template D - Type of the fourth function's success value
 * @template E - Type of the fifth function's success value
 * @template F - Type of the sixth function's success value
 * @template G - Type of the seventh function's success value
 * @template H - Type of the eighth function's success value
 * @template I - Type of the ninth function's success value
 * @param fn1 - The first function to pipe
 * @param fn2 - The second function to pipe
 * @param fn3 - The third function to pipe
 * @param fn4 - The fourth function to pipe
 * @param fn5 - The fifth function to pipe
 * @param fn6 - The sixth function to pipe
 * @param fn7 - The seventh function to pipe
 * @param fn8 - The eighth function to pipe
 * @param fn9 - The ninth function to pipe
 * @returns Promise of the final Result
 */
export function resultPipe<A, B, C, D, E, F, G, H, I>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>,
  fn6: (arg: E) => Result<F> | Promise<Result<F>>,
  fn7: (arg: F) => Result<G> | Promise<Result<G>>,
  fn8: (arg: G) => Result<H> | Promise<Result<H>>,
  fn9: (arg: H) => Result<I> | Promise<Result<I>>
): Promise<Result<I>>;

/**
 * Implementation of the resultPipe function that handles any number of functions.
 * This is the actual implementation that all the overloads above delegate to.
 *
 * @param fn1 - The first function in the pipeline
 * @param fns - Rest of the functions to pipe together
 * @returns Promise of the final Result
 */
export async function resultPipe(
  fn1: () => Result<unknown> | Promise<Result<unknown>>,
  ...fns: Array<(arg: unknown) => Result<unknown> | Promise<Result<unknown>>>
): Promise<Result<unknown>> {
  try {
    let acc = await Promise.resolve(fn1());
    for (const fn of fns) {
      if (isFail(acc)) return acc;
      acc = await Promise.resolve(fn(acc.output));
    }
    return acc;
  } catch (error) {
    return createFail(error instanceof Error ? error.message : String(error));
  }
}
