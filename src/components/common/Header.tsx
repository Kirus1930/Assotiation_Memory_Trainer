import React from 'react';
import { User, Brain, BookOpen, HelpCircle, UserCircle, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  currentUser: any;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, currentUser, onViewChange, onLogout }) => {
  const navigationItems = [
    { id: 'home', label: 'Главная', icon: Brain },
    { id: 'tasks', label: 'Задания', icon: BookOpen },
    { id: 'help', label: 'Справка', icon: HelpCircle },
    { id: 'account', label: 'Аккаунт', icon: UserCircle }
  ];

  if (currentUser?.isAdmin) {
    navigationItems.push({ id: 'admin', label: 'Админ', icon: Settings });
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">Тренажер памяти</span>
            </div>
            
            <nav className="flex space-x-6">
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onViewChange(id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">{currentUser?.username}</span>
              {currentUser?.isAdmin && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Админ
                </span>
              )}
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};