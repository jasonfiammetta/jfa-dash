"use client"

import { useState, useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Clock } from "lucide-react"
import { Order } from '@/types'

// Mock data (same as before)
const mockChartData = [
  { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
  { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
  { time: '2018-10-23', open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
  { time: '2018-10-24', open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
  { time: '2018-10-25', open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
]

const mockListData = [
  { id: 1, symbol: 'AAPL', price: 150.25, change: 2.5 },
  { id: 2, symbol: 'GOOGL', price: 2750.10, change: -0.5 },
  { id: 3, symbol: 'MSFT', price: 305.75, change: 1.2 },
  { id: 4, symbol: 'AMZN', price: 3300.00, change: -1.0 },
  { id: 5, symbol: 'TSLA', price: 700.00, change: 3.2 },
]

const mockOpenOrders = [
  { id: 1, symbol: 'AAPL', type: 'BUY', quantity: 100, price: 150.00, status: 'OPEN' },
  { id: 2, symbol: 'GOOGL', type: 'SELL', quantity: 50, price: 2750.00, status: 'OPEN' },
  { id: 3, symbol: 'MSFT', type: 'BUY', quantity: 75, price: 305.00, status: 'OPEN' },
]

const mockFilledOrders = [
  { id: 4, symbol: 'AMZN', type: 'SELL', quantity: 25, price: 3300.00, status: 'FILLED', filledAt: '2023-06-10T14:30:00Z' },
  { id: 5, symbol: 'TSLA', type: 'BUY', quantity: 10, price: 700.00, status: 'FILLED', filledAt: '2023-06-10T14:25:00Z' },
  { id: 6, symbol: 'FB', type: 'SELL', quantity: 60, price: 330.00, status: 'FILLED', filledAt: '2023-06-10T14:20:00Z' },
]

const mockSuggestedOrders = [
  { id: 1, symbol: 'NVDA', type: 'BUY', quantity: 50, price: 420.00, reason: 'Strong growth potential', suggestedBy: 'Alice' },
  { id: 2, symbol: 'AMZN', type: 'SELL', quantity: 30, price: 3350.00, reason: 'Profit-taking opportunity', suggestedBy: 'Bob' },
  { id: 3, symbol: 'TSLA', type: 'BUY', quantity: 20, price: 710.00, reason: 'Oversold, potential rebound', suggestedBy: 'Charlie' },
  { id: 4, symbol: 'MSFT', type: 'BUY', quantity: 40, price: 310.00, reason: 'Stable growth, good entry point', suggestedBy: 'Alice' },
]

const mockTeamStats = [
  { id: 1, name: 'Alice', ordersCount: 15, commissionCosts: 1250.50, skillScore: 85 },
  { id: 2, name: 'Bob', ordersCount: 12, commissionCosts: 980.75, skillScore: 78 },
  { id: 3, name: 'Charlie', ordersCount: 18, commissionCosts: 1500.25, skillScore: 92 },
]

const mockPortfolio = [
  { symbol: 'AAPL', quantity: 100, averagePrice: 145.00 },
  { symbol: 'GOOGL', quantity: 20, averagePrice: 2500.00 },
  { symbol: 'MSFT', quantity: 50, averagePrice: 300.00 },
  { symbol: 'AMZN', quantity: 10, averagePrice: 3200.00 },
  { symbol: 'TSLA', quantity: 30, averagePrice: 650.00 },
]

interface ChartContainerProps {
  data: typeof mockChartData
  colors: {
    backgroundColor: string
    lineColor: string
    textColor: string
    areaTopColor: string
    areaBottomColor: string
  }
}

function StockChart({ data, colors }: ChartContainerProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    })

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    })

    candlestickSeries.setData(data)

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, colors])

  return <div ref={chartContainerRef} />
}

