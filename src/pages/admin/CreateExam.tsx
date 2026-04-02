import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getExams, saveExams } from '@/data/mockExams';
import { Exam, Question } from '@/types/exam';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function CreateExam() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState(30);
  const [proctored, setProctored] = useState(true);
  const [questions, setQuestions] = useState<Array<{ text: string; options: string[]; correctAnswer: number; marks: number }>>([
    { text: '', options: ['', '', '', ''], correctAnswer: 0, marks: 5 },
  ]);

  const addQuestion = () => {
    setQuestions(prev => [...prev, { text: '', options: ['', '', '', ''], correctAnswer: 0, marks: 5 }]);
  };

  const removeQuestion = (idx: number) => {
    if (questions.length <= 1) return;
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const updateQuestion = (idx: number, field: string, value: any) => {
    setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => i === qIdx ? { ...q, options: q.options.map((o, j) => j === oIdx ? value : o) } : q));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || questions.some(q => !q.text || q.options.some(o => !o))) {
      toast.error('Please fill all fields');
      return;
    }

    const newExam: Exam = {
      id: `exam-${crypto.randomUUID().slice(0, 8)}`,
      title,
      description,
      subject,
      duration,
      proctored,
      isActive: true,
      totalMarks: questions.reduce((a, q) => a + q.marks, 0),
      createdAt: new Date().toISOString(),
      questions: questions.map((q, i) => ({ ...q, id: `q-${crypto.randomUUID().slice(0, 8)}` })),
    };

    const exams = getExams();
    exams.push(newExam);
    saveExams(exams);
    toast.success('Exam created successfully!');
    navigate('/admin/manage-exams');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Create Exam</h1>
        <p className="text-muted-foreground">Set up a new examination with questions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Exam details */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-heading font-semibold text-foreground">Exam Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Data Structures Midterm" required className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Computer Science" required className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Duration (minutes)</label>
                <Input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} min={5} max={180} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Proctoring</label>
                <div className="mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={proctored} onChange={e => setProctored(e.target.checked)} className="rounded border-border" />
                    <span className="text-sm text-foreground">Enable AI Proctoring</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of the exam"
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px]" />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-foreground text-lg">Questions ({questions.length})</h2>
            <Button type="button" variant="outline" onClick={addQuestion} size="sm">
              <PlusCircle className="w-4 h-4 mr-1" /> Add Question
            </Button>
          </div>

          {questions.map((q, qIdx) => (
            <Card key={qIdx}>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Question {qIdx + 1}</span>
                  <div className="flex items-center gap-2">
                    <Input type="number" value={q.marks} onChange={e => updateQuestion(qIdx, 'marks', Number(e.target.value))} className="w-20" min={1} />
                    <span className="text-xs text-muted-foreground">marks</span>
                    {questions.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeQuestion(qIdx)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <Input value={q.text} onChange={e => updateQuestion(qIdx, 'text', e.target.value)} placeholder="Enter question text" required />
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input type="radio" name={`correct-${qIdx}`} checked={q.correctAnswer === oIdx}
                        onChange={() => updateQuestion(qIdx, 'correctAnswer', oIdx)}
                        className="accent-primary" />
                      <Input value={opt} onChange={e => updateOption(qIdx, oIdx, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + oIdx)}`} required className="flex-1" />
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">Select the radio button next to the correct answer</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" /> Create Exam
        </Button>
      </form>
    </div>
  );
}
