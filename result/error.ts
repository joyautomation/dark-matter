import {
  createFail,
  createSuccess,
  type Result,
  type ResultFail,
} from "./result.ts";

/**
 * Creates a formatted error string from an error object or any unknown value.
 * If the input is an Error object, it will use the stack trace if available,
 * otherwise falling back to the error message. For non-Error values, it converts
 * them to strings.
 *
 * @param {unknown} error - The error object or value to format
 * @param {string} [prefix=""] - Optional prefix to prepend to the error string
 * @returns {string} A formatted error string with optional prefix
 *
 * @example
 * ```ts
 * // With an Error object
 * const error = new Error("Something went wrong");
 * createErrorString(error); // Returns stack trace or "Something went wrong"
 *
 * // With a prefix
 * createErrorString(error, "MyApp: "); // Returns "MyApp: Something went wrong"
 *
 * // With a non-Error value
 * createErrorString("Invalid input"); // Returns "Invalid input"
 * ```
 */
export const createErrorString = (error: unknown, context = ""): string =>
  `${context}${
    error instanceof Error ? error.stack || error.message : String(error)
  }`;

/**
 * Creates a standardized error properties object from any error value
 * @param error - Any value that represents an error, typically an Error instance
 * @returns An object containing normalized error properties:
 *   - error: A string representation of the error
 *   - message: The error message if available
 *   - stack: The error stack trace if available
 *   - cause: The underlying cause of the error if available
 *   - name: The error type name if available
 */
export const createErrorProperties = (
  error: unknown,
  context = "",
): Omit<ResultFail, "success"> & { context: string } => ({
  error: createErrorString(error, context),
  context,
  message: error instanceof Error ? error.message : undefined,
  stack: error instanceof Error ? error.stack : undefined,
  cause: error instanceof Error ? error.cause : undefined,
  name: error instanceof Error ? error.name : undefined,
});

/**
 * Wraps a synchronous function in a try-catch block and returns a Result.
 * If the function succeeds, returns a successful Result with the function's return value.
 * If the function throws, returns a failed Result with detailed error properties.
 *
 * @template T - The return type of the wrapped function
 * @param fn - The synchronous function to wrap
 * @returns {Result<T>} A Result containing either:
 *   - On success: ResultSuccess<T> with the function's return value
 *   - On error: ResultFail with error details (message, stack, cause, name)
 *
 * @example
 * ```ts
 * const divide = () => {
 *   throw new Error("Division by zero");
 * };
 *
 * const result = rTry(divide);
 * if (!result.success) {
 *   console.log(result.error); // "Division by zero"
 * }
 * ```
 */
export const rTry = <T>(fn: () => T): Result<T> => {
  try {
    return createSuccess(fn());
  } catch (error) {
    return createFail(createErrorProperties(error));
  }
};

/**
 * Wraps an async function in a try-catch block and returns a Result
 * @example
 * ```ts
 * const result = await rTryAsync(async () => {
 *   const response = await fetch('https://api.example.com');
 *   return response.json();
 * });
 *
 * if (isFail(result)) {
 *   console.error(result.error);
 *   return;
 * }
 * console.log(result.value);
 * ```
 */
export const rTryAsync = async <T>(
  fn: () => Promise<T>,
): Promise<Result<T>> => {
  try {
    const result = await fn();
    return createSuccess(result);
  } catch (error) {
    return createFail(createErrorProperties(error));
  }
};
