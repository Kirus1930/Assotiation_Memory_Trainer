import React, { useState } from 'react';
import { User, Trophy, Calendar, Star, Lock, LogOut, CheckCircle, Award } from 'lucide-react';
import { User as UserType, Achievement } from '../../types';

interface AccountViewProps {
  user: UserType;
  onPasswordChange: (oldPassword: string, newPassword: string) => boolean;
  onLogout: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({ user, onPasswordChange, onLogout }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    if (newPassword.length < 6) {
      alert('Пароль должен содержать минимум 6 символов');
      return;
    }
    
    if (onPasswordChange(oldPassword, newPassword)) {
      setShowPasswordForm(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const getJoinDate = () => {
    return new Date(user.createdAt).toLocaleDateString('ru-RU');
  };

  const getLastLogin = () => {
    return new Date(user.lastLogin).toLocaleDateString('ru-RU');
  };

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return Trophy;
      case 'Star': return Star;
      case 'Award': return Award;
      case 'CheckCircle': return CheckCircle;
      default: return Trophy;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Личный кабинет</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
              {user.isAdmin && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mt-2">
                  Администратор
                </span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Дата регистрации:</span>
                <span className="font-medium text-gray-900">{getJoinDate()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Последний вход:</span>
                <span className="font-medium text-gray-900">{getLastLogin()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Выполнено заданий:</span>
                <span className="font-medium text-gray-900">{user.completedTasks.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Достижений:</span>
                <span className="font-medium text-gray-900">{user.achievements.length}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Lock className="h-4 w-4" />
                <span>Сменить пароль</span>
              </button>
              
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Выйти</span>
              </button>
            </div>
          </div>

          {/* Password Change Form */}
          {showPasswordForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Смена пароля</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Текущий пароль
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Новый пароль
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Подтвердите пароль
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="h-6 w-6 text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900">Достижения</h3>
            </div>

            {user.achievements.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Trophy className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Пока нет достижений</h4>
                  <p className="text-gray-600">
                    Выполните первое задание, чтобы получить свое первое достижение!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {user.achievements.map((achievement, index) => {
                  const IconComponent = getAchievementIcon(achievement.icon);
                  
                  return (
                    <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          {achievement.earnedAt && (
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>
                                Получено: {new Date(achievement.earnedAt).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Progress Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Статистика прогресса</h4>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">{user.completedTasks.length}</div>
                  <div className="text-sm text-gray-600">Заданий выполнено</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600 mb-1">{user.achievements.length}</div>
                  <div className="text-sm text-gray-600">Достижений получено</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {Math.round((user.completedTasks.length / Math.max(1, user.completedTasks.length + 3)) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Прогресс</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};