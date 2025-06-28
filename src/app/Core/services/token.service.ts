import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey = environment.jwtTokenKey;
  private readonly userKey = 'currentUser';
  
  constructor(private jwtHelper: JwtHelperService) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch (e) {
      console.error('Failed to parse user data', e);
      return null;
    }
  }
  
  getUser(token: string): Pick<User, 'id' | 'userName' | 'email'> | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.nameid,
        userName: payload.sub,
        email: payload.email
      };
    } catch (_error) {
      return null;
    }
  }

  saveToken(token: string): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  saveUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(this.userKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}