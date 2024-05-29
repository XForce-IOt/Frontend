import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor( private profileService: ProfileService, private router: Router) { }

  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  terms = new FormControl(false, [Validators.requiredTrue]);
  termsError = false;

  submit() {
    const nameValue = this.name.value;
    const lastnameValue = this.lastname.value;
    const addressValue = this.address.value;
    const phoneValue = this.phone.value;
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if (this.name.invalid || this.email.invalid || this.password.invalid) {
      // Al menos uno de los campos es inválido, mostrar mensajes de error
      this.name.markAsTouched();
      this.lastname.markAsTouched();
      this.address.markAsTouched();
      this.phone.markAsTouched();
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }
  
    const newItem = {
      name: nameValue,
      lastname: lastnameValue,
      address: addressValue,
      phone: phoneValue,
      email: emailValue,
      password: passwordValue,
    }
  
    this.profileService.createItem(newItem).subscribe(
      res => {
        console.log("Usuario agregado exitosamente");
        this.router.navigate(['/login']);
        this.name.reset();
        this.lastname.reset();
        this.address.reset();
        this.phone.reset();
        this.email.reset();
        this.password.reset();
      },
      error => {
        console.log("Ocurrió un error al agregar el usuario");
        console.log(error);
      }
    );
  }

  getErrorMessageName() {
    if(this.name.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  getErrorMessageEmail() {
    if(this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  getErrorMessagePassword() {
    if(this.password.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  getErrorMessageRePassword() {
  
    return '';
  }

  resetTermsError() {
    this.termsError = false;
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
