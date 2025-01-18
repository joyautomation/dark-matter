import { createFail, type Result } from "../result/result.ts";

/**
 * Executes a series of conditions and returns the Result of the first matching condition's action.
 * Each condition can return a different Result type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => Result<A> }]} conditionals - Array with a single condition-action pair
 * @returns {Result<A>} The Result of the matching action
 */
export function rcond<T, A>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> }
  ]
): Result<A>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 */
export function rcond<T, A, B>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> }
  ]
): Result<A | B>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 */
export function rcond<T, A, B, C>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> },
    { condition: (input: T) => boolean; action: (input: T) => Result<C> }
  ]
): Result<A | B | C>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 */
export function rcond<T, A, B, C, D>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> },
    { condition: (input: T) => boolean; action: (input: T) => Result<C> },
    { condition: (input: T) => boolean; action: (input: T) => Result<D> }
  ]
): Result<A | B | C | D>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 */
export function rcond<T, A, B, C, D, E>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> },
    { condition: (input: T) => boolean; action: (input: T) => Result<C> },
    { condition: (input: T) => boolean; action: (input: T) => Result<D> },
    { condition: (input: T) => boolean; action: (input: T) => Result<E> }
  ]
): Result<A | B | C | D | E>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 */
export function rcond<T, A, B, C, D, E, F>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> },
    { condition: (input: T) => boolean; action: (input: T) => Result<C> },
    { condition: (input: T) => boolean; action: (input: T) => Result<D> },
    { condition: (input: T) => boolean; action: (input: T) => Result<E> },
    { condition: (input: T) => boolean; action: (input: T) => Result<F> }
  ]
): Result<A | B | C | D | E | F>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 * @template G - The return type of the seventh action
 */
export function rcond<T, A, B, C, D, E, F, G>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> },
    { condition: (input: T) => boolean; action: (input: T) => Result<C> },
    { condition: (input: T) => boolean; action: (input: T) => Result<D> },
    { condition: (input: T) => boolean; action: (input: T) => Result<E> },
    { condition: (input: T) => boolean; action: (input: T) => Result<F> },
    { condition: (input: T) => boolean; action: (input: T) => Result<G> }
  ]
): Result<A | B | C | D | E | F | G>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 * @template G - The return type of the seventh action
 * @template H - The return type of the eighth action
 */
export function rcond<T, A, B, C, D, E, F, G, H>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> },
    { condition: (input: T) => boolean; action: (input: T) => Result<C> },
    { condition: (input: T) => boolean; action: (input: T) => Result<D> },
    { condition: (input: T) => boolean; action: (input: T) => Result<E> },
    { condition: (input: T) => boolean; action: (input: T) => Result<F> },
    { condition: (input: T) => boolean; action: (input: T) => Result<G> },
    { condition: (input: T) => boolean; action: (input: T) => Result<H> }
  ]
): Result<A | B | C | D | E | F | G | H>;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 * @template G - The return type of the seventh action
 * @template H - The return type of the eighth action
 * @template I - The return type of the ninth action
 */
export function rcond<T, A, B, C, D, E, F, G, H, I>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => Result<A> },
    { condition: (input: T) => boolean; action: (input: T) => Result<B> },
    { condition: (input: T) => boolean; action: (input: T) => Result<C> },
    { condition: (input: T) => boolean; action: (input: T) => Result<D> },
    { condition: (input: T) => boolean; action: (input: T) => Result<E> },
    { condition: (input: T) => boolean; action: (input: T) => Result<F> },
    { condition: (input: T) => boolean; action: (input: T) => Result<G> },
    { condition: (input: T) => boolean; action: (input: T) => Result<H> },
    { condition: (input: T) => boolean; action: (input: T) => Result<I> }
  ]
): Result<A | B | C | D | E | F | G | H | I>;
/**
 * Implementation of the rcond function that handles all overloaded cases.
 * @template T - The type of the input value
 * @template U - The return type of the actions
 * @param {T} args - The value to test against conditions
 * @param {Array<{ condition: (input: T) => boolean; action: (input: T) => Result<U> }>} conditionals - Array of condition-action pairs
 * @returns {Result<U>} The Result of the first matching action, or a failure if no condition matches
 */
export function rcond<T, U>(
  args: T,
  conditionals: Array<{
    condition: (input: T) => boolean;
    action: (input: T) => Result<U>;
  }>
): Result<U> {
  const conditional = conditionals.find((conditional) =>
    conditional.condition(args)
  );
  if (!conditional) return createFail("No conditional found");
  return conditional.action(args);
}
