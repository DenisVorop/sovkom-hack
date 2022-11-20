import React from 'react'

import { useInput } from './use-input'

export function useSearch<T>(arr: T[], key: string): [T[], {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}] {
    const { value, bind } = useInput('')
    const [filteredArr, setFilteredArr] = React.useState<T[]>([] as T[])

    React.useEffect(() => {
        setFilteredArr(arr.filter(i => String(i[key]).toLowerCase().includes(bind.value.toLowerCase())))
    }, [arr, key, value])

    return [filteredArr, bind]
}
