import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types/exam';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users
const DEMO_USERS: Array<User & { password: string }> = [
  { id: '1', name: 'Admin User', email: 'admin@exam.com', password: 'admin123', role: 'admin' },
  { id: '2', name: 'John Student', email: 'student@exam.com', password: 'student123', role: 'student' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('exam_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string): boolean => {
    // Check stored users first
    const storedUsers = JSON.parse(localStorage.getItem('exam_users') || '[]');
    const allUsers = [...DEMO_USERS, ...storedUsers];
    const found = allUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('exam_user', JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((name: string, email: string, password: string, role: UserRole): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem('exam_users') || '[]');
    const allUsers = [...DEMO_USERS, ...storedUsers];
    if (allUsers.find(u => u.email === email)) return false;
    
    const newUser = { id: crypto.randomUUID(), name, email, password, role };
    storedUsers.push(newUser);
    localStorage.setItem('exam_users', JSON.stringify(storedUsers));
    
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('exam_user', JSON.stringify(userData));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('exam_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
