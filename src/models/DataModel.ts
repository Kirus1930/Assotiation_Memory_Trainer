import { User, Task, Achievement } from '../types';

// MVC Pattern - Model Layer
export class DataModel {
  private static defaultUsers: User[] = [
    {
      id: '1',
      username: 'admin',
      password: 'admin123',
      isAdmin: true,
      achievements: [],
      completedTasks: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isBlocked: false
    },
    {
      id: '2',
      username: 'user',
      password: 'user123',
      isAdmin: false,
      achievements: [],
      completedTasks: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isBlocked: false
    }
  ];

  private static defaultTasks: Task[] = [
    {
      id: '1',
      title: 'Запоминание списка покупок',
      description: 'Изучите метод матрешки для запоминания списка товаров',
      method: 'matryoshka',
      difficulty: 'easy',
      content: {
        type: 'memorization',
        items: [
          { id: '1', text: 'Хлеб', association: 'Буханка в форме матрешки' },
          { id: '2', text: 'Молоко', association: 'Белая матрешка' },
          { id: '3', text: 'Яблоки', association: 'Красная матрешка' },
          { id: '4', text: 'Сыр', association: 'Желтая матрешка' }
        ],
        instructions: 'Представьте каждый товар как матрешку определенного цвета и размера',
        timeLimit: 300
      },
      achievement: {
        id: 'first_matryoshka',
        title: 'Первая матрешка',
        description: 'Выполнили первое задание по методу матрешки',
        icon: 'Trophy'
      },
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Цепочка исторических событий',
      description: 'Используйте метод цепочки для запоминания дат',
      method: 'chain',
      difficulty: 'medium',
      content: {
        type: 'sequence',
        items: [
          { id: '1', text: '1147 - Основание Москвы', position: 1 },
          { id: '2', text: '1380 - Куликовская битва', position: 2 },
          { id: '3', text: '1612 - Освобождение Москвы', position: 3 },
          { id: '4', text: '1812 - Отечественная война', position: 4 }
        ],
        instructions: 'Создайте логическую цепочку связей между историческими событиями',
        timeLimit: 600
      },
      achievement: {
        id: 'history_chain',
        title: 'Цепь истории',
        description: 'Освоили метод цепочки на исторических событиях',
        icon: 'Link'
      },
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Дворец памяти - Кабинет',
      description: 'Создайте дворец памяти по методу Цицерона',
      method: 'cicero',
      difficulty: 'hard',
      content: {
        type: 'association',
        items: [
          { id: '1', text: 'Стол - Договор', association: 'На столе лежит важный документ' },
          { id: '2', text: 'Книжная полка - Знания', association: 'Полка хранит мудрость веков' },
          { id: '3', text: 'Окно - Возможности', association: 'Окно открывает новые горизонты' },
          { id: '4', text: 'Дверь - Выбор', association: 'Дверь ведет к новым решениям' }
        ],
        instructions: 'Мысленно пройдите по кабинету и разместите информацию в знакомых местах',
        timeLimit: 900
      },
      achievement: {
        id: 'memory_palace',
        title: 'Архитектор памяти',
        description: 'Построили первый дворец памяти',
        icon: 'Castle'
      },
      createdAt: new Date().toISOString()
    }
  ];

  public static getUsers(): User[] {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : this.defaultUsers;
  }

  public static saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public static getTasks(): Task[] {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : this.defaultTasks;
  }

  public static saveTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public static authenticateUser(username: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password && !u.isBlocked);
    
    if (user) {
      user.lastLogin = new Date().toISOString();
      this.saveUsers(users);
      return user;
    }
    
    return null;
  }

  public static registerUser(username: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    
    // Check if username already exists
    const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existingUser) {
      return { success: false, message: 'Пользователь с таким логином уже существует' };
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      isAdmin: false,
      achievements: [],
      completedTasks: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isBlocked: false
    };
    
    users.push(newUser);
    this.saveUsers(users);
    
    return { 
      success: true, 
      message: 'Регистрация успешна! Перенаправление на страницу входа...', 
      user: newUser 
    };
  }

  public static updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      this.saveUsers(users);
    }
  }

  public static completeTask(userId: string, taskId: string): void {
    const users = this.getUsers();
    const tasks = this.getTasks();
    const user = users.find(u => u.id === userId);
    const task = tasks.find(t => t.id === taskId);
    
    if (user && task && !user.completedTasks.includes(taskId)) {
      user.completedTasks.push(taskId);
      user.achievements.push({
        ...task.achievement,
        earnedAt: new Date().toISOString()
      });
      this.saveUsers(users);
    }
  }
}