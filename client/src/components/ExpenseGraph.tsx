import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { expenseService, MonthlyExpenseData } from "@/services/expense.service"

const chartConfig = {
  earning: {
    label: "Earning",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function ExpenseGraph() {
  const [chartData, setChartData] = useState<MonthlyExpenseData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await expenseService.getExpenseGraphData()
        setChartData(data)
      } catch (err) {
        setError("Failed to load expense data")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  // Calculate expense change percentage
  const lastTwoMonths = chartData.slice(-2)
  const expenseChange = lastTwoMonths.length === 2
    ? ((lastTwoMonths[1].expense - lastTwoMonths[0].expense) / lastTwoMonths[0].expense * 100).toFixed(1)
    : "0"

  return (
    <Card className="flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-slate-300">
          Spending Pattern
        </CardTitle>
        <CardDescription className="truncate">
          Showing total spending for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillEarning" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-earning)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-earning)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expense)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillExpense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="a"
            />
            <Area
              dataKey="earning"
              type="natural"
              fill="url(#fillEarning)"
              fillOpacity={0.4}
              stroke="var(--color-earning)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex text-slate-50 items-center gap-2 font-medium leading-none truncate">
              Expenses {Number(expenseChange) >= 0 ? "up" : "down"} by {Math.abs(Number(expenseChange))}% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground truncate">
              {chartData[0]?.month} - {chartData[chartData.length - 1]?.month} {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}