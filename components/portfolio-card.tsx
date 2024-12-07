import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Stock } from "@/types";

interface PortfolioPosition {
  symbol: string;
  quantity: number;
  averagePrice: number;
}

interface PortfolioCardProps {
  portfolio: PortfolioPosition[];
  stocks: Stock[];
}

export function PortfolioCard({ portfolio, stocks }: PortfolioCardProps) {
  return (
    <Card>
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
                const currentPrice = stocks.find(item => item.symbol === position.symbol)?.price || position.averagePrice
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
  )
}
