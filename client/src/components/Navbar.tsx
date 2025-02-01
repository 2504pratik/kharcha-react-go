import { navLinks } from "@/constants"

const Navbar = () => {
    return (
        <header>
            <nav className="flex items-center justify-between px-3 py-3 border-b border-yellow-50">
                <a href="/">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold px-5
                                bg-gradient-to-r from-gray-950 via-slate-200 to-gray-950
                                bg-clip-text text-transparent
                                cursor-pointer">
                            Kha₹cha
                        </span>
                    </div>
                </a>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className='font-montserrat leading-normal text-slate-300 hover:text-yellow-50 transition-colors'
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <button className="px-4 py-2 rounded-lg bg-transparent
                    border border-solid border-yellow-50
                    hover:bg-yellow-50 hover:text-gray-950 transition-colors">
                    Log in →
                </button>
            </nav>
      </header>
  )
}

export default Navbar