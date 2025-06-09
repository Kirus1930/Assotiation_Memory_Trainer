import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Clock, Trophy, CheckCircle, RotateCcw } from 'lucide-react';
import { Task } from '../../types';

interface TaskDetailViewProps {
  task: Task;
  isCompleted: boolean;
  onBack: () => void;
  onComplete: () => void;
}

export const TaskDetailView: React.FC<TaskDetailViewProps> = ({
  task,
  isCompleted,
  onBack,
  onComplete
}) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(task.content.timeLimit || 0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'study' | 'test'>('study');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleSubmit();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setPhase('test');
    setIsActive(true);
    setTimeLeft(Math.floor((task.content.timeLimit || 300) / 2)); // Half time for test
  };

  const handleAnswerChange = (itemId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [itemId]: answer
    }));
  };

  const handleSubmit = () => {
    setIsActive(false);
    setShowResults(true);
    
    // Calculate score
    const correctAnswers = task.content.items.filter(item => {
      const userAnswer = userAnswers[item.id]?.toLowerCase().trim();
      const correctAnswer = item.text.toLowerCase().trim();
      return userAnswer === correctAnswer || 
             (item.association && userAnswer.includes(item.association.toLowerCase()));
    }).length;
    
    const score = (correctAnswers / task.content.items.length) * 100;
    
    // If score is above 70%, mark as completed
    if (score >= 70 && !isCompleted) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleSave = () => {
    // Save progress to localStorage
    localStorage.setItem(`task-progress-${task.id}`, JSON.stringify({
      userAnswers,
      phase,
      timeLeft,
      savedAt: new Date().toISOString()
    }));
    
    // Show save confirmation
    alert('Прогресс сохранен!');
  };

  const resetTask = () => {
    setUserAnswers({});
    setShowResults(false);
    setPhase('study');
    setIsActive(false);
    setTimeLeft(task.content.timeLimit || 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMethodDescription = () => {
    switch (task.method) {
      case 'matryoshka':
        return 'Представьте каждый элемент как матрешку определенного размера и цвета';
      case 'chain':
        return 'Создайте логическую цепочку связей между элементами';
      case 'cicero':
        return 'Разместите элементы в знакомом пространстве (комната, дом, улица)';
      default:
        return 'Следуйте инструкциям для выполнения задания';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Назад к заданиям</span>
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="capitalize">{task.method.replace('_', ' ')}</span>
              <span>•</span>
              <span className="capitalize">{task.difficulty}</span>
              {task.content.timeLimit && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.round(task.content.timeLimit / 60)} мин</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {isCompleted && (
            <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Выполнено</span>
            </div>
          )}
        </div>
      </div>

      {/* Timer */}
      {isActive && (
        <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800 font-medium">Осталось времени:</span>
            </div>
            <span className="text-2xl font-bold text-orange-800">{formatTime(timeLeft)}</span>
          </div>
        </div>
      )}

      {/* Study Phase */}
      {phase === 'study' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Изучение</h2>
          <p className="text-gray-600 mb-6">{getMethodDescription()}</p>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Материал для запоминания:</h3>
            <div className="grid gap-4">
              {task.content.items.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 mb-1">{item.text}</div>
                      {item.association && (
                        <div className="text-sm text-gray-600 italic">
                          Ассоциация: {item.association}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={startTest}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Начать тестирование
            </button>
          </div>
        </div>
      )}

      {/* Test Phase */}
      {phase === 'test' && !showResults && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Тестирование</h2>
          <p className="text-gray-600 mb-6">Введите элементы, которые вы запомнили:</p>
          
          <div className="space-y-4 mb-8">
            {task.content.items.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={userAnswers[item.id] || ''}
                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Введите ответ..."
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Завершить тест
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Результаты</h2>
          
          <div className="space-y-4 mb-8">
            {task.content.items.map((item, index) => {
              const userAnswer = userAnswers[item.id] || '';
              const isCorrect = userAnswer.toLowerCase().trim() === item.text.toLowerCase().trim() ||
                               (item.association && userAnswer.toLowerCase().includes(item.association.toLowerCase()));
              
              return (
                <div key={item.id} className={`border rounded-lg p-4 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        Правильный ответ: {item.text}
                      </div>
                      <div className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        Ваш ответ: {userAnswer || 'Не введен'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {Math.round((task.content.items.filter(item => {
                const userAnswer = userAnswers[item.id]?.toLowerCase().trim();
                return userAnswer === item.text.toLowerCase().trim() ||
                       (item.association && userAnswer.includes(item.association.toLowerCase()));
              }).length / task.content.items.length) * 100)}%
            </div>
            <div className="text-gray-600">Правильных ответов</div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={resetTask}
              className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Попробовать снова</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Выйти</span>
        </button>
        
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  );
};