import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { GraduationCap, Home, BookOpen, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/student', label: 'Home', icon: Home },
    { path: '/student/exams', label: 'Test Series', icon: BookOpen },
    { path: '/student/results', label: 'Results', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/student" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground">ExamGuard</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link key={item.path} to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.path) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User info + logout */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isActive(item.path) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-destructive w-full">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
