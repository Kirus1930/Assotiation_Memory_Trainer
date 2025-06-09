export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  achievements: Achievement[];
  completedTasks: string[];
  createdAt: string;
  lastLogin: string;
  isBlocked: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  method: 'matryoshka' | 'chain' | 'cicero';
  difficulty: 'easy' | 'medium' | 'hard';
  content: TaskContent;
  achievement: Achievement;
  createdAt: string;
}

export interface TaskContent {
  type: 'memorization' | 'association' | 'sequence';
  items: TaskItem[];
  instructions: string;
  timeLimit?: number;
}

export interface TaskItem {
  id: string;
  text: string;
  imageUrl?: string;
  association?: string;
  position?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface UserSession {
  user: User;
  isAuthenticated: boolean;
  loginTime: string;
}

export interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  currentView: 'home' | 'tasks' | 'help' | 'account' | 'admin' | 'task-detail';
  selectedTask: Task | null;
  tasks: Task[];
  users: User[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: string;
}