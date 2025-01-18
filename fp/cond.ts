/**
 * Finds the first conditional that matches the condition based on the args provided and executes its action.
 *
 * @param {T} args - The argument to be checked against the conditionals.
 * @param {{ condition: (input: T) => boolean; action: (input: T) => UPayload }[]} conditionals - Array of objects containing condition and action functions.
 * @return {UPayload | undefined} The result of executing the action function of the matched conditional.
 */

// Function overloads for different return types
/**
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }]} conditionals - Array with a single condition-action pair
 * @returns {A} The result of the matching action
 * @throws {Error} When no condition matches
 */
export function cond<T, A>(
  args: T,
  conditionals: [{ condition: (input: T) => boolean; action: (input: T) => A }]
): A;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 */
export function cond<T, A, B>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B }
  ]
): A | B;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 */
export function cond<T, A, B, C>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B },
    { condition: (input: T) => boolean; action: (input: T) => C }
  ]
): A | B | C;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 */
export function cond<T, A, B, C, D>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B },
    { condition: (input: T) => boolean; action: (input: T) => C },
    { condition: (input: T) => boolean; action: (input: T) => D }
  ]
): A | B | C | D;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 */
export function cond<T, A, B, C, D, E>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B },
    { condition: (input: T) => boolean; action: (input: T) => C },
    { condition: (input: T) => boolean; action: (input: T) => D },
    { condition: (input: T) => boolean; action: (input: T) => E }
  ]
): A | B | C | D | E;
/**
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 */
export function cond<T, A, B, C, D, E, F>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B },
    { condition: (input: T) => boolean; action: (input: T) => C },
    { condition: (input: T) => boolean; action: (input: T) => D },
    { condition: (input: T) => boolean; action: (input: T) => E },
    { condition: (input: T) => boolean; action: (input: T) => F }
  ]
): A | B | C | D | E | F;
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
export function cond<T, A, B, C, D, E, F, G>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B },
    { condition: (input: T) => boolean; action: (input: T) => C },
    { condition: (input: T) => boolean; action: (input: T) => D },
    { condition: (input: T) => boolean; action: (input: T) => E },
    { condition: (input: T) => boolean; action: (input: T) => F },
    { condition: (input: T) => boolean; action: (input: T) => G }
  ]
): A | B | C | D | E | F | G;
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
export function cond<T, A, B, C, D, E, F, G, H>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B },
    { condition: (input: T) => boolean; action: (input: T) => C },
    { condition: (input: T) => boolean; action: (input: T) => D },
    { condition: (input: T) => boolean; action: (input: T) => E },
    { condition: (input: T) => boolean; action: (input: T) => F },
    { condition: (input: T) => boolean; action: (input: T) => G },
    { condition: (input: T) => boolean; action: (input: T) => H }
  ]
): A | B | C | D | E | F | G | H;
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
export function cond<T, A, B, C, D, E, F, G, H, I>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B },
    { condition: (input: T) => boolean; action: (input: T) => C },
    { condition: (input: T) => boolean; action: (input: T) => D },
    { condition: (input: T) => boolean; action: (input: T) => E },
    { condition: (input: T) => boolean; action: (input: T) => F },
    { condition: (input: T) => boolean; action: (input: T) => G },
    { condition: (input: T) => boolean; action: (input: T) => H },
    { condition: (input: T) => boolean; action: (input: T) => I }
  ]
): A | B | C | D | E | F | G | H | I;

/**
 * @template T - The type of the input value
 * @template U - The return type of the actions
 */
export function cond<T, U>(
  args: T,
  conditionals: Array<{
    condition: (input: T) => boolean;
    action: (input: T) => U;
  }>
): U;

/**
 * Implementation of the cond function that handles all overloaded cases.
 * @template T - The type of the input value
 * @template A - The return type of the actions
 * @param {T} args - The value to test against conditions
 * @param {Array<{ condition: (input: T) => boolean; action: (input: T) => A }>} conditionals - Array of condition-action pairs
 * @returns {A} The result of the matching action
 * @throws {Error} When no condition matches
 */
export function cond<T, A>(
  args: T,
  conditionals: Array<{
    condition: (input: T) => boolean;
    action: (input: T) => A;
  }>
): A {
  const conditional = conditionals.find((conditional) =>
    conditional.condition(args)
  );
  if (!conditional) throw new Error("No conditional found");
  return conditional.action(args);
}
