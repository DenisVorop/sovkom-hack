import React from 'react'

import { useNotification } from './use-notify'

export function useErrorProcessing<TSuccess, TError>(successMsg: string, errorMsg: string, onSuccess: TSuccess, onError: TError) {
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const { notify } = useNotification()

    React.useEffect(() => {
        if (isError) {
            notify({
                type: 'danger',
                content: () => errorMsg,
            })
            setTimeout(() => {
                setIsError(false)
            }, 800)
            if (typeof onError ==='function' ) {
                onError()
            }
        }
        if (isSuccess) {
            notify({
                type: 'success',
                content: () => successMsg,
            })
            setTimeout(() => {
                setIsSuccess(false)
            }, 800)
            if (typeof onSuccess ==='function' ) {
                onSuccess()
            }
        }
    }, [isSuccess, isError])

    const handleSetSuccess = React.useCallback((bool: boolean) => {
        setIsSuccess(bool)
    }, [])

    const handleSetError = React.useCallback((bool: boolean) => {
        setIsError(bool)
    }, [])
    return { handleSetSuccess, handleSetError }
}
