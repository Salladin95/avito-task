/**
 * Composes multiple functions into a single function that executes from right to left.
 * @param {Function[]} fns - Array of functions to compose.
 * @returns {Function} A function that applies all composed functions in order.
 */
export function compose<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
	return (initialValue: T) => fns.reduceRight((acc, fn) => fn(acc), initialValue)
}

export function errorToMessage(err: unknown): string {
	if (err instanceof Error) return err.message
	return JSON.stringify(err)
}
