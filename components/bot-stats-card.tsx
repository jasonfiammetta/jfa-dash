import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BotStat {
  id: number;
  name: string;
  ordersCount: number;
  commissionCosts: number;
  skillScore: number;
}

interface BotStatsCardProps {
  botStats: BotStat[];
}

export function BotStatsCard({ botStats }: BotStatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Stats</CardTitle>
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
              {botStats.map((stat) => (
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
  )
}
