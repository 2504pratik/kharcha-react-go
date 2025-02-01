import { Card } from "@/components/ui/card"

const AddExpense = () => {
  return (
    <section id="add-new" className="min-h-screen py-24">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Add New Expense</h2>
          <p className="text-gray-400">
            Keep track of your spending by adding your expenses. We'll help you categorize
            and analyze your spending patterns.
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 blur-3xl rounded-full" />
            <img src="save_money.gif" alt="Expense tracking illustration" className="relative rounded-lg h-[360px] w-[500px]" />
          </div>
        </div>
        <Card className="bg-gray-900/50 border-gray-800 p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-100 text-sm font-medium mb-2">Category</label>
              <select className="w-full text-slate-100 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400">
                <option>Food</option>
                <option>Transport</option>
                <option>Utilities</option>
                <option>Entertainment</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-400 hover:opacity-90 transition-opacity">
              Add Expense
            </button>
          </form>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default AddExpense