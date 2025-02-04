import { useState } from 'react';
import { Card } from "@/components/ui/card"
import { categories } from '@/constants';
import { motion } from 'framer-motion';

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    people: [''],
    category: 'Food',
    type: 'expense'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handlePeopleChange = (index, value) => {
  //   const newPeople = [...expenseData.people];
  //   newPeople[index] = value;
  //   setExpenseData(prev => ({
  //     ...prev,
  //     people: newPeople
  //   }));
  // };

  // const addPersonField = () => {
  //   setExpenseData(prev => ({
  //     ...prev,
  //     people: [...prev.people, '']
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here
    console.log(expenseData);
  };

  return (
    <section id="add-new" className="py-4">
    <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-100">Add New Kha₹cha</h2>
          <p className="text-gray-400 border-l border-slate-400 pl-6 italic">
            Keep track of your spending by adding your expenses. We'll help you categorize
            and analyze your spending patterns.
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
            {/* <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">People</label>
              {expenseData.people.map((person, index) => (
                <input
                  key={index}
                  type="text"
                  value={person}
                  onChange={(e) => handlePeopleChange(index, e.target.value)}
                  className="w-full p-2 mb-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder={`Person ${index + 1}`}
                />
              ))}
              <button 
                type="button"
                onClick={addPersonField}
                className="w-full px-4 py-2 mt-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Add Person
              </button>
            </div> */}
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
              Add Expense
            </button>
          </form>
        </Card>
      </motion.div>
    </div>
  </section>
  )
}

export default AddExpense