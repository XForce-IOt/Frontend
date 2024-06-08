import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicService } from 'src/app/appointment-function/services/clinic.service';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent implements OnInit {
  clinics: any[] = [];

  constructor(private clinicService: ClinicService, private router: Router){}

  ngOnInit(): void{
    this.getClinics();
  }

  getClinics(): void{
    this.clinicService.getAll().subscribe(
      (data) => {
        this.clinics = data;
        console.log(this.clinics);
      }
    )
  }
  goToVeterinarians(clinicId: number):void{
    this.router.navigate(['/home/clinics', clinicId,'veterinarians']);
  }
}
