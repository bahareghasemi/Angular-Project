import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface IAuth {
  token: string;
}

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  slog = signal(false);

  private myToken = '';
  
  constructor(private http: HttpClient) {
    if (this.isBrowser()) {
      const token = localStorage.getItem('authToken');
      this._isLoggedIn$.next(!!token);
      this.slog.set(!!token);
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(username: string, password: string): Observable<IAuth> {
    if (!this.isBrowser()) {
      return of({ token: '' });
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.username === username && user.password === password) {
        const token = 'fake-jwt-token';
        localStorage.setItem('authToken', token);
        this._isLoggedIn$.next(true);
        this.slog.set(true);
        return of({ token });
      }
    }
    return of({ token: '' });
  }

  logout() {
    if (this.isBrowser()) {
      this._isLoggedIn$.next(false);
      this.slog.set(false);
      this.myToken = '';
      localStorage.removeItem('authToken');
    }
  }

  register(username: string, email: string, password: string): Observable<IAuth> {
    if (!this.isBrowser()) {
      return of({ token: '' });
    }

    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    const token = 'fake-jwt-token';
    localStorage.setItem('authToken', token);
    this._isLoggedIn$.next(true);
    this.slog.set(true);
    return of({ token });
  }

  getTodos(): Observable<ITodo[]> {
    if (!this.isBrowser()) {
      return of([]);
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('authToken')!,
      }),
    };
    return this.http.get<ITodo[]>('http://localhost:5000/api/todos', httpOptions);
  }
}
