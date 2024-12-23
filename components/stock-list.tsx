import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Stock } from "@/types";

interface StockListProps {
  // listData: Array<{
  //   id: number;
  //   symbol: string;
  //   price: number;
  //   change: number;
  // }>;
  stocks: Stock[];
}

export function StockList({ stocks }: StockListProps) {
  return (
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
              {stocks && stocks.map((item: Stock) => (
                <tr key={item.symbol}>
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
  )
}
