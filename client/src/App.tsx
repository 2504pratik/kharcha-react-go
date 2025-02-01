import Navbar from "./components/Navbar"
import { Hero, Expenses, AddExpense, Contact } from "./sections"

function App() {

  return (
    <main className="bg-black text-white">
      <Navbar />
      <section>
        <Hero />
      </section>
      <section>
        <Expenses />
      </section>
      <section>
        <AddExpense />
      </section>
      <section>
        <Contact />
      </section>
    </main>
  )
}

export default App
