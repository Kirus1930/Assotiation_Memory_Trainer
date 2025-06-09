import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Users, FileText, Settings, BarChart } from 'lucide-react';
import { Task, User } from '../../types';

interface AdminViewProps {
  tasks: Task[];
  users: User[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onBlockUser: (userId: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  tasks,
  users,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onBlockUser
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'users' | 'stats'>('tasks');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    method: 'matryoshka' as const,
    difficulty: 'easy' as const,
    content: {
      type: 'memorization' as const,
      items: [{ id: '', text: '', association: '' }],
      instructions: '',
      timeLimit: 300
    },
    achievement: {
      id: '',
      title: '',
      description: '',
      icon: 'Trophy'
    }
  });

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      ...taskForm,
      content: {
        ...taskForm.content,
        items: taskForm.content.items.map((item, index) => ({
          ...item,
          id: `item-${index + 1}`
        }))
      },
      achievement: {
        ...taskForm.achievement,
        id: `achievement-${Date.now()}`
      }
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }

    resetTaskForm();
  };

  const resetTaskForm = () => {
    setTaskForm({
      title: '',
      description: '',
      method: 'matryoshka',
      difficulty: 'easy',
      content: {
        type: 'memorization',
        items: [{ id: '', text: '', association: '' }],
        instructions: '',
        timeLimit: 300
      },
      achievement: {
        id: '',
        title: '',
        description: '',
        icon: 'Trophy'
      }
    });
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskForm({
      title: task.title,
      description: task.description,
      method: task.method,
      difficulty: task.difficulty,
      content: task.content,
      achievement: task.achievement
    });
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const addTaskItem = () => {
    setTaskForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        items: [...prev.content.items, { id: '', text: '', association: '' }]
      }
    }));
  };

  const removeTaskItem = (index: number) => {
    setTaskForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        items: prev.content.items.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTaskItem = (index: number, field: string, value: string) => {
    setTaskForm(prev => ({
      ...prev,
      content: {
        ...prev.content,
        items: prev.content.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const getTotalCompletions = () => {
    return users.reduce((total, user) => total + user.completedTasks.length, 0);
  };

  const getTaskCompletionStats = () => {
    return tasks.map(task => ({
      title: task.title,
      completions: users.filter(user => user.completedTasks.includes(task.id)).length
    }));
  };

  const tabs = [
    { id: 'tasks', label: 'Задания', icon: FileText },
    { id: 'users', label: 'Пользователи', icon: Users },
    { id: 'stats', label: 'Статистика', icon: BarChart }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Управление заданиями</h2>
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить задание</span>
            </button>
          </div>

          {/* Task Form */}
          {showTaskForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingTask ? 'Редактировать задание' : 'Новое задание'}
              </h3>
              
              <form onSubmit={handleTaskSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название
                    </label>
                    <input
                      type="text"
                      value={taskForm.title}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Метод
                    </label>
                    <select
                      value={taskForm.method}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, method: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="matryoshka">Метод Матрешки</option>
                      <option value="chain">Метод Цепочки</option>
                      <option value="cicero">Метод Цицерона</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Сложность
                    </label>
                    <select
                      value={taskForm.difficulty}
                      onChange={(e) => setTaskForm(prev => ({ ...prev, difficulty: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="easy">Легкая</option>
                      <option value="medium">Средняя</option>
                      <option value="hard">Сложная</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Время (секунды)
                    </label>
                    <input
                      type="number"
                      value={taskForm.content.timeLimit}
                      onChange={(e) => setTaskForm(prev => ({
                        ...prev,
                        content: { ...prev.content, timeLimit: parseInt(e.target.value) }
                      }))}
                      min={60}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Инструкции
                  </label>
                  <textarea
                    value={taskForm.content.instructions}
                    onChange={(e) => setTaskForm(prev => ({
                      ...prev,
                      content: { ...prev.content, instructions: e.target.value }
                    }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Task Items */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Элементы задания
                    </label>
                    <button
                      type="button"
                      onClick={addTaskItem}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      + Добавить элемент
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {taskForm.content.items.map((item, index) => (
                      <div key={index} className="grid md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          placeholder="Текст элемента"
                          value={item.text}
                          onChange={(e) => updateTaskItem(index, 'text', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Ассоциация (опционально)"
                            value={item.association}
                            onChange={(e) => updateTaskItem(index, 'association', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          />
                          {taskForm.content.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeTaskItem(index)}
                              className="px-3 py-2 text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievement */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Название достижения
                    </label>
                    <input
                      type="text"
                      value={taskForm.achievement.title}
                      onChange={(e) => setTaskForm(prev => ({
                        ...prev,
                        achievement: { ...prev.achievement, title: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание достижения
                    </label>
                    <input
                      type="text"
                      value={taskForm.achievement.description}
                      onChange={(e) => setTaskForm(prev => ({
                        ...prev,
                        achievement: { ...prev.achievement, description: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    {editingTask ? 'Обновить' : 'Создать'} задание
                  </button>
                  <button
                    type="button"
                    onClick={resetTaskForm}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tasks List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="capitalize">{task.method}</span>
                        <span className="capitalize">{task.difficulty}</span>
                        <span>{task.content.items.length} элементов</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Управление пользователями</h2>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{user.username}</h3>
                        {user.isAdmin && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Админ
                          </span>
                        )}
                        {user.isBlocked && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Заблокирован
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Регистрация: {new Date(user.createdAt).toLocaleDateString('ru-RU')}</span>
                        <span>Заданий: {user.completedTasks.length}</span>
                        <span>Достижений: {user.achievements.length}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => onBlockUser(user.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          user.isBlocked
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {user.isBlocked ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        <span>{user.isBlocked ? 'Разблокировать' : 'Заблокировать'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Статистика системы</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">{users.length}</div>
              <div className="text-sm text-gray-600">Всего пользователей</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-2xl font-bold text-teal-600 mb-1">{tasks.length}</div>
              <div className="text-sm text-gray-600">Всего заданий</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-2xl font-bold text-orange-600 mb-1">{getTotalCompletions()}</div>
              <div className="text-sm text-gray-600">Выполнений заданий</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {users.filter(u => !u.isBlocked).length}
              </div>
              <div className="text-sm text-gray-600">Активных пользователей</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Популярность заданий</h3>
            <div className="space-y-3">
              {getTaskCompletionStats().map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{stat.title}</span>
                  <span className="text-sm font-medium text-gray-900">{stat.completions} выполнений</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};