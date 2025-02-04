import ExpenseCard from '@/components/ExpenseCard';
import { InteractiveCharts } from '@/components/InteractiveCharts';
import { motion } from 'framer-motion';

const Expenses = () => {
  return (
    <section 
      id="expenses" 
      className="py-24 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 gap-12"
      >
        <div>
        <h2 className="text-2xl font-thin mb-4 text-slate-300">Recent Expenses</h2>
        <ExpenseCard />
        </div>
        <div>
        <InteractiveCharts/>
        </div>
      </motion.div>
      </div>
    </section>
  )
}

export default Expenses