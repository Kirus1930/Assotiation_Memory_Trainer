// Singleton Pattern - Session Manager
class SessionManager {
  private static instance: SessionManager;
  private session: { user: any; isAuthenticated: boolean } | null = null;

  private constructor() {}

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  public setSession(user: any): void {
    this.session = { user, isAuthenticated: true };
    localStorage.setItem('session', JSON.stringify(this.session));
  }

  public getSession(): { user: any; isAuthenticated: boolean } | null {
    if (!this.session) {
      const stored = localStorage.getItem('session');
      if (stored) {
        this.session = JSON.parse(stored);
      }
    }
    return this.session;
  }

  public clearSession(): void {
    this.session = null;
    localStorage.removeItem('session');
  }
}

// Observer Pattern - Event System
interface Observer {
  update(event: string, data: any): void;
}

class EventManager {
  private observers: { [key: string]: Observer[] } = {};

  public subscribe(event: string, observer: Observer): void {
    if (!this.observers[event]) {
      this.observers[event] = [];
    }
    this.observers[event].push(observer);
  }

  public unsubscribe(event: string, observer: Observer): void {
    if (this.observers[event]) {
      this.observers[event] = this.observers[event].filter(obs => obs !== observer);
    }
  }

  public notify(event: string, data: any): void {
    if (this.observers[event]) {
      this.observers[event].forEach(observer => observer.update(event, data));
    }
  }
}

export const sessionManager = SessionManager.getInstance();
export const eventManager = new EventManager();