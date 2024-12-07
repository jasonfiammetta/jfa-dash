import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockChart } from './stock-chart'
import { useTheme } from '@/contexts/theme-context'
import { Stock } from '@/types'
import { useState } from "react"
import { CandlestickData } from 'lightweight-charts';


interface StockChartsCardProps {
  stocks: Stock[];
  // chartData: Record<string, Array<{
  //   time: string;
  //   open: number;
  //   high: number;
  //   low: number;
  //   close: number;
  // }>>;
  chartData: CandlestickData[];
}

export function StockChartsCard({ stocks, chartData }: StockChartsCardProps) {
  const { darkMode } = useTheme()
  // const [activeStock, setActiveStock] = useState(stocks[0].symbol)
  const [activeStock, setActiveStock] = useState("SPY")


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
    <Card>
      <CardHeader>
        <CardTitle>Stock Charts</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeStock} onValueChange={setActiveStock}>
          <TabsList>
            {stocks.map((stock) => (
              <TabsTrigger key={stock.symbol} value={stock.symbol}>{stock.symbol}</TabsTrigger>
            ))}
          </TabsList>
          {stocks.map((stock) => (
            <TabsContent key={stock.symbol} value={stock.symbol}>
              <Card>
                <CardHeader>
                  <CardTitle>{stock.symbol}</CardTitle>
                </CardHeader>
                <CardContent>
                  <StockChart 
                    data={chartData} 
                    colors={darkMode ? chartColors.dark : chartColors.light} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
