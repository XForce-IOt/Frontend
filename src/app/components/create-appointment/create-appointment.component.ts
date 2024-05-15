import { Component } from '@angular/core';
import {Clinic} from "../../models/clinic.model";
import {Router} from "@angular/router";
import {ClinicService} from "../../services/clinic.service";

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent {
  searchText: any;
  public clinics: Clinic[];
  constructor(public clinicService: ClinicService) {
    this.clinics = []
  }

  private getClinics(): void{
    this.clinicService.getAll().subscribe((response: any) => {
      this.clinics = response;
    })
  }

  ngOnInit(): void{
    this.getClinics();
  }

}
