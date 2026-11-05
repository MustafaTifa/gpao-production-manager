import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthResponse, LoginRequest, Permission } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly API_URL = environment.URL_API+'/api/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL, request).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_username', response.username);
        localStorage.setItem('auth_roles', JSON.stringify(response.roles));
        localStorage.setItem('auth_permissions', JSON.stringify(response.permissions));
        this.router.navigate(['/fichier/article']);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUsername(): string {
    return localStorage.getItem('auth_username') ?? '';
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('auth_roles');
    return roles ? JSON.parse(roles) : [];
  }

  getPermissions(): Permission[] {
    const perms = localStorage.getItem('auth_permissions');
    return perms ? JSON.parse(perms) : [];
  }

  isLoggedIn(): boolean {
    try {
      const token = this.getToken();
      if (!token) return false;
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}