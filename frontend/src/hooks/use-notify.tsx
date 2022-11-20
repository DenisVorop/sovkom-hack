import React from 'react'
import { createPortal } from 'react-dom'

import { INotifierProps } from '../components/notifier/notifier'



interface IInitialState {
    id: number
    content: () => React.ReactNode
    type: string
    delay: number
}

interface IContext {
    notifications: IInitialState[]
    notify: (rest: { type: string; content: () => string }, delay?: number) => void
}

export const NotifyContext = React.createContext<IContext>({} as IContext)

const initialState: IInitialState[] = []

const ADD = 'ADD'
const REMOVE = 'REMOVE'
const REMOVE_ALL = 'REMOVE_ALL'

interface RemovePayload {
    id: number
}

interface AddPayload {
    type: string
    content: () => string
    delay: number
}

type Action = {
    type: string
    payload: AddPayload | RemovePayload
}


export const notifyReducer: React.Reducer<IInitialState[], Action> = (state: IInitialState[], action) => {
    switch (action.type) {
        case ADD:
            const addPayload = action.payload as AddPayload
            return [
                ...state,
                {
                    id: +new Date(),
                    content: addPayload.content,
                    type: addPayload.type,
                    delay: addPayload.delay || 5000,
                },
            ]
        case REMOVE:
            const removePayload = action.payload as RemovePayload
            return state.filter((t: IInitialState) => t.id !== removePayload.id)
        case REMOVE_ALL:
            return initialState
        default:
            return state
    }
}

export const NotifyProvider = React.memo((props: { Component: React.FC<INotifierProps>, children: React.ReactNode }) => {
    const { Component } = props

    const notifyRef = React.useRef<HTMLElement | null>(null)

    const [notifications, dispatchNotify] = React.useReducer(notifyReducer, initialState)

    const toastData = React.useMemo(() => ({
        notifications,
        notify: (rest: { type: string; content: () => string; }, delay = 0) => {
            dispatchNotify({ type: ADD, payload: { ...rest, delay } })
        },
    }), [notifications])

    const onCloseHandle = React.useCallback((rest: number) => dispatchNotify({ type: REMOVE, payload: { id: rest } }), [])

    React.useEffect(() => {
        notifyRef.current = document.body
    }, [])

    return (
        <NotifyContext.Provider value={toastData}>
            {props.children}
            {notifyRef?.current &&
                createPortal(
                    <Component onClose={onCloseHandle} notifications={notifications} />,
                    notifyRef.current,
                )}
        </NotifyContext.Provider>
    )
})

export const useNotification = () => React.useContext(NotifyContext)
