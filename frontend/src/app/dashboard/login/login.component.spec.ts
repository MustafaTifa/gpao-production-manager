import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { AuthResponse } from '../../core/models/auth.model';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let el: HTMLElement;

  const submitBtn = () => el.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  /** Remplit un champ du template comme le ferait un utilisateur. */
  function type(controlName: string, value: string): void {
    const input = el.querySelector<HTMLInputElement>(`input[formControlName="${controlName}"]`)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));   // marque le champ comme "touched"
    fixture.detectChanges();
  }

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        MatIconModule,
        MatProgressSpinnerModule
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('se crée avec un formulaire vide et invalide', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm.value).toEqual({ username: '', password: '', rememberMe: false });
    expect(component.loginForm.invalid).toBeTrue();
  });

  describe('validation du formulaire', () => {
    it('désactive le bouton "Se connecter" tant que le formulaire est invalide', () => {
      expect(submitBtn().disabled).toBeTrue();
    });

    it('affiche "Nom d’utilisateur requis" quand le champ est touché puis laissé vide', () => {
      type('username', '');
      expect(el.textContent).toContain('Nom d\'utilisateur requis');
    });

    it('affiche "Minimum 6 caractères" pour un mot de passe trop court', () => {
      type('password', '123');
      expect(el.textContent).toContain('Minimum 6 caractères');
    });

    it('active le bouton quand les champs sont valides', () => {
      type('username', 'admin');
      type('password', 'secret123');
      expect(submitBtn().disabled).toBeFalse();
    });
  });

  describe('onSubmit()', () => {
    it('n’appelle pas le service si le formulaire est invalide', () => {
      component.onSubmit();
      expect(authServiceSpy.login).not.toHaveBeenCalled();
    });

    it('appelle AuthService.login avec les valeurs du formulaire', () => {
      authServiceSpy.login.and.returnValue(of({} as AuthResponse));
      type('username', 'admin');
      type('password', 'secret123');

      submitBtn().click();

      expect(authServiceSpy.login).toHaveBeenCalledOnceWith(
        jasmine.objectContaining({ username: 'admin', password: 'secret123' })
      );
    });

    it('affiche "Connexion..." pendant la requête puis revient à l’état normal', () => {
      const response$ = new Subject<AuthResponse>();
      authServiceSpy.login.and.returnValue(response$.asObservable());
      type('username', 'admin');
      type('password', 'secret123');

      submitBtn().click();
      fixture.detectChanges();
      expect(component.isLoading).toBeTrue();
      expect(submitBtn().textContent).toContain('Connexion...');
      expect(submitBtn().disabled).toBeTrue();   // pas de double clic possible

      response$.next({} as AuthResponse);
      response$.complete();
      fixture.detectChanges();
      expect(component.isLoading).toBeFalse();
    });

    it('affiche "Invalid username or password" sur une erreur 401', () => {
      authServiceSpy.login.and.returnValue(throwError(() => ({ status: 401 })));
      type('username', 'admin');
      type('password', 'mauvais1');

      submitBtn().click();
      fixture.detectChanges();

      expect(component.isLoading).toBeFalse();
      expect(el.querySelector('.error-alert')?.textContent).toContain('Invalid username or password');
    });

    it('affiche "Server error" sur une autre erreur (ex. 500 ou backend éteint)', () => {
      authServiceSpy.login.and.returnValue(throwError(() => ({ status: 500 })));
      type('username', 'admin');
      type('password', 'secret123');

      submitBtn().click();
      fixture.detectChanges();

      expect(el.querySelector('.error-alert')?.textContent).toContain('Server error. Please try again.');
    });
  });

  it('bascule l’affichage du mot de passe avec le bouton œil', () => {
    const passwordInput = () => el.querySelector<HTMLInputElement>('input[formControlName="password"]')!;
    expect(passwordInput().type).toBe('password');

    el.querySelector<HTMLButtonElement>('.eye-btn')!.click();
    fixture.detectChanges();

    expect(passwordInput().type).toBe('text');
  });
});
