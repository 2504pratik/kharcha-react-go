import { navLinks } from "@/constants"
import { useAuth } from '@/hooks/useAuth';
import { User, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const { user, logout } = useAuth();

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
                <ul className='flex-1 hidden lg:flex justify-center items-center gap-16'>
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
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex items-center space-x-2 p-2 
                                rounded-full text-slate-700 hover:text-yellow-50
                                bg-yellow-50 hover:bg-transparent
                                border border-transparent
                                hover:border-yellow-50 transition-colors">
                                <User className="h-6 w-6" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="flex flex-col">
                            <DropdownMenuLabel>
                                {user.username}
                            </DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600" onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <button
                        className="px-4 py-2 rounded-lg bg-transparent
                        border border-solid border-yellow-50
                        hover:bg-yellow-50 hover:text-gray-950 transition-colors"
                        onClick={() => window.location.href = '/login'}
                    >
                        Log in →
                    </button>
                )}
            </nav>
        </header>
    )
}

export default Navbar