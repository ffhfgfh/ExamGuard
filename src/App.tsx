import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import LoginPage from "@/pages/LoginPage";
import StudentLayout from "@/layouts/StudentLayout";
import StudentHome from "@/pages/student/StudentHome";
import StudentExams from "@/pages/student/StudentExams";
import StudentResults from "@/pages/student/StudentResults";
import ExamPage from "@/pages/student/ExamPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CreateExam from "@/pages/admin/CreateExam";
import ManageExams from "@/pages/admin/ManageExams";
import AnalyzeScores from "@/pages/admin/AnalyzeScores";
import LiveProctoring from "@/pages/admin/LiveProctoring";
import StudentReports from "@/pages/admin/StudentReports";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to={user?.role === 'admin' ? '/admin' : '/student'} /> : <LoginPage />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/student') : '/login'} />} />

      {/* Student routes */}
      <Route path="/student" element={<ProtectedRoute role="student"><StudentLayout /></ProtectedRoute>}>
        <Route index element={<StudentHome />} />
        <Route path="exams" element={<StudentExams />} />
        <Route path="results" element={<StudentResults />} />
        <Route path="exam/:examId" element={<ExamPage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="create-exam" element={<CreateExam />} />
        <Route path="manage-exams" element={<ManageExams />} />
        <Route path="scores" element={<AnalyzeScores />} />
        <Route path="proctoring" element={<LiveProctoring />} />
        <Route path="students" element={<StudentReports />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
