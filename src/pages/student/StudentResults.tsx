import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getResults } from '@/data/mockExams';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function StudentResults() {
  const { user } = useAuth();
  const results = getResults(user?.id || '');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Results</h1>
        <p className="text-muted-foreground">View your exam results and performance</p>
      </div>

      {results.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No results yet. Complete an exam to see your scores here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((result, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${result.percentage >= 70 ? 'bg-accent/10' : result.percentage >= 40 ? 'bg-yellow-500/10' : 'bg-destructive/10'}`}>
                      {result.percentage >= 70 ? <CheckCircle className="w-6 h-6 text-accent" /> : result.percentage >= 40 ? <AlertTriangle className="w-6 h-6 text-yellow-500" /> : <XCircle className="w-6 h-6 text-destructive" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{result.examTitle}</h3>
                      <p className="text-sm text-muted-foreground">{result.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">Submitted: {new Date(result.submittedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold font-heading text-foreground">{result.score}/{result.totalMarks}</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold font-heading ${result.percentage >= 70 ? 'text-accent' : result.percentage >= 40 ? 'text-yellow-500' : 'text-destructive'}`}>{result.percentage}%</p>
                      <p className="text-xs text-muted-foreground">Percentage</p>
                    </div>
                    {result.violations > 0 && (
                      <div className="text-center">
                        <p className="text-2xl font-bold font-heading text-destructive">{result.violations}</p>
                        <p className="text-xs text-muted-foreground">Violations</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
