import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private currentUserKey = 'currentUser'; // Clave para el almacenamiento en localStorage
  
    constructor(private router: Router) { }
  
    setUser(user: User) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user)); // Almacenar el usuario en localStorage
    }
  
    getUser(): User | null {
      const userJson = localStorage.getItem(this.currentUserKey);
      if (userJson) {
        return JSON.parse(userJson) as User;
      }
      return null;
    }

    
  
    logout() {
      localStorage.removeItem(this.currentUserKey); // Eliminar el usuario del localStorage
      // Otros pasos necesarios para el logout, como redireccionar o limpiar datos adicionales
      this.router.navigate(['/login']);
    }
  }