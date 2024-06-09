import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarianService } from 'src/app/appointment-function/services/veterinarian.service';

@Component({
  selector: 'app-veterinarians',
  templateUrl: './veterinarians.component.html',
  styleUrl: './veterinarians.component.css'
})
export class VeterinariansComponent implements OnInit {
  clinicId: String | null = null;
  veterinarians: any[]=[];

  constructor(
    private veterinarianService: VeterinarianService, 
    private route: ActivatedRoute,
    private router: Router){}
  
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
