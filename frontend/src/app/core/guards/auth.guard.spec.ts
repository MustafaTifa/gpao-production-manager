import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  // Le guard n'utilise pas route/state : des objets vides suffisent
  const route = {} as ActivatedRouteSnapshot;
  const state = { url: '/production/of-intern' } as RouterStateSnapshot;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('laisse passer un utilisateur connecté', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    expect(guard.canActivate(route, state)).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('bloque un utilisateur non connecté et le renvoie vers /login', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    expect(guard.canActivate(route, state)).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
