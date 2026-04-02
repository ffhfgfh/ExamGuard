import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getActivityLogs } from '@/data/mockExams';
import { ChatMessage } from '@/types/exam';
import { AlertTriangle, Camera, MessageCircle, Send, Activity } from 'lucide-react';

export default function LiveProctoring() {
  const logs = getActivityLogs();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      senderId: 'admin',
      senderName: 'Proctor',
      senderRole: 'admin',
      message: chatInput,
      timestamp: new Date().toISOString(),
    }]);
    setChatInput('');
    // Simulate student reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        senderId: 'student-1',
        senderName: 'John Student',
        senderRole: 'student',
        message: 'Understood, thank you!',
        timestamp: new Date().toISOString(),
      }]);
    }, 2000);
  };

  // Simulated live sessions
  const liveSessions = [
    { id: 1, name: 'John Student', exam: 'DSA Exam', status: 'active', warnings: 2 },
    { id: 2, name: 'Jane Doe', exam: 'DBMS Exam', status: 'active', warnings: 0 },
    { id: 3, name: 'Mike Ross', exam: 'DSA Exam', status: 'active', warnings: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Live Proctoring</h1>
        <p className="text-muted-foreground">Monitor ongoing exam sessions in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live webcam feeds */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <Camera className="w-5 h-5" /> Live Sessions ({liveSessions.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {liveSessions.map(session => (
              <Card key={session.id}>
                <CardContent className="p-3 space-y-2">
                  {/* Simulated webcam feed */}
                  <div className="aspect-video rounded-lg bg-muted flex items-center justify-center relative">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{session.name}</p>
                      <p className="text-xs text-muted-foreground">{session.exam}</p>
                    </div>
                    {session.warnings > 0 && (
                      <span className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="w-3 h-3" />{session.warnings}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity Log */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4" /> Activity Log
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.map(log => (
                  <div key={log.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 text-sm">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${log.type === 'danger' ? 'bg-destructive' : log.type === 'warning' ? 'bg-yellow-500' : 'bg-accent'}`} />
                    <div>
                      <span className="font-medium text-foreground">{log.studentName}:</span>{' '}
                      <span className="text-muted-foreground">{log.message}</span>
                      <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat panel */}
        <div className="space-y-4">
          <h2 className="font-heading font-semibold text-foreground flex items-center gap-2">
            <MessageCircle className="w-5 h-5" /> Proctor Chat
          </h2>
          <Card className="h-[500px] flex flex-col">
            <CardContent className="flex-1 p-4 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                {chatMessages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-12">Send a message to communicate with students</p>
                )}
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.senderRole === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                      <p className="font-medium text-xs mb-1">{msg.senderName}</p>
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type a message..."
                  onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                <Button size="icon" onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
