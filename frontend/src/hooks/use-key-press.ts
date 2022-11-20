import React from 'react'

export const useKeyPress = (keyTarget: string): boolean => {
    const [isKeyPressed, setIsKeyPressed] = React.useState(false)

    const downHandler = React.useCallback((e: KeyboardEvent) => {
        if (e.key === keyTarget)
            setIsKeyPressed(true)
    }, [keyTarget])

    const upHandler = React.useCallback((e: KeyboardEvent) => {
        if (e.key === keyTarget)
            setIsKeyPressed(false)
    }, [keyTarget])

    React.useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.addEventListener('keydown', downHandler)
            window.addEventListener('keyup', upHandler)
        }

    }, [downHandler, upHandler])

    return isKeyPressed
}
