import { Card, CardContent } from '@/components/ui/card';

export default function AnalyzeScores() {
  // Simulated score data
  const scoreData = [
    { exam: 'Data Structures & Algorithms', avgScore: 72, highest: 95, lowest: 30, attempts: 24 },
    { exam: 'Database Management Systems', avgScore: 68, highest: 90, lowest: 25, attempts: 18 },
    { exam: 'Operating Systems', avgScore: 75, highest: 100, lowest: 40, attempts: 31 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Analyze Scores</h1>
        <p className="text-muted-foreground">View performance analytics across all exams</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {scoreData.map((data, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-heading font-semibold text-foreground">{data.exam}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold text-primary">{data.avgScore}%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Attempts</p>
                  <p className="text-2xl font-bold text-foreground">{data.attempts}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Highest</p>
                  <p className="text-2xl font-bold text-accent">{data.highest}%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-xs text-muted-foreground">Lowest</p>
                  <p className="text-2xl font-bold text-destructive">{data.lowest}%</p>
                </div>
              </div>
              {/* Simple bar visualization */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Score Distribution</span>
                  <span>Avg: {data.avgScore}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${data.avgScore}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
