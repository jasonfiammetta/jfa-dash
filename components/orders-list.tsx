import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Order } from '@/types'

interface OrderListProps {
  orders: Order[];
  showSuggestionDetails?: boolean;
}

export function OrderList({ orders, showSuggestionDetails = false }: OrderListProps) {
  return (
    <ScrollArea className="h-[300px]">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Symbol</th>
            <th className="text-left">Type</th>
            <th className="text-left">Quantity</th>
            <th className="text-left">Price</th>
            {!showSuggestionDetails && <th className="text-left">Status</th>}
            {showSuggestionDetails && (
              <>
                <th className="text-left">Suggested By</th>
                <th className="text-left">Reason</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((order) => (
            <tr key={order.id}>
              <td>{order.symbol}</td>
              <td>
                <Badge variant={order.type === 'BUY' ? 'default' : 'secondary'}>
                  {order.type}
                </Badge>
              </td>
              <td>{order.quantity}</td>
              <td>${order.price.toFixed(2)}</td>
              {!showSuggestionDetails && <td>{order.status}</td>}
              {showSuggestionDetails && (
                <>
                  <td>{order.suggestedBy}</td>
                  <td>{order.reason}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  )
}
