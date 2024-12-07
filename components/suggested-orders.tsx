import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderList } from './orders-list'
import { Order } from '@/types'

interface SuggestedOrdersCardProps {
  suggestedOrders: Order[];
  executeOrder: (order: Order) => void;
}

export function SuggestedOrdersCard({ suggestedOrders, executeOrder }: SuggestedOrdersCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderList orders={suggestedOrders} showSuggestionDetails={true} />
        <div className="mt-4 space-y-2">
          {suggestedOrders.map((order) => (
            <Button 
              key={order.id}
              onClick={() => executeOrder(order)}
              className="w-full"
            >
              Execute {order.symbol} {order.type}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
