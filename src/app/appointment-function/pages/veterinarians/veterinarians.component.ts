import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarianService } from 'src/app/appointment-function/services/veterinarian.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-veterinarians',
  templateUrl: './veterinarians.component.html',
  styleUrl: './veterinarians.component.css'
})
export class VeterinariansComponent implements OnInit {
  clinicId: String | null = null;
  veterinarians: any[]=[];

  constructor(private translate: TranslateService,
    private veterinarianService: VeterinarianService, 
    private route: ActivatedRoute,
    private router: Router){
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
    }
  
    ngOnInit(): void {
        this.clinicId = this.route.snapshot.paramMap.get('clinicId');
        this.getAllVeterinarians();
    }

    getAllVeterinarians(): void{
      this.veterinarianService.getAll(this.clinicId).subscribe(
        (data) =>{
          this.veterinarians = data;
          console.log(this.veterinarians)
          console.log(this.clinicId)
        }
      )
    }

    goToAppointment(vetId: number): void{
      this.router.navigate(['/home/appointment/clinics', this.clinicId,'veterinarians',vetId,'create-appointment']);
    }

}
