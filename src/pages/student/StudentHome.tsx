import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { getExams, getResults } from '@/data/mockExams';

export default function StudentHome() {
  const { user } = useAuth();
  const exams = getExams();
  const results = getResults(user?.id || '');
  const activeExams = exams.filter(e => e.isActive);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">Here's your exam overview</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Available Exams', value: activeExams.length, icon: BookOpen, color: 'text-primary' },
          { label: 'Completed', value: results.length, icon: CheckCircle, color: 'text-accent' },
          { label: 'Avg Score', value: results.length ? `${Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length)}%` : 'N/A', icon: BarChart3, color: 'text-primary' },
          { label: 'Total Exams', value: exams.length, icon: Clock, color: 'text-muted-foreground' },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xl font-bold font-heading text-foreground mb-4">Available Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeExams.map(exam => (
            <Card key={exam.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">{exam.title}</h3>
                    <p className="text-sm text-muted-foreground">{exam.subject}</p>
                  </div>
                  {exam.proctored && (
                    <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full font-medium">Proctored</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{exam.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exam.duration} min</span>
                  <span>{exam.questions.length} questions</span>
                  <span>{exam.totalMarks} marks</span>
                </div>
                <Link to={`/student/exam/${exam.id}`}
                  className="block w-full text-center py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Start Exam
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
