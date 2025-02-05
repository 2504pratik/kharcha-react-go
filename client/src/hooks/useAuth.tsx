import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { BASE_URL } from '@/main';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, accessToken: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Try to get initial auth state
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      authService.setAccessToken(storedToken);
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    authService.setAccessToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', token);
    navigate('/');
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, { 
        method: 'POST',
        credentials: 'include' 
      });
      
      // Clear state and storage
      setUser(null);
      authService.clearTokens();
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAuthenticated = () => {
    return !!user && !!authService.getAccessToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};