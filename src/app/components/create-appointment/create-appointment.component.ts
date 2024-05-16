import { Component } from '@angular/core';
import {Clinic} from "../../models/clinic.model";
import {Router} from "@angular/router";
import {ClinicService} from "../../services/clinic.service";
import {Veterinarian} from "../../models/veterinarian.model";
import {VeterinarianService} from "../../services/veterinarian.service";

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent {
  searchText: any;
  public clinics: Clinic[];
  public veterinariansByClinic: Veterinarian[];
  constructor(public clinicService: ClinicService, public veterinarianService: VeterinarianService) {
    this.clinics = [];
    this.veterinariansByClinic = [];
  }

  private getClinics(): void{
    this.clinicService.getAll().subscribe((response: any) => {
      this.clinics = response;
    })
  }

  private getVeterinariansByClinic(clinicId: number){
    this.veterinarianService.getAll().subscribe((response: any) => {
      this.veterinariansByClinic = response.filter((veterinarian: any) => veterinarian.clinicId === clinicId);
    },
      (error: any) => {
        console.error('Error fetching veterinarians by Id:', error);
      }
      );
  }

  onSelected(clinicId: number){
    this.getVeterinariansByClinic(clinicId);
  }

  ngOnInit(): void{
    this.getClinics();
  }

}
