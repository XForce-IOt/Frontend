import { Injectable } from '@angular/core';
import { PetOwner } from 'src/app/account-management/model/pet-owner.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser'; // Clave para el almacenamiento en localStorage

  constructor(private router: Router) { }

  setUser(user: PetOwner) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user)); // Almacenar el usuario en localStorage
  }

  getUser(): PetOwner | null {
    const userJson = localStorage.getItem(this.currentUserKey);
    if (userJson) {
      return JSON.parse(userJson) as PetOwner;
    }
    return null;
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  logout() {
    localStorage.removeItem('currentUser');  //clave donde se almacena el usuario
    this.router.navigate(['/login']);  // Redirigir al usuario al login después de cerrar sesión
  }
}
