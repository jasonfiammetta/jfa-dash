import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Clock } from "lucide-react"
import { useTheme } from '@/contexts/theme-context'
import { useTradingContext } from '@/contexts/trading-context'

export default function Header({}: object) {
  const { darkMode, setDarkMode } = useTheme()
  const { autoExecute, setAutoExecute, currentTime, currentStats, isConnected } = useTradingContext()

  return (
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
          <p className={isConnected ? "text-green-500" : "text-red-500"}>
            {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
      </div>
    </header>
  )
}
