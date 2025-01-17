import { Result } from "./result.ts";
import { isFail, createFail } from "./result.ts";

export function resultPipe<A>(
  fn1: () => Result<A> | Promise<Result<A>>
): Promise<Result<A>>;
export function resultPipe<A, B>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>
): Promise<Result<B>>;
export function resultPipe<A, B, C>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>
): Promise<Result<C>>;
export function resultPipe<A, B, C, D>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>
): Promise<Result<D>>;
export function resultPipe<A, B, C, D, E>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>
): Promise<Result<E>>;
export function resultPipe<A, B, C, D, E, F>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>,
  fn6: (arg: E) => Result<F> | Promise<Result<F>>
): Promise<Result<F>>;
export function resultPipe<A, B, C, D, E, F, G>(
  fn1: () => Result<A> | Promise<Result<A>>,
  fn2: (arg: A) => Result<B> | Promise<Result<B>>,
  fn3: (arg: B) => Result<C> | Promise<Result<C>>,
  fn4: (arg: C) => Result<D> | Promise<Result<D>>,
  fn5: (arg: D) => Result<E> | Promise<Result<E>>,
  fn6: (arg: E) => Result<F> | Promise<Result<F>>,
  fn7: (arg: F) => Result<G> | Promise<Result<G>>
): Promise<Result<G>>;
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
