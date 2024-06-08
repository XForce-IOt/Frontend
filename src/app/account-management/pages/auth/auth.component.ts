import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/account-management/services/profile.service';
import { PetOwner } from '../../model/pet-owner.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) { }

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);


  login() {
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if (this.email.invalid || this.password.invalid) {
      // Al menos uno de los campos es inválido, mostrar mensajes de error
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    const newItem = {
      email: emailValue,
      password: passwordValue
    }

    this.profileService.getList().subscribe(
      data => {
        const userExists = data.some(item => item.email === emailValue && item.password === passwordValue);

        if (userExists) {

          const user = data.find(item => item.email === emailValue && item.password === passwordValue) as PetOwner;

          this.authService.setUser(user); // Almacenar el usuario en el AuthService

          this.router.navigateByUrl('/home/pets');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error => {
        console.log("Ocurrió un error al obtener la data");
        console.log(error);
      }
    );
  }

  //login(){
  //  this.router.navigateByUrl('/home/pets');
  //}

  register(){
    this.router.navigateByUrl('/registration');
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
}
