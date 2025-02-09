import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
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

const chartConfig = {
    amount: {
        label: "Amount",
    },
    food: {
        label: "Food",
        color: "hsl(210, 100%, 70%)", // Blue
    },
    transportation: {
        label: "Transportation",
        color: "hsl(100, 100%, 70%)", // Green
    },
    accomodation: {
        label: "Accomodation",
        color: "hsl(40 100% 70%)", // Yellow
    },
    entertainment: {
        label: "Entertainment",
        color: "hsl(20, 100%, 70%)", // Orange
    },
    health: {
        label: "Health",
        color: "hsl(255, 100%, 70%)", // Purple
    },
    shopping: {
        label: "Shopping",
        color: "hsl(330, 100%, 70%)", // Pink
    },
    other: {
        label: "Other",
        color: "hsl(180, 100%, 70%)", // Cyan
    },
} satisfies ChartConfig

const chartData = [
    { category: "Food", amount: 275, fill: chartConfig.food.color },
    { category: "Transportation", amount: 115, fill: chartConfig.transportation.color },
    { category: "Accomodation", amount: 150, fill: chartConfig.accomodation.color },
    { category: "Entertainment", amount: 100, fill: chartConfig.entertainment.color },
    { category: "Health", amount: 80, fill: chartConfig.health.color },
    { category: "Shopping", amount: 50, fill: chartConfig.shopping.color },
    { category: "Other", amount: 75, fill: chartConfig.other.color },
]

export default function CategoryPieChart() {
  return (
    <Card className="flex flex-col bg-gray-900/50 border-gray-800 overflow-hidden">
      <CardHeader className="items-center pb-0">
          <CardTitle className="text-slate-300">Category-wise Kha₹cha</CardTitle>
          <CardDescription className="truncate">
            Showing overview of category-wise spendings
          </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex text-slate-50 items-center gap-2 font-medium leading-none truncate">
            Shopping expenses up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground truncate">
            January - June 2024
          </div>
        </CardFooter>
    </Card>
  )
}