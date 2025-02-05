import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { expenseService, Expense } from '@/services/expense.service';
import { format } from 'date-fns';
import { toast } from 'sonner';

const ExpenseCard = () => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await expenseService.getExpenses();
        setExpenses(data || []); // Ensure we always set an array
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch expenses';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(selectedExpense?._id === expense._id ? null : expense);
  };

  if (loading) {
    return <div className="text-slate-300">Loading expenses...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error: {error}</div>;
  }

  if (expenses.length === 0) {
    return <div className="text-slate-300">No expenses found. Add some expenses to get started!</div>;
  }

  return (
    <div className="space-y-4 relative">
      {expenses.map(expense => (
        <div key={expense._id} className="relative">
          <Card 
            onClick={() => handleExpenseClick(expense)}
            className="bg-gray-900/50 border-gray-800 transition-transform transform hover:scale-105 cursor-pointer"
          >
            <CardContent className="py-2 px-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-50">{expense.title}</p>
                <p className="text-gray-400 text-sm">
                  {expense.category} | {format(new Date(expense.date), 'MMM dd, yyyy')}
                </p>
              </div>
              <p className={`text-xl font-bold ${expense.type === 'expense' ? 'text-red-300' : 'text-green-300'}`}>
                ₹{expense.amount}
              </p>
            </CardContent>
          </Card>

          <AnimatePresence>
            {selectedExpense?._id === expense._id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 right-0 z-10"
              >
                <Card className="bg-gray-800 border-gray-700 mt-2">
                  <CardContent className="p-4 space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Title</p>
                        <p className="text-slate-50 font-semibold">{expense.title}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Amount</p>
                        <p className={`font-bold ${expense.type === 'expense' ? 'text-red-300' : 'text-green-300'}`}>
                          ₹{expense.amount}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="text-slate-50">{format(new Date(expense.date), 'MMM dd, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="text-slate-50">{expense.category}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Type</p>
                      <p className={`font-semibold ${expense.type === 'expense' ? 'text-red-300' : 'text-green-300'}`}>
                        {expense.type.charAt(0).toUpperCase() + expense.type.slice(1)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default ExpenseCard;