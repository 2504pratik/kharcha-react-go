import CategoryPieChart from "./CategoryPieChart";
import ExpenseGraph from "./ExpenseGraph";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const InteractiveCharts: React.FC = () => {
  return (
    <Card className="w-full bg-transparent border-none">
      <Tabs defaultValue="expense-summary" className="w-full">
        <TabsList className="flex justify-center bg-transparent gap-4">
          <TabsTrigger 
            value="expense-summary" 
            className="data-[state=active]:text-slate-300 data-[state=active]:border-b data-[state=active]:border-slate-300 
                      data-[state=inactive]:text-slate-500 
                      bg-transparent hover:bg-transparent data-[state=active]:bg-transparent"
          >
            Expense Summary
          </TabsTrigger>
          <TabsTrigger 
            value="category-overview" 
            className="data-[state=active]:text-slate-300 data-[state=active]:border-b data-[state=active]:border-slate-300 
                      data-[state=inactive]:text-slate-500 
                      bg-transparent hover:bg-transparent data-[state=active]:bg-transparent"
          >
            Category Overview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="expense-summary">
          <CardContent>
            <ExpenseGraph />
          </CardContent>
        </TabsContent>
        
        <TabsContent value="category-overview">
          <CardContent>
            <CategoryPieChart />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default InteractiveCharts;
