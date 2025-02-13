import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"
import { categories } from '@/constants';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { expenseService } from '@/services/expense.service';
import { toast } from 'sonner';

const AddExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editExpense = location.state?.expense;

  const [expenseData, setExpenseData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    people: [''],
    category: 'Food',
    type: 'expense'
  });

  useEffect(() => {
    if (editExpense) {
      setExpenseData(editExpense);
    }
  }, [editExpense]);

  useEffect(() => {
    if (editExpense) {
      const element = document.getElementById('add-new');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editExpense]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...expenseData,
        amount: parseFloat(expenseData.amount),
      };

      if (editExpense?._id) {
        await expenseService.updateExpense(editExpense._id, formattedData);
        toast.success('Expense updated successfully');
      } else {
        await expenseService.createExpense(formattedData);
        toast.success('Expense added successfully');
      }
      navigate('/');
    } catch (error) {
      toast.error(editExpense ? 'Failed to update expense' : 'Failed to add expense');
      console.error('Error with expense:', error);
    }
  };

  const isEditMode = Boolean(editExpense);

  return (
    <section id="add-new" className="py-4">
    <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-100">
            {isEditMode ? 'Update Kha₹cha' : 'Add New Kha₹cha'}
          </h2>
          <p className="text-gray-400 border-l border-slate-400 pl-6 italic">
          {isEditMode 
                ? 'Update your expense details below. Keep your records accurate and up to date.'
                : 'Keep track of your spending by adding your expenses. We\'ll help you categorize and analyze your spending patterns.'}
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 blur-3xl rounded-full" />
            <img src="save_money.gif" alt="Expense tracking illustration" className="relative rounded-lg h-[360px] w-[500px]" />
          </div>
        </div>
        <Card className="bg-gray-900/50 border-gray-800 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Title</label>
              <input
              type="text"
              name="title"
              value={expenseData.title}
              onChange={handleInputChange}
              placeholder="Metro Ticket, Groceries, etc..."
              className="w-full text-slate-50 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
              required
              />
            </div>
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={expenseData.amount}
                onChange={handleInputChange}
                placeholder="69"
                className="w-full text-slate-50 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-50  focus:ring-1 focus:ring-yellow-50 "
                step="1"
                required
              />
            </div>
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Date</label>
              <input
              type="date"
              name="date"
              value={expenseData.date}
              onChange={handleInputChange}
              className="w-full text-slate-50 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-50  focus:ring-1 focus:ring-yellow-50"
              required
              style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Category</label>
              <select 
                name="category"
                value={expenseData.category}
                onChange={handleInputChange}
                className="w-full text-slate-100 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                >
                    {categories.map((category) =>
                    (<option key={category} value={category}>{category}</option>)
                    )}
              </select>
            </div>
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Type</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={expenseData.type === 'expense'}
                    onChange={handleInputChange}
                    className="form-radio text-cyan-400 bg-gray-800 border-gray-700 focus:ring-cyan-400"
                  />
                  <span className="ml-2 text-slate-100">Expense</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={expenseData.type === 'income'}
                    onChange={handleInputChange}
                    className="form-radio text-cyan-400 bg-gray-800 border-gray-700 focus:ring-cyan-400"
                  />
                  <span className="ml-2 text-slate-100">Income</span>
                </label>
                </div>
                </div>
            <button className="w-full px-8 py-3 rounded-lg 
                    border border-solid border-gray-800 text-slate-300
                    bg-gray-800 hover:bg-yellow-50 hover:text-gray-950 transition-colors text-lg">
              {isEditMode ? 'Update Expense' : 'Add Expense'}
            </button>
          </form>
        </Card>
      </motion.div>
    </div>
  </section>
  )
}

export default AddExpense