import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserFromCookie = () => {
      const userInfo = document.cookie.match('userInfo=(.*?)(;|$)');
      return userInfo ? JSON.parse(decodeURIComponent(userInfo[1])) : null;
    };

    setUser(getUserFromCookie());

    const interval = setInterval(() => {
      setUser(getUserFromCookie());
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=${30 * 24 * 60 * 60}`;
    navigate('/dashboard');
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { credentials: 'include' });
    setUser(null);
    document.cookie = 'userInfo=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default useAuth;