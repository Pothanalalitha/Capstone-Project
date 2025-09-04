import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { JwtResponse } from '../models/jwt-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/users';

  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Update responseType to 'text' so Angular expects plain text response
  register(request: RegisterRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, request, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  login(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, request).pipe(
      tap((res) => this.setToken(res.jwt)),
      catchError(this.handleError)
    );
  }

  logout() {
    this.removeToken();
    this.tokenSubject.next(null);
  }

  private setToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('jwt_token', token);
    }
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  private getTokenFromStorage(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('jwt_token');
    }
    return null;
  }

  private removeToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('jwt_token');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.role || null;
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let userFriendlyMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      userFriendlyMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          userFriendlyMessage = 'Unable to connect to the server. Please try again later.';
          break;
        case 400:
          userFriendlyMessage = error.error?.message || 'Invalid request. Please check your data.';
          break;
        case 401:
          userFriendlyMessage = 'Invalid email or password.';
          break;
        case 403:
          userFriendlyMessage = 'You are not authorized to perform this action.';
          break;
        case 500:
          userFriendlyMessage = 'Server error occurred. Please try again later.';
          break;
        default:
          userFriendlyMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      }
    }

    return throwError(() => new Error(userFriendlyMessage));
  }
}
