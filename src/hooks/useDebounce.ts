import { useState, useEffect, useRef } from "react"

const DEFAULT_DELAY_MS = 1000
export function useDebounce<T>(value: T, delayMs: number = DEFAULT_DELAY_MS): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }

        if (value === debouncedValue) {
            return
        }

        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null
            setDebouncedValue(value)
        }, delayMs)

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [value, delayMs, debouncedValue])

    return debouncedValue
}
