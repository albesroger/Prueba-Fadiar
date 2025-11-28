import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, User } from '../../core/auth/auth.service';
import { DownloadAppBanner } from "../../components/DownloadAppBanner/DownloadAppBanner";

@Component({
  selector: 'app-perfil-page',
  imports: [CommonModule, FormsModule, DownloadAppBanner],
  templateUrl: './perfilPage.html',
})
export class PerfilPage {
  user: User | null = null;

  // avatar de ejemplo, cámbialo por el que quieras
  avatarUrl = '/assets/images/avatar-placeholder.jpg';

  // flags para mostrar/ocultar mensajes de validación / loading
  savingPersonal = false;
  savingAddress = false;
  savingPassword = false;

  personalSubmitted = false;
  addressSubmitted = false;
  passwordSubmitted = false;

  // modelos para los campos
  personal = {
    name: '',
    lastnames: '',
    phone: '',
    email: '',
  };

  address = {
    address: '',
  };

  passwords = {
    current: '',
    newPassword: '',
  };

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe((u) => {
      this.user = u;

      if (u) {
        this.personal.name = u.name;
        this.personal.lastnames = `${u.lastname1} ${u.lastname2}`.trim();
        this.personal.email = u.email;
      }
    });
  }

  // -------- DATOS PERSONALES ----------
  onSavePersonal(form: NgForm) {
    this.personalSubmitted = true;
    if (form.invalid) return;

    this.savingPersonal = true;

    const [lastname1 = '', ...rest] = this.personal.lastnames
      .trim()
      .split(' ')
      .filter(Boolean);
    const payload = {
      name: this.personal.name.trim(),
      lastname1,
      lastname2: rest.join(' '),
      phone: this.personal.phone.trim(),
      email: this.personal.email.trim(),
    };

    this.authService.updateProfile(payload).subscribe({
      next: () => {
        this.savingPersonal = false;
      },
      error: () => {
        this.savingPersonal = false;
      },
    });

    // simula fin
    setTimeout(() => {
      this.savingPersonal = false;
    }, 300);
  }

  // -------- DIRECCIÓN ----------
  onSaveAddress(form: NgForm) {
    this.addressSubmitted = true;
    if (form.invalid) return;

    this.savingAddress = true;
    // TODO: endpoint para actualizar dirección
    console.log('Guardar dirección:', this.address);

    setTimeout(() => {
      this.savingAddress = false;
    }, 300);
  }

  // -------- CONTRASEÑA ----------
  onUpdatePassword(form: NgForm) {
    this.passwordSubmitted = true;
    if (form.invalid) return;

    this.savingPassword = true;
    // TODO: endpoint para actualizar contraseña
    console.log('Actualizar contraseña:', this.passwords);

    setTimeout(() => {
      this.savingPassword = false;
    }, 300);
  }

  // cambiar avatar (placeholder)
  onChangeAvatar() {
    console.log('Cambiar avatar');
  }
}
