import React from 'react'

import { useMeQuery } from '../store/services/auth/api'
import { TMe } from '../types/types'

export const useMe = (): [TMe, (delay: number) => void, () => void] => {
    const [delay, setDelay] = React.useState<number>(0)
    const [user, setUser] = React.useState<TMe>({} as TMe)
    const { data: me, refetch } = useMeQuery(null, { pollingInterval: delay })

    React.useEffect(() => {
        if (!me) {
            return
        }
        setUser(me)
    }, [me])

    const handleChangeDelay = React.useCallback((delay: number) => {
        setDelay(delay)
    }, [])

    return [user, handleChangeDelay, refetch]
}
