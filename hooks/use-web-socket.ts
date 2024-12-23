import { useState, useEffect, useCallback } from 'react'

export interface WebSocketMessage {
  type: string
  payload: any
}

export function useWebSocket(url: string) {
  const [sockets, setSockets] = useState<WebSocket[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)

  const addWebsocket = (ws: WebSocket) => {
    setSockets([ws, ...sockets.filter((ws) => ws.readyState == WebSocket.OPEN)])
  }

  const reconnect = (url: string) => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      setIsConnected(true)
    }

    ws.onerror = (error) => {
      console.log(error)
    }

    ws.onclose = () => {
      setIsConnected(false)
    }

    ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data)
      setLastMessage(message)
    }

    addWebsocket(ws)
  }

  useEffect(() => {
    reconnect(url)

    return () => {
      if (sockets.length > 0) {
        sockets[0].close()
      }
    }
  }, [url])

  const sendMessage = useCallback((message: WebSocketMessage) => {
    if (!isConnected) {
      console.log('attempting to reconnect...')
      reconnect(url)
    }
    if (sockets[0] && sockets[0].readyState === WebSocket.OPEN) {
      sockets[0].send(JSON.stringify(message))
    }
  }, [])

  return { isConnected, lastMessage, sendMessage }
}
