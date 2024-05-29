import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user_now: any = {};
  //user_now!: User | null;

  constructor(private auth: AuthService, private http: HttpClient, private profileService: ProfileService) { 
    this.user_now = this.auth.getUser()
  }

  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

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
      this.password.setValue(this.user_now.password);
    }
  }

  updateProfile() {
    const nameValue = this.name.value;
    const lastnameValue = this.lastname.value;
    const addressValue = this.address.value;
    const phoneValue = this.phone.value;
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    if (this.name.invalid || this.email.invalid) {
      // Al menos uno de los campos es inválido, mostrar mensajes de error
      this.name.markAsTouched();
      this.lastname.markAsTouched();
      this.address.markAsTouched();
      this.phone.markAsTouched();
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }
  
    const updatedItem = {
      id: this.user_now.id,
      name: nameValue,
      lastname: lastnameValue,
      address: addressValue,
      phone: phoneValue,
      email: emailValue,
      password: passwordValue,
    }
  
    this.profileService.updateItem(updatedItem).subscribe(
      res => {
        console.log("Usuario actualizado exitosamente");
      },
      error => {
        console.log("Ocurrió un error al actualizar el usuario");
        console.log(error);
      }
    );
  }

}
