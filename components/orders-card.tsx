import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderList } from './orders-list'
import { Order } from '@/types'

interface OrdersCardProps {
  openOrders: Order[];
  filledOrders: Order[];
}

export function OrdersCard({ openOrders, filledOrders }: OrdersCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="open">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="open">Open Orders</TabsTrigger>
            <TabsTrigger value="filled">Filled Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <OrderList orders={openOrders} />
          </TabsContent>
          <TabsContent value="filled">
            <OrderList orders={filledOrders} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
