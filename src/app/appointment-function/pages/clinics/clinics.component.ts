import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicService } from 'src/app/appointment-function/services/clinic.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent implements OnInit {
  clinics: any[] = [];

  constructor(private translate: TranslateService, private clinicService: ClinicService, private router: Router){
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
  }

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
    console.log(clinicId);
    this.router.navigate(['/home/appointment/clinics', clinicId,'veterinarians']);
    
  }
}
