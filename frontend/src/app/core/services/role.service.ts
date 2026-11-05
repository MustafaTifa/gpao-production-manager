import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role, RoleRequest } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private apiUrl = `${environment.URL_API}/api/roles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.apiUrl}/${id}`);
  }

  create(request: RoleRequest): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, request);
  }

  update(id: number, request: RoleRequest): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}