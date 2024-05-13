import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private router: Router) { }

  login(){
    this.router.navigateByUrl('/home/pets');
  }

  register(){
    this.router.navigateByUrl('/register');
  }
}
