import React from 'react'
import useWebSocketHook, { ReadyState, SendMessage } from 'react-use-websocket'

export const useWebSocket = (url: string): [string, SendMessage, string] => {
    const [data, setData] = React.useState<string>('{}')
    const { sendMessage, lastMessage, readyState } = useWebSocketHook(url)

    const connectionStatus = React.useMemo(() => {
        return {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }[readyState]
    }, [readyState])

    React.useEffect(() => {
        if (!lastMessage) {
            return
        }
        if (typeof lastMessage.data !== 'string') {
            return
        }
        setData(lastMessage.data)
    }, [lastMessage])

    return [connectionStatus, sendMessage, data]
}
