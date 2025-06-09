import React, { useState, useEffect } from 'react';
import { AppController } from './controllers/AppController';
import { AppState } from './types';

// Views
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Header } from './components/common/Header';
import { Notification } from './components/common/Notification';
import { HomeView } from './components/views/HomeView';
import { TasksView } from './components/views/TasksView';
import { TaskDetailView } from './components/views/TaskDetailView';
import { HelpView } from './components/views/HelpView';
import { AccountView } from './components/views/AccountView';
import { AdminView } from './components/views/AdminView';

// Initialize controller
const appController = new AppController();

function App() {
  const [state, setState] = useState<AppState>(appController.getState());
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    // Subscribe to state changes
    appController.subscribe(setState);
    
    return () => {
      appController.unsubscribe(setState);
    };
  }, []);

  const handleLogin = (username: string, password: string) => {
    return appController.login(username, password);
  };

  const handleRegister = (username: string, password: string) => {
    return appController.register(username, password);
  };

  const handleLogout = () => {
    appController.logout();
  };

  const handleViewChange = (view: AppState['currentView']) => {
    appController.setView(view);
  };

  const handleTaskSelect = (task: any) => {
    appController.selectTask(task);
  };

  const handleTaskComplete = () => {
    if (state.selectedTask) {
      appController.completeTask(state.selectedTask.id);
    }
  };

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    return appController.changePassword(oldPassword, newPassword);
  };

  const handleDismissNotification = (id: string) => {
    // For simplicity, we'll just filter out the notification
    // In a real app, this would be handled by the controller
  };

  if (!state.isAuthenticated) {
    if (authMode === 'login') {
      return (
        <LoginForm 
          onLogin={handleLogin} 
          onSwitchToRegister={() => setAuthMode('register')}
        />
      );
    } else {
      return (
        <RegisterForm 
          onRegister={handleRegister} 
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'home':
        return <HomeView />;
      
      case 'tasks':
        return (
          <TasksView
            tasks={state.tasks}
            completedTasks={state.currentUser?.completedTasks || []}
            onTaskSelect={handleTaskSelect}
          />
        );
      
      case 'task-detail':
        if (!state.selectedTask) {
          appController.setView('tasks');
          return null;
        }
        return (
          <TaskDetailView
            task={state.selectedTask}
            isCompleted={state.currentUser?.completedTasks.includes(state.selectedTask.id) || false}
            onBack={() => appController.setView('tasks')}
            onComplete={handleTaskComplete}
          />
        );
      
      case 'help':
        return <HelpView />;
      
      case 'account':
        return (
          <AccountView
            user={state.currentUser!}
            onPasswordChange={handlePasswordChange}
            onLogout={handleLogout}
          />
        );
      
      case 'admin':
        if (!state.currentUser?.isAdmin) {
          appController.setView('home');
          return null;
        }
        return (
          <AdminView
            tasks={state.tasks}
            users={state.users}
            onAddTask={(task) => appController.addTask(task)}
            onUpdateTask={(taskId, updates) => appController.updateTask(taskId, updates)}
            onDeleteTask={(taskId) => appController.deleteTask(taskId)}
            onBlockUser={(userId) => appController.blockUser(userId)}
          />
        );
      
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={state.currentView}
        currentUser={state.currentUser}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
      />
      
      <main>
        {renderCurrentView()}
      </main>

      <Notification
        notifications={state.notifications}
        onDismiss={handleDismissNotification}
      />
    </div>
  );
}

export default App;