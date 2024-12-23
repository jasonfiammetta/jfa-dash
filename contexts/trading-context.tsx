import React, { createContext, useContext, useState, useEffect } from 'react'
import { WebSocketMessage, useWebSocket } from '@/hooks/use-web-socket'

interface CurrentStats {
  totalValue: number;
  dailyChange: number;
}

interface TradingContextType {
  autoExecute: boolean;
  setAutoExecute: (mode: boolean) => void;
  currentTime: Date;
  currentStats: CurrentStats;
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  sendMessage: (message: WebSocketMessage) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined)

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [autoExecute, setAutoExecute] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentStats, setCurrentStats] = useState<CurrentStats>({ totalValue: 10005, dailyChange: 2.6 })

  // const url = 'wss://2ms2ts.dev/api/ws'
  const url = 'ws://localhost:8000'

  const { isConnected, lastMessage, sendMessage } = useWebSocket(url)
  // { 
  //   isConnected: false,
  //   lastMessage: {
  //     type: undefined,
  //     payload: {
  //       totalValue: 0,
  //       dailyChange: 0,
  //     },
  //   },
  //   sendMessage: (...args: any[])=>{console.log(args)}
  // }

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(clockInterval)
  }, [])

  useEffect(() => {
    if (isConnected) {
      sendMessage({ type: 'SUBSCRIBE', payload: { dataTypes: ['CURRENT_STATS'] } })
    }
  }, [isConnected, sendMessage])

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'CURRENT_STATS') {
      setCurrentStats(() => lastMessage.payload)
    }
    console.log('lastMessage', lastMessage)
  }, [lastMessage, currentStats])

  useEffect(() => {
    const heartbeat = setInterval(() => {
      sendMessage({type: 'heartbeat', payload: new Date()})
      console.log('hb')
    }, 5000)

    return () => clearInterval(heartbeat)
  }, [sendMessage])

  const contextValue: TradingContextType = {
    autoExecute,
    setAutoExecute,
    currentTime,
    currentStats,
    isConnected,
    lastMessage, 
    sendMessage,
  }

  return (
    <TradingContext.Provider value={contextValue}>
      {children}
    </TradingContext.Provider>
  )
}

export function useTradingContext() {
  const context = useContext(TradingContext)
  if (context === undefined) {
    throw new Error('useTradingContext must be used within a TradingProvider')
  }
  return context
}
