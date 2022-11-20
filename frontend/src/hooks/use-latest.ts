import React from 'react'

export function useLatest<T>(value: T) {
    const valueRef = React.useRef<T>(value)

    React.useLayoutEffect(() => {
        valueRef.current = value
    }, [value])

    return valueRef
}
