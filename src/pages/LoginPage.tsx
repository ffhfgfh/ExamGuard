import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/exam';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GraduationCap, Shield, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginEmail, loginPassword)) {
      toast.success('Logged in successfully!');
      // Navigate based on role
      const user = JSON.parse(localStorage.getItem('exam_user') || '{}');
      navigate(user.role === 'admin' ? '/admin' : '/student');
    } else {
      toast.error('Invalid email or password');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(signupName, signupEmail, signupPassword, signupRole)) {
      toast.success('Account created successfully!');
      navigate(signupRole === 'admin' ? '/admin' : '/student');
    } else {
      toast.error('Email already exists');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-heading text-foreground">ExamGuard</h1>
          <p className="text-muted-foreground mt-1">AI-Proctored Examination System</p>
        </div>

        <Card className="glass-card border-none shadow-2xl">
          <Tabs defaultValue="login">
            <CardHeader className="pb-3">
              <TabsList className="w-full">
                <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
                <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              {/* Login Tab */}
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative mt-1">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        required
                      />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
                <div className="mt-4 p-3 rounded-lg bg-muted text-xs space-y-1">
                  <p className="font-medium text-muted-foreground">Demo Credentials:</p>
                  <p className="text-muted-foreground">Admin: admin@exam.com / admin123</p>
                  <p className="text-muted-foreground">Student: student@exam.com / student123</p>
                </div>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input value={signupName} onChange={e => setSignupName(e.target.value)} placeholder="John Doe" required className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="you@example.com" required className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Input type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <div className="flex gap-3 mt-2">
                      <button type="button" onClick={() => setSignupRole('student')}
                        className={`flex-1 flex items-center gap-2 p-3 rounded-lg border text-sm font-medium transition-colors ${signupRole === 'student' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                        <GraduationCap className="w-4 h-4" /> Student
                      </button>
                      <button type="button" onClick={() => setSignupRole('admin')}
                        className={`flex-1 flex items-center gap-2 p-3 rounded-lg border text-sm font-medium transition-colors ${signupRole === 'admin' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                        <Shield className="w-4 h-4" /> Admin
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Create Account</Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
