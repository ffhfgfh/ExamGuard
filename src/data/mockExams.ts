import { Exam, ExamResult, ActivityLog } from '@/types/exam';

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    title: 'Data Structures & Algorithms',
    description: 'Comprehensive exam covering arrays, linked lists, trees, and graph algorithms.',
    subject: 'Computer Science',
    duration: 30,
    totalMarks: 40,
    isActive: true,
    proctored: true,
    createdAt: '2026-03-28T10:00:00Z',
    questions: [
      { id: 'q1', text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, marks: 5 },
      { id: 'q2', text: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 1, marks: 5 },
      { id: 'q3', text: 'What is the worst-case time complexity of quicksort?', options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'], correctAnswer: 2, marks: 5 },
      { id: 'q4', text: 'Which traversal visits the root first?', options: ['Inorder', 'Preorder', 'Postorder', 'Level-order'], correctAnswer: 1, marks: 5 },
      { id: 'q5', text: 'A complete binary tree with n nodes has height?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, marks: 5 },
      { id: 'q6', text: 'Which sorting algorithm is stable?', options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'], correctAnswer: 2, marks: 5 },
      { id: 'q7', text: 'Hash table average lookup time?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correctAnswer: 2, marks: 5 },
      { id: 'q8', text: 'Dijkstra\'s algorithm finds?', options: ['MST', 'Shortest path', 'Topological order', 'SCC'], correctAnswer: 1, marks: 5 },
    ],
  },
  {
    id: 'exam-2',
    title: 'Database Management Systems',
    description: 'Test on SQL, normalization, transactions, and indexing.',
    subject: 'Computer Science',
    duration: 25,
    totalMarks: 30,
    isActive: true,
    proctored: true,
    createdAt: '2026-03-29T10:00:00Z',
    questions: [
      { id: 'q9', text: 'Which normal form eliminates transitive dependencies?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: 2, marks: 5 },
      { id: 'q10', text: 'ACID stands for?', options: ['Atomicity, Consistency, Isolation, Durability', 'Addition, Consistency, Integrity, Durability', 'Atomicity, Concurrency, Isolation, Data', 'None'], correctAnswer: 0, marks: 5 },
      { id: 'q11', text: 'Which SQL clause filters groups?', options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'], correctAnswer: 1, marks: 5 },
      { id: 'q12', text: 'A primary key is?', options: ['Nullable', 'Unique & not null', 'Foreign key', 'Index'], correctAnswer: 1, marks: 5 },
      { id: 'q13', text: 'Which join returns all rows from both tables?', options: ['INNER', 'LEFT', 'RIGHT', 'FULL OUTER'], correctAnswer: 3, marks: 5 },
      { id: 'q14', text: 'B+ tree is used for?', options: ['Hashing', 'Indexing', 'Sorting', 'Encryption'], correctAnswer: 1, marks: 5 },
    ],
  },
  {
    id: 'exam-3',
    title: 'Operating Systems',
    description: 'Covers process management, memory management, and file systems.',
    subject: 'Computer Science',
    duration: 20,
    totalMarks: 25,
    isActive: false,
    proctored: false,
    createdAt: '2026-03-25T10:00:00Z',
    questions: [
      { id: 'q15', text: 'Which scheduling algorithm has convoy effect?', options: ['SJF', 'FCFS', 'Round Robin', 'Priority'], correctAnswer: 1, marks: 5 },
      { id: 'q16', text: 'Deadlock requires how many conditions?', options: ['2', '3', '4', '5'], correctAnswer: 2, marks: 5 },
      { id: 'q17', text: 'Virtual memory uses?', options: ['RAM only', 'Disk only', 'Both RAM and Disk', 'Cache'], correctAnswer: 2, marks: 5 },
      { id: 'q18', text: 'Semaphore is used for?', options: ['Memory allocation', 'Synchronization', 'Scheduling', 'Paging'], correctAnswer: 1, marks: 5 },
      { id: 'q19', text: 'Page replacement algorithm LRU stands for?', options: ['Last Recently Used', 'Least Recently Used', 'Least Required Used', 'Last Required Used'], correctAnswer: 1, marks: 5 },
    ],
  },
];

export const MOCK_RESULTS: ExamResult[] = [
  { examId: 'exam-3', examTitle: 'Operating Systems', subject: 'Computer Science', score: 20, totalMarks: 25, percentage: 80, submittedAt: '2026-03-25T11:00:00Z', violations: 1 },
];

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'log-1', studentId: '2', studentName: 'John Student', examId: 'exam-1', type: 'info', message: 'Student started exam', timestamp: '2026-04-01T10:00:00Z' },
  { id: 'log-2', studentId: '2', studentName: 'John Student', examId: 'exam-1', type: 'warning', message: 'Tab switch detected', timestamp: '2026-04-01T10:05:30Z' },
];

export function getExams(): Exam[] {
  const stored = localStorage.getItem('exam_list');
  return stored ? JSON.parse(stored) : MOCK_EXAMS;
}

export function saveExams(exams: Exam[]) {
  localStorage.setItem('exam_list', JSON.stringify(exams));
}

export function getResults(studentId: string): ExamResult[] {
  const stored = localStorage.getItem(`results_${studentId}`);
  return stored ? JSON.parse(stored) : MOCK_RESULTS;
}

export function saveResult(studentId: string, result: ExamResult) {
  const results = getResults(studentId);
  results.push(result);
  localStorage.setItem(`results_${studentId}`, JSON.stringify(results));
}

export function getActivityLogs(): ActivityLog[] {
  const stored = localStorage.getItem('activity_logs');
  return stored ? JSON.parse(stored) : MOCK_ACTIVITY_LOGS;
}

export function addActivityLog(log: ActivityLog) {
  const logs = getActivityLogs();
  logs.unshift(log);
  localStorage.setItem('activity_logs', JSON.stringify(logs));
}
