import React, { useState, useMemo } from 'react';
import { Filter, Clock, Trophy, Star, ChevronRight, Search } from 'lucide-react';
import { Task } from '../../types';

interface TasksViewProps {
  tasks: Task[];
  completedTasks: string[];
  onTaskSelect: (task: Task) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks, completedTasks, onTaskSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const methodLabels = {
    matryoshka: 'Метод Матрешки',
    chain: 'Метод Цепочки',
    cicero: 'Метод Цицерона'
  };

  const difficultyLabels = {
    easy: 'Легкая',
    medium: 'Средняя',
    hard: 'Сложная'
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesMethod = selectedMethod === 'all' || task.method === selectedMethod;
      const matchesDifficulty = selectedDifficulty === 'all' || task.difficulty === selectedDifficulty;
      const matchesSearch = searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesMethod && matchesDifficulty && matchesSearch;
    });
  }, [tasks, selectedMethod, selectedDifficulty, searchQuery]);

  const getProgressStats = () => {
    const total = tasks.length;
    const completed = completedTasks.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const stats = getProgressStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Задания</h1>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Общий прогресс</h2>
            <span className="text-sm text-gray-600">{stats.completed} из {stats.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{stats.percentage}% выполнено</span>
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-600">{stats.completed} достижений</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Поиск заданий..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Фильтры</h3>
            </div>
            
            {/* Method Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Метод</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="method"
                    value="all"
                    checked={selectedMethod === 'all'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Все методы</span>
                </label>
                {Object.entries(methodLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="radio"
                      name="method"
                      value={key}
                      checked={selectedMethod === key}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Сложность</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="difficulty"
                    value="all"
                    checked={selectedDifficulty === 'all'}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Все уровни</span>
                </label>
                {Object.entries(difficultyLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="radio"
                      name="difficulty"
                      value={key}
                      checked={selectedDifficulty === key}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="flex-1">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              
              return (
                <div
                  key={task.id}
                  onClick={() => onTaskSelect(task)}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors ml-2 flex-shrink-0" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      {methodLabels[task.method]}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[task.difficulty]}`}>
                      {difficultyLabels[task.difficulty]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {task.content.timeLimit && (
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span className="text-xs">{Math.round(task.content.timeLimit / 60)} мин</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Star className="h-4 w-4" />
                        <span className="text-xs">{task.content.items.length} элементов</span>
                      </div>
                    </div>
                    
                    {isCompleted && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Trophy className="h-4 w-4" />
                        <span className="text-xs font-medium">Выполнено</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Задания не найдены</h3>
                <p className="text-gray-600">
                  {searchQuery 
                    ? 'Попробуйте изменить поисковый запрос или фильтры'
                    : 'Измените параметры фильтрации для отображения заданий'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};