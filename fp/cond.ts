import { createFail, createSuccess, type Result } from "../result/result.ts";

/**
 * Finds the first conditional that matches the condition based on the args provided and executes its action.
 *
 * @param {T} args - The argument to be checked against the conditionals.
 * @param {{ condition: (input: T) => boolean; action: (input: T) => UPayload }[]} conditionals - Array of objects containing condition and action functions.
 * @return {UPayload | undefined} The result of executing the action function of the matched conditional.
 */
export const cond = <T, U>(
  args: T,
  conditionals: {
    condition: (input: T) => boolean;
    action: (input: T) => U;
  }[]
): Result<U> => {
  const conditional = conditionals.find(
    (conditional: {
      condition: (input: T) => boolean;
      action: (input: T) => U;
    }) => {
      return conditional.condition(args);
    }
  );
  if (!conditional) return createFail("No conditional found");
  return createSuccess(conditional.action(args));
};
