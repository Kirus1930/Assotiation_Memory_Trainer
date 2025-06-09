import React from 'react';
import { Brain, Target, BookOpen, Star } from 'lucide-react';

export const HomeView: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Метод Матрешки',
      description: 'Техника визуализации для запоминания списков и последовательностей',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Target,
      title: 'Метод Цепочки',
      description: 'Создание логических связей между элементами информации',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      icon: BookOpen,
      title: 'Метод Цицерона',
      description: 'Построение дворца памяти для долговременного запоминания',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-purple-100 rounded-full">
            <Brain className="h-16 w-16 text-purple-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Тренажер ассоциативной памяти
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Развивайте свою память с помощью проверенных научных методов. 
          Изучайте техники запоминания, выполняйте упражнения и отслеживайте прогресс.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <Star className="h-5 w-5" />
            <span className="font-medium">Научно обоснованные методы</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            <Brain className="h-5 w-5" />
            <span className="font-medium">Интерактивные упражнения</span>
          </div>
        </div>
      </div>

      {/* Methods */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Методы тренировки памяти
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Как это работает
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Выберите метод</h3>
            <p className="text-gray-600">Начните с изучения одного из трех основных методов запоминания</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Выполняйте задания</h3>
            <p className="text-gray-600">Практикуйтесь на специально разработанных упражнениях</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Получайте достижения</h3>
            <p className="text-gray-600">Отслеживайте прогресс и зарабатывайте награды за успехи</p>
          </div>
        </div>
      </div>
    </div>
  );
};