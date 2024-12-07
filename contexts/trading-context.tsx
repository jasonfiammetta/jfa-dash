import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useWebSocket } from '@/hooks/use-web-socket'

interface CurrentStats {
  totalValue: number;
  dailyChange: number;
}

interface TradingContextType {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  autoExecute: boolean;
  setAutoExecute: (mode: boolean) => void;
  currentTime: Date;
  currentStats: CurrentStats;
  isConnected: boolean;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined)

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [autoExecute, setAutoExecute] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentStats, setCurrentStats] = useState<CurrentStats>({ totalValue: 10005, dailyChange: 2.6 })

  const { isConnected, lastMessage, sendMessage } = useWebSocket('wss://2ms2ts.dev/api/ws')
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
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(clockInterval)
  }, [darkMode])

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
    darkMode,
    setDarkMode,
    autoExecute,
    setAutoExecute,
    currentTime,
    currentStats,
    isConnected
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
