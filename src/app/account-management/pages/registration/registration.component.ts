import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor( private profileService: ProfileService, private router: Router) { }

  name = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  image = new FormControl('https://dthezntil550i.cloudfront.net/f4/latest/f41908291942413280009640715/1280_960/1b2d9510-d66d-43a2-971a-cfcbb600e7fe.png');

  terms = new FormControl(false, [Validators.requiredTrue]);
  termsError = false;

  async submit() {
    const nameValue = this.name.value;
    const lastNameValue = this.lastName.value;
    const addressValue = this.address.value;
    const phoneValue = this.phone.value;
    const emailValue = this.email.value;
    const passwordValue = this.password.value;
    const imageValue = this.image.value;

    if (this.name.invalid || this.email.invalid || this.password.invalid) {
      // Al menos uno de los campos es inválido, mostrar mensajes de error
      this.name.markAsTouched();
      this.lastName.markAsTouched();
      this.address.markAsTouched();
      this.phone.markAsTouched();
      this.email.markAsTouched();
      this.password.markAsTouched();
      this.image.markAsTouched();
      return;
    }

    if (passwordValue === null) {
      console.error('Password value is null');
      return;
    }

    // Hash the password
    const hashedPassword = CryptoJS.SHA256(passwordValue).toString(CryptoJS.enc.Hex);

    const newItem = {
      name: nameValue,
      lastName: lastNameValue,
      address: addressValue,
      phone: phoneValue,
      email: emailValue,
      password: hashedPassword,
      image: imageValue,
    }

    this.profileService.createItem(newItem).subscribe(
      res => {
        console.log("Usuario agregado exitosamente");
        this.router.navigate(['/login']);
        this.name.reset();
        this.lastName.reset();
        this.address.reset();
        this.phone.reset();
        this.email.reset();
        this.password.reset();
        this.image.reset();
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
