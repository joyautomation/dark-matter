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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }]} conditionals - Array with two condition-action pairs
 * @returns {A | B} The result of the matching action
 */
export function cond<T, A, B>(
  args: T,
  conditionals: [
    { condition: (input: T) => boolean; action: (input: T) => A },
    { condition: (input: T) => boolean; action: (input: T) => B }
  ]
): A | B;

/**
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }, { condition: (input: T) => boolean; action: (input: T) => C }]} conditionals - Array with three condition-action pairs
 * @returns {A | B | C} The result of the matching action
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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }, { condition: (input: T) => boolean; action: (input: T) => C }, { condition: (input: T) => boolean; action: (input: T) => D }]} conditionals - Array with four condition-action pairs
 * @returns {A | B | C | D} The result of the matching action
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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }, { condition: (input: T) => boolean; action: (input: T) => C }, { condition: (input: T) => boolean; action: (input: T) => D }, { condition: (input: T) => boolean; action: (input: T) => E }]} conditionals - Array with five condition-action pairs
 * @returns {A | B | C | D | E} The result of the matching action
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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }, { condition: (input: T) => boolean; action: (input: T) => C }, { condition: (input: T) => boolean; action: (input: T) => D }, { condition: (input: T) => boolean; action: (input: T) => E }, { condition: (input: T) => boolean; action: (input: T) => F }]} conditionals - Array with six condition-action pairs
 * @returns {A | B | C | D | E | F} The result of the matching action
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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 * @template G - The return type of the seventh action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }, { condition: (input: T) => boolean; action: (input: T) => C }, { condition: (input: T) => boolean; action: (input: T) => D }, { condition: (input: T) => boolean; action: (input: T) => E }, { condition: (input: T) => boolean; action: (input: T) => F }, { condition: (input: T) => boolean; action: (input: T) => G }]} conditionals - Array with seven condition-action pairs
 * @returns {A | B | C | D | E | F | G} The result of the matching action
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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
 * @template T - The type of the input value
 * @template A - The return type of the first action
 * @template B - The return type of the second action
 * @template C - The return type of the third action
 * @template D - The return type of the fourth action
 * @template E - The return type of the fifth action
 * @template F - The return type of the sixth action
 * @template G - The return type of the seventh action
 * @template H - The return type of the eighth action
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }, { condition: (input: T) => boolean; action: (input: T) => C }, { condition: (input: T) => boolean; action: (input: T) => D }, { condition: (input: T) => boolean; action: (input: T) => E }, { condition: (input: T) => boolean; action: (input: T) => F }, { condition: (input: T) => boolean; action: (input: T) => G }, { condition: (input: T) => boolean; action: (input: T) => H }]} conditionals - Array with eight condition-action pairs
 * @returns {A | B | C | D | E | F | G | H} The result of the matching action
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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * Each condition can return a different type, making this function highly flexible for branching logic.
 *
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
 * @param {T} args - The value to test against conditions
 * @param {[{ condition: (input: T) => boolean; action: (input: T) => A }, { condition: (input: T) => boolean; action: (input: T) => B }, { condition: (input: T) => boolean; action: (input: T) => C }, { condition: (input: T) => boolean; action: (input: T) => D }, { condition: (input: T) => boolean; action: (input: T) => E }, { condition: (input: T) => boolean; action: (input: T) => F }, { condition: (input: T) => boolean; action: (input: T) => G }, { condition: (input: T) => boolean; action: (input: T) => H }, { condition: (input: T) => boolean; action: (input: T) => I }]} conditionals - Array with nine condition-action pairs
 * @returns {A | B | C | D | E | F | G | H | I} The result of the matching action
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
 * Executes a series of conditions and returns the result of the first matching condition's action.
 * This is a generic version that accepts an array of conditions with the same return type.
 *
 * @template T - The type of the input value
 * @template U - The common return type for all actions
 * @param {T} args - The value to test against conditions
 * @param {Array<{ condition: (input: T) => boolean; action: (input: T) => U }>} conditionals - Array of condition-action pairs
 * @returns {U} The result of the matching action
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
