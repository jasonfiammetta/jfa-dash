"use client"

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import("./header"), {
  ssr: false,
})
import { StockChartsCard } from './stock-charts-card'
import { StockList } from './stock-list'
import { OrdersCard } from './orders-card'
import { SuggestedOrdersCard } from './suggested-orders'
import { BotStatsCard } from './bot-stats-card'
import { PortfolioCard } from './portfolio-card'

import { Order } from '@/types'

import { TradingProvider, useTradingContext } from '@/contexts/trading-context'
import { ThemeProvider, useTheme } from '@/contexts/theme-context'

import { useTradingData } from '@/hooks/use-trading-data'
import { useWebSocket } from '@/hooks/use-web-socket'
import React from 'react'


function Dashboard() {
  const { isConnected } = useTradingContext()
  const { darkMode } = useTheme()
  
  const {
    stocks,
    // stats,
    chartData,
    openOrders,
    filledOrders,
    suggestedOrders,
    botStats,
    portfolio,
    executeOrder,
    updateData
  } = useTradingData()

  const { lastMessage, sendMessage } = useWebSocket('wss://your-websocket-server-url.com')

  useEffect(() => {
    if (lastMessage && lastMessage.type !== 'CURRENT_STATS') {
      updateData(lastMessage)
    }
  }, [lastMessage, updateData])

  const handleExecuteOrder = (order: Order) => {
    executeOrder(order)
    sendMessage({ type: 'EXECUTE_ORDER', payload: order })
  }

  useEffect(() => {
    if (isConnected) {
      sendMessage({ type: 'SUBSCRIBE', payload: { dataTypes: ['CHART_DATA', 'STOCKS', 'SUGGESTED_ORDERS'] } })
    }
  }, [isConnected, sendMessage])

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <Header />
      <main className="flex-grow p-4 overflow-auto bg-background text-foreground">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3 space-y-4">
              <StockChartsCard stocks={stocks} chartData={chartData} />
              <StockList stocks={stocks} />
            </div>
            <div className="w-full lg:w-1/3">
              <OrdersCard openOrders={openOrders} filledOrders={filledOrders} />
            </div>
          </div>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <SuggestedOrdersCard suggestedOrders={suggestedOrders} executeOrder={handleExecuteOrder} />
            <BotStatsCard botStats={botStats} />
          </div>
          <PortfolioCard portfolio={portfolio} stocks={stocks} />
        </div>
      </main>
    </div>
  )
}

export default function TradingDashboard() {
  return (
    <ThemeProvider>
      <TradingProvider>
        <Dashboard />
      </TradingProvider>
    </ThemeProvider>
  )
}
