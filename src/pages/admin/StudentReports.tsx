import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function StudentReports() {
  const students = [
    { name: 'John Student', email: 'john@example.com', examsAttempted: 3, avgScore: 78, violations: 2, status: 'good' },
    { name: 'Jane Doe', email: 'jane@example.com', examsAttempted: 5, avgScore: 92, violations: 0, status: 'excellent' },
    { name: 'Mike Ross', email: 'mike@example.com', examsAttempted: 2, avgScore: 45, violations: 5, status: 'flagged' },
    { name: 'Sara Connor', email: 'sara@example.com', examsAttempted: 4, avgScore: 67, violations: 1, status: 'good' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Student Reports</h1>
        <p className="text-muted-foreground">View individual student performance and proctoring reports</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Exams</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Avg Score</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Violations</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </td>
                    <td className="p-4 text-foreground">{s.examsAttempted}</td>
                    <td className="p-4">
                      <span className={`font-medium ${s.avgScore >= 70 ? 'text-accent' : s.avgScore >= 40 ? 'text-yellow-500' : 'text-destructive'}`}>
                        {s.avgScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`${s.violations > 3 ? 'text-destructive' : s.violations > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                        {s.violations}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        s.status === 'excellent' ? 'bg-accent/10 text-accent' :
                        s.status === 'good' ? 'bg-primary/10 text-primary' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {s.status === 'flagged' ? <XCircle className="w-3 h-3" /> :
                         s.status === 'excellent' ? <CheckCircle className="w-3 h-3" /> :
                         <AlertTriangle className="w-3 h-3" />}
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
