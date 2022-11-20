import React from 'react'

interface IUseInput {
    value: string
    reset: () => void
    bind: {
        value: string
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
    onChangeData: (value: string) => void
}

export const useInput = (initialValue: string): IUseInput => {
    const [value, setValue] = React.useState(initialValue)

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, [])

    const reset = React.useCallback(() => {
        setValue('')
    }, [])

    const onChangeData = React.useCallback((value: string) => {
        setValue(value)
    }, [])

    const bind = { value, onChange }

    return { value, reset, bind, onChangeData }
}
