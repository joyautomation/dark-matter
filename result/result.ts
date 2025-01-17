export interface ResultSuccess<T> {
  success: true;
  output: T;
}

export interface ResultFail {
  success: false;
  error: string;
}

export type Result<T> = ResultSuccess<T> | ResultFail;

/**
 * Type guard that checks if the given result is a success.
 *
 * @param result - The result to check.
 * @returns True if the result is a success, false otherwise.
 */
export const isSuccess = <T>(result: Result<T>): result is ResultSuccess<T> => {
  return result.success === true;
};

/**
 * Type guard that checks if the given result is an error.
 *
 * @param result - The result to check.
 * @returns True if the result is an error, false otherwise.
 */
export const isFail = <T>(result: Result<T>): result is ResultFail => {
  return result.success === false;
};

/**
 * Creates a new successful result.
 *
 * @param output - The output of the operation.
 * @returns A successful result.
 */
export const createSuccess = <T>(output: T): ResultSuccess<T> => ({
  success: true,
  output,
});

/**
 * Creates a new error result.
 *
 * @param error - The error message.
 * @returns An error result.
 */
export const createFail = (error: string): ResultFail => ({
  success: false,
  error,
});

export function unwrapResults<T extends Result<unknown>[]>(
  results: [...T]
): { [K in keyof T]: T[K] extends Result<infer U> ? U : never } {
  return results.map((r) => {
    if (!isSuccess(r)) {
      throw new Error(`Cannot unwrap failed result: ${r.error}`);
    }
    return r.output;
  }) as { [K in keyof T]: T[K] extends Result<infer U> ? U : never };
}
