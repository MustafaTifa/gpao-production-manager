import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        // On branche l'intercepteur comme dans app.module.ts
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('ajoute le header Authorization: Bearer <token> quand un token existe', () => {
    authServiceSpy.getToken.and.returnValue('jwt-token');

    http.get('/api/articles').subscribe();

    const req = httpMock.expectOne('/api/articles');
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-token');
    req.flush([]);
  });

  it('n’ajoute pas de header quand il n’y a pas de token', () => {
    authServiceSpy.getToken.and.returnValue(null);

    http.get('/api/articles').subscribe();

    const req = httpMock.expectOne('/api/articles');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush([]);
  });

  it('ne touche pas à la requête de login, même avec un token', () => {
    authServiceSpy.getToken.and.returnValue('ancien-token');

    http.post('/api/auth/login', { username: 'admin', password: 'secret123' }).subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    expect(authServiceSpy.getToken).not.toHaveBeenCalled();
    req.flush({});
  });
});
