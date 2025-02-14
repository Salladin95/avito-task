import { useEffect, useState } from "react"

const DELAY = 500

export function useDebounce<T>(value: T, delay = DELAY): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}
