import React from 'react'

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
    const [value, setValue] = React.useState(initialValue)

    const toggle = React.useCallback(() => {
        setValue(!value)
    }, [value])

    return [value, toggle]
}
