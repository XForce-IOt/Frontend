import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {CalendarHeaderComponent} from "./calendar-header/calendar-header.component";
import {NgSwitch} from "@angular/common";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {Appointment} from "./model/appointment.entity";
import {AppointmentsService} from "./service/appointments.service";


@Component({
  selector: 'app-customer-appointments',
  templateUrl: './customer-appointments.component.html',
  styleUrls: ['./customer-appointments.component.css'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule,
    CalendarModule, CalendarHeaderComponent, NgSwitch, CommonModule, MatButtonModule
  ]
})
export class CustomerAppointmentsComponent {
  public appointments: Appointment[];
  constructor(public appointmentService: AppointmentsService) {
    this.appointments = [];
  }
  private getAllAppointments(){
    this.appointmentService.getAll().subscribe((response: any)=>{
      this.appointments = response;
    })
  }

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  events: CalendarEvent[]=[]

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  ngOnInit(): void{
    this.getAllAppointments();
  }
}
