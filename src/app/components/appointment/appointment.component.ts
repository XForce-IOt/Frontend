import { Component } from '@angular/core';
import {Appointment} from "../../models/appointment.model";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  public appointments: Appointment[];
  constructor(public appointmentService: AppointmentService) {
    this.appointments = [];
  }

  private getAppointments(): void {
    this.appointmentService.getAll().subscribe((response: any) =>{
      this.appointments = response;
    })
  }

  ngOnInit(): void{
    this.getAppointments();
  }
}
