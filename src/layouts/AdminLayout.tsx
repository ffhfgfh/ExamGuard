import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, PlusCircle, BookOpen, BarChart3, Users, Activity, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/create-exam', label: 'Create Exam', icon: PlusCircle },
    { path: '/admin/manage-exams', label: 'Manage Exams', icon: BookOpen },
    { path: '/admin/scores', label: 'Analyze Scores', icon: BarChart3 },
    { path: '/admin/proctoring', label: 'Live Proctoring', icon: Activity },
    { path: '/admin/students', label: 'Student Reports', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col sidebar-gradient border-r border-sidebar-border fixed h-screen">
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-sidebar-foreground">ExamGuard</span>
          </Link>
          <p className="text-xs text-sidebar-foreground/50 mt-1 ml-10">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(item.path) ? 'bg-sidebar-primary text-primary-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground text-sm font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50">Administrator</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-sidebar-foreground/50 hover:text-sidebar-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-14 flex items-center px-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground mr-3">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="font-heading font-bold text-foreground">ExamGuard Admin</span>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full sidebar-gradient border-r border-sidebar-border flex flex-col">
            <div className="p-6">
              <span className="font-heading font-bold text-lg text-sidebar-foreground">ExamGuard</span>
            </div>
            <nav className="flex-1 px-3 space-y-1">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive(item.path) ? 'bg-sidebar-primary text-primary-foreground' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-sidebar-border">
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-400">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8 mt-14 lg:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
