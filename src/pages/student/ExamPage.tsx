import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getExams, saveResult, addActivityLog } from '@/data/mockExams';
import { ProctoringViolation } from '@/types/exam';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, Camera, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const exam = getExams().find(e => e.id === examId);

  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [violations, setViolations] = useState<ProctoringViolation[]>([]);
  const [warningCount, setWarningCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Timer
  useEffect(() => {
    if (!started || submitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, submitted, timeLeft]);

  // Tab switch detection (Page Visibility API)
  useEffect(() => {
    if (!started || submitted) return;
    const handleVisibility = () => {
      if (document.hidden) {
        const v: ProctoringViolation = {
          id: crypto.randomUUID(),
          type: 'tab-switch',
          timestamp: new Date().toISOString(),
          description: 'Student switched to another tab',
        };
        setViolations(prev => [...prev, v]);
        setWarningCount(prev => prev + 1);
        addActivityLog({
          id: crypto.randomUUID(),
          studentId: user?.id || '',
          studentName: user?.name || '',
          examId: examId || '',
          type: 'warning',
          message: 'Tab switch detected',
          timestamp: new Date().toISOString(),
        });
        toast.warning('⚠️ Warning: Tab switch detected! This activity has been logged.');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [started, submitted, user, examId]);

  // Webcam setup
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setCameraActive(true);
    } catch {
      toast.error('Camera access denied. Proctoring requires camera access.');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setCameraActive(false);
  };

  const handleStart = async () => {
    if (exam?.proctored) {
      await startCamera();
    }
    setTimeLeft((exam?.duration || 30) * 60);
    setStarted(true);
    addActivityLog({
      id: crypto.randomUUID(),
      studentId: user?.id || '',
      studentName: user?.name || '',
      examId: examId || '',
      type: 'info',
      message: 'Student started exam',
      timestamp: new Date().toISOString(),
    });
  };

  const handleSubmit = useCallback(() => {
    if (submitted || !exam) return;
    setSubmitted(true);
    stopCamera();

    // Calculate score
    let score = 0;
    exam.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score += q.marks;
    });

    const percentage = Math.round((score / exam.totalMarks) * 100);
    saveResult(user?.id || '', {
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.subject,
      score,
      totalMarks: exam.totalMarks,
      percentage,
      submittedAt: new Date().toISOString(),
      violations: violations.length,
    });

    addActivityLog({
      id: crypto.randomUUID(),
      studentId: user?.id || '',
      studentName: user?.name || '',
      examId: exam.id,
      type: 'info',
      message: `Exam submitted. Score: ${score}/${exam.totalMarks} (${percentage}%)`,
      timestamp: new Date().toISOString(),
    });

    toast.success(`Exam submitted! Score: ${score}/${exam.totalMarks} (${percentage}%)`);
    setTimeout(() => navigate('/student/results'), 2000);
  }, [submitted, exam, answers, user, violations, navigate]);

  if (!exam) {
    return <div className="text-center py-20 text-muted-foreground">Exam not found</div>;
  }

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  const question = exam.questions[currentQ];

  // Pre-exam screen
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold font-heading text-foreground">{exam.title}</h1>
              <p className="text-muted-foreground mt-1">{exam.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Duration', `${exam.duration} minutes`],
                ['Questions', exam.questions.length],
                ['Total Marks', exam.totalMarks],
                ['Proctored', exam.proctored ? 'Yes - Camera Required' : 'No'],
              ].map(([label, value]) => (
                <div key={String(label)} className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">{String(label)}</p>
                  <p className="font-semibold text-foreground">{String(value)}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <h3 className="font-semibold text-destructive flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Important Instructions
              </h3>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>Do not switch tabs during the exam</li>
                <li>Ensure your face is visible to the camera at all times</li>
                <li>The exam will auto-submit when time runs out</li>
                <li>All suspicious activities are logged and monitored</li>
              </ul>
            </div>
            <Button onClick={handleStart} className="w-full" size="lg">
              <Camera className="w-4 h-4 mr-2" /> Start Exam
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Exam in progress
  return (
    <div className="space-y-4">
      {/* Top bar with timer + warnings */}
      <div className="sticky top-20 z-40 bg-card border border-border rounded-xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold ${timeLeft < 60 ? 'bg-destructive text-destructive-foreground animate-pulse' : timeLeft < 300 ? 'bg-yellow-500/10 text-yellow-600' : 'bg-muted text-foreground'}`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
          <span className="text-sm text-muted-foreground">Q {currentQ + 1}/{exam.questions.length}</span>
        </div>
        <div className="flex items-center gap-3">
          {warningCount > 0 && (
            <span className="flex items-center gap-1 text-sm text-destructive font-medium">
              <AlertTriangle className="w-4 h-4" />{warningCount} warning{warningCount > 1 ? 's' : ''}
            </span>
          )}
          {/* Mini webcam preview */}
          {cameraActive && (
            <div className="w-16 h-12 rounded-lg overflow-hidden border border-border">
              <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Question */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <span className="text-xs text-muted-foreground">Question {currentQ + 1} of {exam.questions.length} • {question.marks} marks</span>
            <h2 className="text-lg font-semibold text-foreground mt-2">{question.text}</h2>
          </div>
          <div className="space-y-3">
            {question.options.map((opt, idx) => (
              <button key={idx} onClick={() => setAnswers(prev => ({ ...prev, [question.id]: idx }))}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${answers[question.id] === idx ? 'border-primary bg-primary/10 text-foreground font-medium' : 'border-border text-muted-foreground hover:border-primary/50 hover:bg-muted'}`}>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border mr-3 text-xs font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrentQ(prev => Math.max(0, prev - 1))} disabled={currentQ === 0}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        {/* Question dots */}
        <div className="hidden sm:flex gap-1.5 flex-wrap justify-center max-w-md">
          {exam.questions.map((q, i) => (
            <button key={q.id} onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${i === currentQ ? 'bg-primary text-primary-foreground' : answers[q.id] !== undefined ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
              {i + 1}
            </button>
          ))}
        </div>
        {currentQ < exam.questions.length - 1 ? (
          <Button onClick={() => setCurrentQ(prev => prev + 1)}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Send className="w-4 h-4 mr-1" /> Submit
          </Button>
        )}
      </div>
    </div>
  );
}
