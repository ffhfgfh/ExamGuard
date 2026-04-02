import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, BookOpen, Shield } from 'lucide-react';
import { getExams } from '@/data/mockExams';

export default function StudentExams() {
  const exams = getExams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Test Series</h1>
        <p className="text-muted-foreground">Browse and attempt available exams</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map(exam => (
          <Card key={exam.id} className={`${!exam.isActive ? 'opacity-60' : ''}`}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-lg">{exam.title}</h3>
                  <p className="text-sm text-muted-foreground">{exam.subject}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${exam.isActive ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                  {exam.isActive ? 'Active' : 'Closed'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{exam.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exam.duration} min</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{exam.questions.length} Qs</span>
                <span>{exam.totalMarks} marks</span>
                {exam.proctored && <span className="flex items-center gap-1 text-destructive"><Shield className="w-3.5 h-3.5" />Proctored</span>}
              </div>
              {exam.isActive ? (
                <Link to={`/student/exam/${exam.id}`}
                  className="block w-full text-center py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Start Exam
                </Link>
              ) : (
                <div className="w-full text-center py-2.5 rounded-lg bg-muted text-muted-foreground text-sm">Exam Closed</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
