import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  user_now: any = {};
  //user_now!: User | null;

  constructor(private auth: AuthService, private http: HttpClient, private profileService: ProfileService, private snackBar: MatSnackBar) { 
    this.user_now = this.auth.getUser()
  }

  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  currentPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);

  terms = new FormControl(false, [Validators.requiredTrue]);
  termsError = false;

  ngOnInit(): void {
    this.user_now = this.auth.getUser();
  
    // Inicializar los controles del formulario con los valores del usuario actual
    if (this.user_now) {
      this.name.setValue(this.user_now.name);
      this.lastname.setValue(this.user_now.lastname);
      this.address.setValue(this.user_now.address);
      this.phone.setValue(this.user_now.phone);
      this.email.setValue(this.user_now.email);
    }
  }

  updatePass() {
    const nameValue = this.name.value;
    const lastnameValue = this.lastname.value;
    const addressValue = this.address.value;
    const phoneValue = this.phone.value;
    const emailValue = this.email.value;
    const currentPasswordValue = this.currentPassword.value;
    const newPasswordValue = this.newPassword.value;
    const confirmPasswordValue = this.confirmPassword.value;

    if (this.currentPassword.invalid || this.newPassword.invalid || this.confirmPassword.invalid) {
      // Al menos uno de los campos es inválido, mostrar mensajes de error
      this.currentPassword.markAsTouched();
      this.newPassword.markAsTouched();
      this.confirmPassword.markAsTouched();
      return;
    }

    // Validar la contraseña actual
    if (currentPasswordValue !== this.user_now.password) {
      this.snackBar.open("La contraseña actual es incorrecta", 'Cerrar', { duration: 3000 });
      return;
    }

    // Validar que la nueva contraseña y la confirmación coincidan
    if (newPasswordValue !== confirmPasswordValue) {
      this.snackBar.open("La nueva contraseña y la confirmación no coinciden", 'Cerrar', { duration: 3000 });
      return;
    }

    // Validar que la nueva contraseña no sea la misma que la actual
    if (newPasswordValue === currentPasswordValue) {
      this.snackBar.open("La nueva contraseña no puede ser la misma que la contraseña actual", 'Cerrar', { duration: 3000 });
      return;
    }

    const updatedItem = {
      id: this.user_now.id,
      name: nameValue,
      lastname: lastnameValue,
      address: addressValue,
      phone: phoneValue,
      email: emailValue,
      password: newPasswordValue
    }

    this.profileService.updateItem(updatedItem).subscribe(
      res => {
        this.snackBar.open("Contraseña actualizada exitosamente", 'Cerrar', { duration: 3000 });
      },
      error => {
        this.snackBar.open("Ocurrió un error al actualizar la contraseña", 'Cerrar', { duration: 3000 });
        console.log(error);
      }
    );
  }

}
