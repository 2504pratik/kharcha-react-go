import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const ExpenseCard = () => {
    const [selectedExpense, setSelectedExpense] = useState(null);

    const expenses = [
        { id: 1, description: 'Groceries', amount: 150, category: 'Food', date: '2025-01-25', type: 'expense' },
        { id: 2, description: 'Internet', amount: 80, category: 'Utilities', date: '2025-01-24', type: 'expense' },
        { id: 3, description: 'Gas', amount: 45, category: 'Transport', date: '2025-01-23', type: 'expense' },
        { id: 4, description: 'Freelance Work', amount: 500, category: 'Income', date: '2025-01-23', type: 'income' },
        { id: 5, description: 'Gift', amount: 45, category: 'Transport', date: '2025-01-23', type: 'expense' },
    ];

    const handleExpenseClick = (expense) => {
        setSelectedExpense(selectedExpense?.id === expense.id ? null : expense);
    };

    return (
        <div className="space-y-4 relative">
            {expenses.map(expense => (
                <div key={expense.id} className="relative">
                    <Card 
                        onClick={() => handleExpenseClick(expense)}
                        className="bg-gray-900/50 border-gray-800 transition-transform transform hover:scale-105 cursor-pointer"
                    >
                        <CardContent className="py-2 px-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-slate-50">{expense.description}</p>
                                <p className="text-gray-400 text-sm">{expense.category} | {expense.date}</p>
                            </div>
                            <p className={`text-xl font-bold ${expense.type === 'expense' ? 'text-red-300' : 'text-green-300'}`}>
                                ${expense.amount}
                            </p>
                        </CardContent>
                    </Card>

                    <AnimatePresence>
                        {selectedExpense?.id === expense.id && (
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
                                                <p className="text-slate-50 font-semibold">{expense.description}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Amount</p>
                                                <p className={`font-bold ${expense.type === 'expense' ? 'text-red-300' : 'text-green-300'}`}>
                                                    ${expense.amount}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Date</p>
                                                <p className="text-slate-50">{expense.date}</p>
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
    )
}

export default ExpenseCard