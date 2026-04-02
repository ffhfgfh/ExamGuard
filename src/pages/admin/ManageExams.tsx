import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getExams, saveExams } from '@/data/mockExams';
import { Trash2, Eye, EyeOff, Clock, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ManageExams() {
  const [exams, setExams] = useState(getExams());

  const toggleActive = (id: string) => {
    const updated = exams.map(e => e.id === id ? { ...e, isActive: !e.isActive } : e);
    setExams(updated);
    saveExams(updated);
    toast.success('Exam status updated');
  };

  const deleteExam = (id: string) => {
    const updated = exams.filter(e => e.id !== id);
    setExams(updated);
    saveExams(updated);
    toast.success('Exam deleted');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Manage Exams</h1>
        <p className="text-muted-foreground">View, edit, and manage all examinations</p>
      </div>

      <div className="space-y-4">
        {exams.map(exam => (
          <Card key={exam.id}>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-foreground">{exam.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${exam.isActive ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                      {exam.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{exam.subject}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exam.duration} min</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{exam.questions.length} questions</span>
                    <span>{exam.totalMarks} marks</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleActive(exam.id)}>
                    {exam.isActive ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                    {exam.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteExam(exam.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {exams.length === 0 && (
          <Card><CardContent className="p-12 text-center text-muted-foreground">No exams created yet</CardContent></Card>
        )}
      </div>
    </div>
  );
}
