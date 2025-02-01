import { Card, CardContent } from '@/components/ui/card';

const ExpenseCard = () => {
    const expenses = [
        { id: 1, description: 'Groceries', amount: 150, category: 'Food', date: '2025-01-25' },
        { id: 2, description: 'Internet', amount: 80, category: 'Utilities', date: '2025-01-24' },
        { id: 3, description: 'Gas', amount: 45, category: 'Transport', date: '2025-01-23' },
        { id: 4, description: 'Gift', amount: 45, category: 'Misc', date: '2025-01-23' },
        { id: 5, description: 'Gas', amount: 45, category: 'Transport', date: '2025-01-23' },
    ];

  return (
    <div className="space-y-4">
    {expenses.map(expense => (
      <Card key={expense.id} className="bg-gray-900/50 border-gray-800 transition-transform transform hover:scale-105">
        <CardContent className="py-2 px-4 flex justify-between items-center">
          <div>
                    <p className="font-semibold text-slate-50">{expense.description}</p>
                <p className="text-gray-400 text-sm">{expense.category} | {expense.date}</p>
          </div>
          <p className="text-xl font-bold text-red-300">${expense.amount}</p>
        </CardContent>
      </Card>
    ))}
  </div>
  )
}

export default ExpenseCard