import Navbar from "./components/Navbar"
import { AuthProvider } from "./hooks/useAuth"
import { Hero, Expenses, AddExpense, Contact } from "./sections"

function App() {

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
