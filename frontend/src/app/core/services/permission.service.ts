import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private apiUrl = `${environment.URL_API}/api/permissions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl);
  }
}