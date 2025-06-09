import React from 'react';
import { Brain, Target, BookOpen, HelpCircle, Lightbulb, Clock, Trophy, Users } from 'lucide-react';

export const HelpView: React.FC = () => {
  const methods = [
    {
      icon: Brain,
      title: 'Метод Матрешки',
      description: 'Визуализация элементов как вложенных объектов разного размера и цвета',
      steps: [
        'Представьте первый элемент как большую матрешку',
        'Каждый следующий элемент - матрешка меньшего размера',
        'Придайте каждой матрешке уникальный цвет или узор',
        'Визуализируйте процесс вкладывания матрешек друг в друга'
      ],
      tips: [
        'Используйте яркие, контрастные цвета',
        'Добавляйте эмоциональную окраску образам',
        'Практикуйтесь на простых списках (покупки, дела)'
      ]
    },
    {
      icon: Target,
      title: 'Метод Цепочки',
      description: 'Создание логических связей между элементами информации',
      steps: [
        'Найдите общие черты между соседними элементами',
        'Создайте историю, связывающую все элементы',
        'Используйте причинно-следственные связи',
        'Проверьте цепочку, проходя по ней в обе стороны'
      ],
      tips: [
        'Делайте связи максимально логичными',
        'Используйте личные ассоциации',
        'Практикуйтесь на исторических событиях'
      ]
    },
    {
      icon: BookOpen,
      title: 'Метод Цицерона (Дворец памяти)',
      description: 'Размещение информации в знакомом пространстве',
      steps: [
        'Выберите хорошо знакомое место (дом, офис, маршрут)',
        'Определите последовательность точек в этом месте',
        'Разместите каждый элемент информации в определенной точке',
        'Мысленно пройдите по маршруту, "собирая" информацию'
      ],
      tips: [
        'Используйте места, которые знаете лучше всего',
        'Соблюдайте всегда один и тот же маршрут',
        'Создавайте яркие, необычные образы в каждой точке'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Как долго нужно тренироваться?',
      answer: 'Рекомендуется заниматься 15-30 минут в день. Регулярность важнее продолжительности. Первые результаты обычно заметны через 1-2 недели регулярных тренировок.'
    },
    {
      question: 'Какой метод выбрать начинающему?',
      answer: 'Начните с метода Матрешки - он самый простой и интуитивный. После освоения базовых принципов переходите к методу Цепочки, а затем к Дворцу памяти.'
    },
    {
      question: 'Что делать, если не получается запомнить?',
      answer: 'Не переживайте! Начните с меньшего количества элементов (3-5), используйте более яркие и эмоциональные образы. Важно не сдаваться и продолжать практиковаться.'
    },
    {
      question: 'Можно ли комбинировать методы?',
      answer: 'Да! Опытные пользователи часто комбинируют методы. Например, создают цепочку ассоциаций внутри дворца памяти или используют матрешки для структурирования информации.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <HelpCircle className="h-12 w-12 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Справка по системе</h1>
        <p className="text-xl text-gray-600">
          Изучите методы тренировки памяти и советы по эффективному использованию системы
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-purple-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Быстрый старт</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              1
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Изучите методы</h3>
            <p className="text-sm text-gray-600">Ознакомьтесь с тремя основными техниками запоминания</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              2
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Начните с простого</h3>
            <p className="text-sm text-gray-600">Выберите легкие задания для освоения базовых навыков</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              3
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Практикуйтесь регулярно</h3>
            <p className="text-sm text-gray-600">Уделяйте тренировкам 15-30 минут каждый день</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
              4
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Отслеживайте прогресс</h3>
            <p className="text-sm text-gray-600">Собирайте достижения и следите за статистикой</p>
          </div>
        </div>
      </div>

      {/* Methods Detail */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Методы тренировки памяти</h2>
        <div className="space-y-8">
          {methods.map((method, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <method.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-purple-600" />
                    Пошаговая инструкция
                  </h4>
                  <ol className="space-y-2">
                    {method.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-600" />
                    Полезные советы
                  </h4>
                  <ul className="space-y-2">
                    {method.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Часто задаваемые вопросы</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-teal-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-teal-600" />
          Советы для эффективного обучения
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
              <p className="text-gray-700">Тренируйтесь в одно и то же время каждый день</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
              <p className="text-gray-700">Начинайте с коротких сессий по 10-15 минут</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
              <p className="text-gray-700">Используйте яркие, необычные образы</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
              <p className="text-gray-700">Не бойтесь делать ошибки - это часть обучения</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
              <p className="text-gray-700">Постепенно увеличивайте сложность заданий</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
              <p className="text-gray-700">Применяйте изученные техники в повседневной жизни</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};