import { Card, CardContent } from '@/components/ui/card';
import { getExams, getActivityLogs } from '@/data/mockExams';
import { Users, BookOpen, AlertTriangle, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const exams = getExams();
  const logs = getActivityLogs();
  const activeExams = exams.filter(e => e.isActive).length;
  const warnings = logs.filter(l => l.type === 'warning' || l.type === 'danger').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage exams, monitor students, and review reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Exams', value: exams.length, icon: BookOpen, color: 'text-primary' },
          { label: 'Active Exams', value: activeExams, icon: Activity, color: 'text-accent' },
          { label: 'Total Alerts', value: warnings, icon: AlertTriangle, color: 'text-destructive' },
          { label: 'Students', value: '12', icon: Users, color: 'text-primary' },
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

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold font-heading text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {logs.slice(0, 10).map(log => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${log.type === 'danger' ? 'bg-destructive' : log.type === 'warning' ? 'bg-yellow-500' : 'bg-accent'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{log.message}</p>
                  <p className="text-xs text-muted-foreground">{log.studentName} • {new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {logs.length === 0 && <p className="text-sm text-muted-foreground">No activity yet</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
