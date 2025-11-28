import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AuthService,
  LoginRequest,
  RegisterRequest,
} from '../../core/auth/auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent {
  @Output() close = new EventEmitter<void>();

  // 👇 añadimos el modo "verify"
  mode: 'login' | 'register' | 'verify' = 'login';
  loading = false;
  errorMsg = '';
  verificationMsg = '';

  // para saber a qué correo estamos verificando
  pendingEmail: string | null = null;
  // código que escribe el usuario
  verificationCode: string = '';

  loginForm: LoginRequest = {
    email: '',
    password: '',
  };

  registerForm: RegisterRequest = {
    name: '',
    lastname1: '',
    lastname2: '',
    type: 'Cliente',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  // Tabs de login / registro (no incluimos verify aquí)
  switchMode(mode: 'login' | 'register') {
    this.mode = mode;
    this.errorMsg = '';
    this.verificationMsg = '';
  }

  // ---- LOGIN ----
  onSubmitLogin() {
    if (!this.loginForm.email || !this.loginForm.password) return;

    this.loading = true;
    this.errorMsg = '';
    this.verificationMsg = '';

    this.authService.login(this.loginForm).subscribe({
      next: () => {
        this.loading = false;
        this.close.emit(); // cerramos modal
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg =
          err?.error?.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
      },
    });
  }

  // ---- REGISTRO + PASO A VERIFICACIÓN ----
  onSubmitRegister() {
    if (
      !this.registerForm.name ||
      !this.registerForm.lastname1 ||
      !this.registerForm.lastname2 ||
      !this.registerForm.type ||
      !this.registerForm.email ||
      !this.registerForm.password
    )
      return;

    this.loading = true;
    this.errorMsg = '';
    this.verificationMsg = '';

    this.authService.register(this.registerForm).subscribe({
      next: () => {
        this.loading = false;

        // guardamos el correo del usuario que se acaba de registrar
        this.pendingEmail = this.registerForm.email;

        // cambiamos a modo verificación de código
        this.mode = 'verify';

        // Si tu backend ya envía el código automáticamente al registrarse, no hace falta llamar a nada más aquí.
        // Si NO lo hace, podrías descomentar esto:
        // this.authService.sendVerificationCode(this.pendingEmail!).subscribe();
      },
      error: (err) => {
        this.loading = false;
        console.log('REGISTER ERROR:', err);
        this.errorMsg =
          err?.error?.message || 'Error al registrarse. Inténtalo de nuevo.';
      },
    });
  }

  // ---- CONFIRMAR CÓDIGO ----
  onConfirmCode() {
    if (!this.pendingEmail || !this.verificationCode) return;

    this.loading = true;
    this.errorMsg = '';
    this.verificationMsg = '';

    this.authService
      .verifyEmailCode({
        email: this.pendingEmail,
        code: this.verificationCode,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          // En este punto el usuario YA está logueado:
          // - tokens y user guardados en AuthService
          // - currentUser$ emite el nuevo usuario (navbar se actualiza)
          this.close.emit();
        },
        error: (err) => {
          this.loading = false;
          console.log('VERIFY CODE ERROR:', err);
          this.errorMsg = err?.error?.message || 'Código inválido o expirado.';
        },
      });
  }

  // ---- REENVIAR CÓDIGO ----
  onResendCode() {
    if (!this.pendingEmail) return;

    this.loading = true;
    this.errorMsg = '';
    this.verificationMsg = '';

    this.authService.resendVerificationCode(this.pendingEmail).subscribe({
      next: () => {
        this.loading = false;
        this.verificationMsg = 'Se ha reenviado el código a tu correo.';
      },
      error: (err) => {
        this.loading = false;
        console.log('RESEND CODE ERROR:', err);
        this.errorMsg = err?.error?.message || 'No se pudo reenviar el código.';
      },
    });
  }

  onBackdropClick(event: MouseEvent) {
    // cerrar solo si clic fuera del cuadro
    if ((event.target as HTMLElement).dataset['backdrop']) {
      this.close.emit();
    }
  }
}
