import { useState } from 'react';
import { ExpenseGraph } from './ExpenseGraph';
import { CategoryPieChart } from './CategoryPieChart';

export function InteractiveCharts() {
  const [expandedChart, setExpandedChart] = useState('expense-graph');

  return (
    <div>
      <h2 className="text-2xl font-thin mb-4 text-slate-300">Interactive Charts</h2>
      <div className="flex flex-row gap-4">
        <div 
          className={
            expandedChart === 'expense-graph' 
              ? 'w-full transition-all duration-300' 
              : 'w-1/4 transition-all duration-300 cursor-pointer'
          }
          onClick={() => setExpandedChart('expense-graph')}
        >
          <ExpenseGraph />
        </div>
        <div 
          className={
            expandedChart === 'category-pie' 
              ? 'w-full transition-all duration-300' 
              : 'w-1/4 transition-all duration-300 cursor-pointer'
          }
          onClick={() => setExpandedChart('category-pie')}
        >
          <CategoryPieChart />
        </div>
      </div>
    </div>
  );
}