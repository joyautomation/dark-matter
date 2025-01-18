/**
 * Performs left-to-right function composition. Takes an initial value and applies
 * a series of functions to it in sequence, where each function takes the result
 * of the previous function as its input.
 * 
 * @template T - The type of the initial value
 * @template A,B,C,D,E,F,G,H,I - The return types of each function in the pipeline
 * @param initial - The starting value to pipe through the functions
 * @param fns - A series of functions to apply in sequence
 * @returns The result of applying all functions in sequence to the initial value
 * 
 * @example
 * ```ts
 * // Basic usage with a single function
 * pipe(5, x => x + 1) // returns 6
 * 
 * // Chaining multiple functions
 * pipe(
 *   3,
 *   x => x + 1,  // 4
 *   x => x * 2,  // 8
 *   x => x * x   // 64
 * )
 * 
 * // Type transformation
 * pipe(
 *   42,
 *   x => x.toString(),     // "42"
 *   x => x + "!"          // "42!"
 * )
 * ```
 */
/** @internal */
export function pipe<T>(initial: T): T;
/** @internal */
export function pipe<T, A>(initial: T, fn1: (arg: T) => A): A;
/** @internal */
export function pipe<T, A, B>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B
): B;
/** @internal */
export function pipe<T, A, B, C>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B,
  fn3: (arg: B) => C
): C;
/** @internal */
export function pipe<T, A, B, C, D>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B,
  fn3: (arg: B) => C,
  fn4: (arg: C) => D
): D;
/** @internal */
export function pipe<T, A, B, C, D, E>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B,
  fn3: (arg: B) => C,
  fn4: (arg: C) => D,
  fn5: (arg: D) => E
): E;
/** @internal */
export function pipe<T, A, B, C, D, E, F>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B,
  fn3: (arg: B) => C,
  fn4: (arg: C) => D,
  fn5: (arg: D) => E,
  fn6: (arg: E) => F
): F;
/** @internal */
export function pipe<T, A, B, C, D, E, F, G>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B,
  fn3: (arg: B) => C,
  fn4: (arg: C) => D,
  fn5: (arg: D) => E,
  fn6: (arg: E) => F,
  fn7: (arg: F) => G
): G;
/** @internal */
export function pipe<T, A, B, C, D, E, F, G, H>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B,
  fn3: (arg: B) => C,
  fn4: (arg: C) => D,
  fn5: (arg: D) => E,
  fn6: (arg: E) => F,
  fn7: (arg: F) => G,
  fn8: (arg: G) => H
): H;
/** @internal */
export function pipe<T, A, B, C, D, E, F, G, H, I>(
  initial: T,
  fn1: (arg: T) => A,
  fn2: (arg: A) => B,
  fn3: (arg: B) => C,
  fn4: (arg: C) => D,
  fn5: (arg: D) => E,
  fn6: (arg: E) => F,
  fn7: (arg: F) => G,
  fn8: (arg: G) => H,
  fn9: (arg: H) => I
): I;
export function pipe(
  initial: unknown,
  ...fns: Array<(arg: unknown) => unknown>
): unknown {
  switch (fns.length) {
    case 0:
      return initial;
    case 1:
      return fns[0](initial);
    case 2:
      return fns[1](fns[0](initial));
    case 3:
      return fns[2](fns[1](fns[0](initial)));
    case 4:
      return fns[3](fns[2](fns[1](fns[0](initial))));
    default:
      return fns.reduce((acc, fn) => fn(acc), initial);
  }
}
