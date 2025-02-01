import ExpenseCard from '@/components/ExpenseCard';
import { ExpenseGraph } from '@/components/ExpenseGraph';

const Expenses = () => {

  return (
    <section id="expenses" className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-thin mb-4 text-slate-300">Recent Expenses</h2>
            <ExpenseCard />
          </div>
          <div>
            <ExpenseGraph />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Expenses