import { User, Task, AppState } from '../types';
import { DataModel } from '../models/DataModel';
import { sessionManager, eventManager } from '../utils/patterns';

// MVC Pattern - Controller Layer
export class AppController {
  private state: AppState = {
    currentUser: null,
    isAuthenticated: false,
    currentView: 'home',
    selectedTask: null,
    tasks: [],
    users: [],
    notifications: []
  };

  private stateObservers: ((state: AppState) => void)[] = [];

  constructor() {
    this.initializeState();
  }

  private initializeState(): void {
    const session = sessionManager.getSession();
    if (session?.isAuthenticated) {
      this.state.currentUser = session.user;
      this.state.isAuthenticated = true;
    }
    this.state.tasks = DataModel.getTasks();
    this.state.users = DataModel.getUsers();
  }

  public subscribe(observer: (state: AppState) => void): void {
    this.stateObservers.push(observer);
  }

  public unsubscribe(observer: (state: AppState) => void): void {
    this.stateObservers = this.stateObservers.filter(obs => obs !== observer);
  }

  private notifyStateChanges(): void {
    this.stateObservers.forEach(observer => observer({ ...this.state }));
  }

  public login(username: string, password: string): boolean {
    const user = DataModel.authenticateUser(username, password);
    if (user) {
      this.state.currentUser = user;
      this.state.isAuthenticated = true;
      sessionManager.setSession(user);
      this.addNotification('success', `Добро пожаловать, ${user.username}!`);
      eventManager.notify('user-login', user);
      this.notifyStateChanges();
      return true;
    } else {
      // Don't add notification here - let the login form handle the error display
      this.notifyStateChanges();
      return false;
    }
  }

  public register(username: string, password: string): { success: boolean; message: string } {
    const result = DataModel.registerUser(username, password);
    
    if (result.success) {
      // Refresh users list
      this.state.users = DataModel.getUsers();
      this.addNotification('success', 'Регистрация успешна!');
      eventManager.notify('user-registered', result.user);
    }
    
    this.notifyStateChanges();
    return result;
  }

  public logout(): void {
    sessionManager.clearSession();
    this.state.currentUser = null;
    this.state.isAuthenticated = false;
    this.state.currentView = 'home';
    this.addNotification('info', 'Вы вышли из системы');
    eventManager.notify('user-logout', null);
    this.notifyStateChanges();
  }

  public setView(view: AppState['currentView']): void {
    this.state.currentView = view;
    this.notifyStateChanges();
  }

  public selectTask(task: Task): void {
    this.state.selectedTask = task;
    this.state.currentView = 'task-detail';
    this.notifyStateChanges();
  }

  public completeTask(taskId: string): void {
    if (this.state.currentUser) {
      DataModel.completeTask(this.state.currentUser.id, taskId);
      // Refresh user data
      const users = DataModel.getUsers();
      this.state.currentUser = users.find(u => u.id === this.state.currentUser!.id)!;
      this.addNotification('success', 'Задание выполнено! Получено достижение!');
      eventManager.notify('task-completed', { userId: this.state.currentUser.id, taskId });
      this.notifyStateChanges();
    }
  }

  public changePassword(oldPassword: string, newPassword: string): boolean {
    if (this.state.currentUser && this.state.currentUser.password === oldPassword) {
      this.state.currentUser.password = newPassword;
      DataModel.updateUser(this.state.currentUser);
      this.addNotification('success', 'Пароль успешно изменен');
      this.notifyStateChanges();
      return true;
    } else {
      this.addNotification('error', 'Неверный текущий пароль');
      this.notifyStateChanges();
      return false;
    }
  }

  public addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    this.state.tasks.push(newTask);
    DataModel.saveTasks(this.state.tasks);
    this.addNotification('success', 'Задание добавлено');
    this.notifyStateChanges();
  }

  public updateTask(taskId: string, updates: Partial<Task>): void {
    const index = this.state.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      this.state.tasks[index] = { ...this.state.tasks[index], ...updates };
      DataModel.saveTasks(this.state.tasks);
      this.addNotification('success', 'Задание обновлено');
      this.notifyStateChanges();
    }
  }

  public deleteTask(taskId: string): void {
    this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
    DataModel.saveTasks(this.state.tasks);
    this.addNotification('success', 'Задание удалено');
    this.notifyStateChanges();
  }

  public blockUser(userId: string): void {
    const users = DataModel.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.isBlocked = !user.isBlocked;
      DataModel.saveUsers(users);
      this.state.users = users;
      this.addNotification('success', `Пользователь ${user.isBlocked ? 'заблокирован' : 'разблокирован'}`);
      this.notifyStateChanges();
    }
  }

  private addNotification(type: 'success' | 'error' | 'info' | 'warning', message: string): void {
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString()
    };
    this.state.notifications.push(notification);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      this.state.notifications = this.state.notifications.filter(n => n.id !== notification.id);
      this.notifyStateChanges();
    }, 5000);
  }

  public getState(): AppState {
    return { ...this.state };
  }
}