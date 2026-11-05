import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment';

/** Construit un faux JWT (header.payload.signature) avec la date d'expiration voulue. */
function fakeJwt(expInSeconds: number): string {
  const payload = btoa(JSON.stringify({ sub: 'admin', exp: expInSeconds }));
  return `header.${payload}.signature`;
}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const LOGIN_URL = environment.URL_API + '/api/auth/login';

  const mockResponse: AuthResponse = {
    token: 'jwt-token',
    username: 'admin',
    roles: ['ROLE_ADMIN'],
    permissions: [{ name: 'Articles', route: '/fichier/article', icon: 'inventory' }]
  };

  beforeEach(() => {
    // Arrange commun : on remplace le Router par un espion
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();   // aucune requête HTTP inattendue ne doit rester en attente
    localStorage.clear();
  });

  describe('login()', () => {
    it('envoie un POST sur /api/auth/login avec les identifiants', () => {
      service.login({ username: 'admin', password: 'secret123' }).subscribe();

      const req = httpMock.expectOne(LOGIN_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username: 'admin', password: 'secret123' });
      req.flush(mockResponse);
    });

    it('stocke le token, le username, les rôles et les permissions dans le localStorage', () => {
      service.login({ username: 'admin', password: 'secret123' }).subscribe();
      httpMock.expectOne(LOGIN_URL).flush(mockResponse);

      expect(localStorage.getItem('auth_token')).toBe('jwt-token');
      expect(service.getUsername()).toBe('admin');
      expect(service.getRoles()).toEqual(['ROLE_ADMIN']);
      expect(service.getPermissions()).toEqual(mockResponse.permissions);
    });

    it('redirige vers /fichier/article après une connexion réussie', () => {
      service.login({ username: 'admin', password: 'secret123' }).subscribe();
      httpMock.expectOne(LOGIN_URL).flush(mockResponse);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/fichier/article']);
    });

    it('ne stocke rien et ne redirige pas si le backend renvoie 401', () => {
      let status = 0;
      service.login({ username: 'admin', password: 'mauvais' }).subscribe({
        error: err => (status = err.status)
      });

      httpMock.expectOne(LOGIN_URL).flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

      expect(status).toBe(401);
      expect(service.getToken()).toBeNull();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('logout()', () => {
    it('vide le localStorage et redirige vers /login', () => {
      localStorage.setItem('auth_token', 'jwt-token');

      service.logout();

      expect(service.getToken()).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('getters', () => {
    it('renvoient des valeurs par défaut quand rien n’est stocké', () => {
      expect(service.getToken()).toBeNull();
      expect(service.getUsername()).toBe('');
      expect(service.getRoles()).toEqual([]);
      expect(service.getPermissions()).toEqual([]);
    });
  });

  describe('isLoggedIn()', () => {
    const nowInSeconds = () => Math.floor(Date.now() / 1000);

    it('renvoie false sans token', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('renvoie true avec un token non expiré', () => {
      localStorage.setItem('auth_token', fakeJwt(nowInSeconds() + 3600));
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('renvoie false avec un token expiré', () => {
      localStorage.setItem('auth_token', fakeJwt(nowInSeconds() - 60));
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('renvoie false avec un token mal formé (sans planter)', () => {
      localStorage.setItem('auth_token', 'pas-un-jwt');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});
