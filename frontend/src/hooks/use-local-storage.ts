import React from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<T>] {
    const getValue = React.useCallback(() => {
        const storage = localStorage.getItem(key)

        if (storage) {
            return JSON.parse(storage)
        }

        return initialValue
    }, [])

    const [value, setValue] = React.useState(getValue)

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}
