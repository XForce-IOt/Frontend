import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  router: any;

  goHome() {
    this.router.navigate(['/login']);  // or '/home' if the user is logged in
  }

}