export function TradingDashboardComponent() {
  const [currentStats, setCurrentStats] = useState({ totalValue: 10000, dailyChange: 2.5 })
  const [chartData, setChartData] = useState(mockChartData)
  const [listData, setListData] = useState(mockListData)
  const [openOrders, setOpenOrders] = useState(mockOpenOrders)
  const [filledOrders, setFilledOrders] = useState(mockFilledOrders)
  const [suggestedOrders, setSuggestedOrders] = useState(mockSuggestedOrders)
  const [teamStats, setTeamStats] = useState(mockTeamStats)
  const [portfolio, setPortfolio] = useState(mockPortfolio)
  const [darkMode, setDarkMode] = useState(false)
  const [autoExecute, setAutoExecute] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const dataInterval = setInterval(() => {
      setCurrentStats(prev => ({
        totalValue: prev.totalValue + Math.random() * 100 - 50,
        dailyChange: prev.dailyChange + Math.random() - 0.5,
      }))

      setChartData(prev => {
        const lastData = prev[prev.length - 1]
        const newData = {
          time: new Date().toISOString().split('T')[0],
          open: lastData.close,
          high: lastData.close + Math.random() * 5,
          low: lastData.close - Math.random() * 5,
          close: lastData.close + (Math.random() - 0.5) * 10,
        }
        return [...prev.slice(1), newData]
      })

      setListData(prev => prev.map(item => ({
        ...item,
        price: item.price + Math.random() * 10 - 5,
        change: item.change + Math.random() - 0.5,
      })))

      setOpenOrders(prev => {
        const updatedOrders = prev.map(order => ({
          ...order,
          price: order.price + (Math.random() - 0.5) * 5,
        }))
        if (Math.random() > 0.7 && updatedOrders.length > 0) {
          const indexToFill = Math.floor(Math.random() * updatedOrders.length)
          const filledOrder = {
            ...updatedOrders[indexToFill],
            status: 'FILLED',
            filledAt: new Date().toISOString(),
          }
          setFilledOrders(prevFilled => [filledOrder, ...prevFilled.slice(0, 9)])
          updatePortfolio(filledOrder)
          return updatedOrders.filter((_, index) => index !== indexToFill)
        }
        return updatedOrders
      })

      if (Math.random() > 0.8) {
        const newOrder = {
          id: Date.now(),
          symbol: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'][Math.floor(Math.random() * 5)],
          type: Math.random() > 0.5 ? 'BUY' : 'SELL',
          quantity: Math.floor(Math.random() * 100) + 1,
          price: Math.random() * 1000 + 100,
          status: 'OPEN',
        }
        setOpenOrders(prev => [newOrder, ...prev])
      }

      setSuggestedOrders(prev => {
        const updatedOrders = prev.map(order => ({
          ...order,
          price: order.price + (Math.random() - 0.5) * 10,
        }))
        if (autoExecute && updatedOrders.length > 0) {
          const indexToExecute = Math.floor(Math.random() * updatedOrders.length)
          const executedOrder = updatedOrders[indexToExecute]
          executeOrder(executedOrder)
          return updatedOrders.filter((_, index) => index !== indexToExecute)
        }
        return updatedOrders
      })

      setTeamStats(prev => prev.map(stat => ({
        ...stat,
        ordersCount: stat.ordersCount + Math.floor(Math.random() * 3),
        commissionCosts: stat.commissionCosts + Math.random() * 100,
        skillScore: Math.min(100, stat.skillScore + Math.random() * 2 - 1),
      })))

      setPortfolio(prev => prev.map(position => ({
        ...position,
        averagePrice: position.averagePrice + (Math.random() - 0.5) * 5,
      })))
    }, 5000)

    return () => {
      clearInterval(clockInterval)
      clearInterval(dataInterval)
    }
  }, [darkMode, autoExecute])

  const executeOrder = (order: Order) => {
    console.log(`Executing order: ${order.type} ${order.quantity} ${order.symbol} at $${order.price}`)
    setSuggestedOrders(prev => prev.filter(o => o.id !== order.id))
    const newOrder = {
      ...order,
      id: Date.now(),
      status: 'OPEN',
    }
    setOpenOrders(prev => [newOrder, ...prev])
    setTeamStats(prev => prev.map(stat => 
      stat.name === order.suggestedBy 
        ? { ...stat, ordersCount: stat.ordersCount + 1, commissionCosts: stat.commissionCosts + order.price * 0.01 }
        : stat
    ))
  }

  const updatePortfolio = (order: Order) => {
    setPortfolio(prev => {
      const existingPosition = prev.find(p => p.symbol === order.symbol)
      if (existingPosition) {
        if (order.type === 'BUY') {
          const newQuantity = existingPosition.quantity + order.quantity
          const newAveragePrice = (existingPosition.averagePrice * existingPosition.quantity + order.price * order.quantity) / newQuantity
          return prev.map(p => p.symbol === order.symbol ? { ...p, quantity: newQuantity, averagePrice: newAveragePrice } : p)
        } else {
          const newQuantity = existingPosition.quantity - order.quantity
          return newQuantity > 0
            ? prev.map(p => p.symbol === order.symbol ? { ...p, quantity: newQuantity } : p)
            : prev.filter(p => p.symbol !== order.symbol)
        }
      } else if (order.type === 'BUY') {
        return [...prev, { symbol: order.symbol, quantity: order.quantity, averagePrice: order.price }]
      }
      return prev
    })
  }

  const chartColors = {
    light: {
      backgroundColor: '#ffffff',
      lineColor: '#2962FF',
      textColor: '#253248',
      areaTopColor: '#2962FF',
      areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    },
    dark: {
      backgroundColor: '#1B262D',
      lineColor: '#2962FF',
      textColor: '#D9D9D9',
      areaTopColor: '#2962FF',
      areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    },
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-background p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Trading Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-foreground" />
              <span className="text-foreground">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground">Auto-execute:</span>
              <Switch
                checked={autoExecute}
                onCheckedChange={setAutoExecute}
                aria-label="Toggle auto-execute mode"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle dark mode</span>
            </div>
            <p className="text-foreground">Total Value: ${currentStats.totalValue.toFixed(2)}</p>
            <p className={currentStats.dailyChange >= 0 ? "text-green-500" : "text-red-500"}>
              Daily Change: {currentStats.dailyChange.toFixed(2)}%
            </p>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-auto bg-background text-foreground">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-2/3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Main Stock Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <StockChart 
                    data={chartData} 
                    colors={darkMode ? chartColors.dark : chartColors.light} 
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stock List</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Symbol</th>
                          <th className="text-left">Price</th>
                          <th className="text-left">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listData.map((item) => (
                          <tr key={item.id}>
                            <td>{item.symbol}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                              {item.change.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="w-full lg:w-1/3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="open" className="h-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="open">Open Orders</TabsTrigger>
                      <TabsTrigger value="filled">Filled Orders</TabsTrigger>
                    </TabsList>
                    <TabsContent value="open" className="h-[calc(100%-40px)]">
                      <ScrollArea className="h-full">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left">Symbol</th>
                              <th className="text-left">Type</th>
                              <th className="text-left">Quantity</th>
                              <th className="text-left">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {openOrders.map((order) => (
                              <tr key={order.id}>
                                <td>{order.symbol}</td>
                                <td>
                                  <Badge variant={order.type === 'BUY' ? 'default' : 'secondary'}>
                                    {order.type}
                                  </Badge>
                                </td>
                                <td>{order.quantity}</td>
                                <td>${order.price.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="filled" className="h-[calc(100%-40px)]">
                      <ScrollArea className="h-full">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th className="text-left">Symbol</th>
                              <th className="text-left">Type</th>
                              <th className="text-left">Quantity</th>
                              <th className="text-left">Price</th>
                              <th className="text-left">Filled At</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filledOrders.map((order) => (
                              <tr key={order.id}>
                                <td>{order.symbol}</td>
                                <td>
                                  <Badge variant={order.type === 'BUY' ? 'default' : 'secondary'}>
                                    {order.type}
                                  </Badge>
                                </td>
                                <td>{order.quantity}</td>
                                <td>${order.price.toFixed(2)}</td>
                                <td>{new Date(order.filledAt).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {suggestedOrders.map((order) => (
                      <div key={order.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold">{order.symbol}</span>
                          <Badge variant={order.type === 'BUY' ? 'default' : 'secondary'}>
                            {order.type}
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <span>Quantity: {order.quantity}</span>
                          <span className="ml-4">Price: ${order.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm mb-2">{order.reason}</p>
                        <p className="text-sm mb-2">Suggested by: {order.suggestedBy}</p>
                        <Button 
                          onClick={() => executeOrder(order)}
                          className="w-full"
                        >
                          Execute Order
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Orders</th>
                        <th className="text-left">Commission</th>
                        <th className="text-left">Skill Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamStats.map((stat) => (
                        <tr key={stat.id}>
                          <td>{stat.name}</td>
                          <td>{stat.ordersCount}</td>
                          <td>${stat.commissionCosts.toFixed(2)}</td>
                          <td>{stat.skillScore.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Current Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Symbol</th>
                      <th className="text-left">Quantity</th>
                      <th className="text-left">Average Price</th>
                      <th className="text-left">Current Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((position) => {
                      const currentPrice = listData.find(item => item.symbol === position.symbol)?.price || position.averagePrice
                      const currentValue = position.quantity * currentPrice
                      return (
                        <tr key={position.symbol}>
                          <td>{position.symbol}</td>
                          <td>{position.quantity}</td>
                          <td>${position.averagePrice.toFixed(2)}</td>
                          <td>${currentValue.toFixed(2)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
