/**
 * Represents the result of an operation that can either succeed or fail.
 * Use this instead of throwing exceptions for better error handling.
 *
 * @template T - The type of the success value
 * @template E - The type of the error (defaults to unknown)
 */
export type Result<T, E = unknown> = { success: true; value: T } | { success: false; error: E }

/**
 * Executes an async function and returns a Result instead of throwing errors.
 *
 * @param asyncFn - The async function to execute
 * @returns Promise<Result<T, E>> with success value or error
 */
export const tryitAsync = async <TReturn, TError = unknown>(
  asyncFn: () => Promise<TReturn>,
): Promise<Result<TReturn, TError>> => {
  try {
    const value = await asyncFn()
    return { success: true, value }
  } catch (error) {
    return { success: false, error: error as TError }
  }
}

/**
 * Executes a synchronous function and returns a Result instead of throwing errors.
 *
 * @param fn - The synchronous function to execute
 * @returns Result<T, E> with success value or error
 */
export const tryit = <TReturn, TError = unknown>(fn: () => TReturn): Result<TReturn, TError> => {
  try {
    const value = fn()
    return { success: true, value }
  } catch (error) {
    return { success: false, error: error as TError }
  }
}

/**
 * Type guard to check if a Result represents a successful operation.
 * Provides TypeScript type narrowing for safe access to the success value.
 *
 * @param result - The Result to check
 * @returns True if the operation succeeded, false otherwise
 */
export const isSuccess = <T, E>(result: Result<T, E>): result is { success: true; value: T } => {
  return result.success === true
}

/**
 * Type guard to check if a Result represents a failed operation.
 * Provides TypeScript type narrowing for safe access to the error.
 *
 * @param result - The Result to check
 * @returns True if the operation failed, false otherwise
 */
export const isError = <T, E>(result: Result<T, E>): result is { success: false; error: E } => {
  return result.success === false
}
