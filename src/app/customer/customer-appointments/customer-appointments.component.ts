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
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';


@Component({
  selector: 'app-customer-appointments',
  templateUrl: './customer-appointments.component.html',
  styleUrls: ['./customer-appointments.component.css'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatInputModule, MatFormFieldModule,
    CalendarModule, CalendarHeaderComponent, NgSwitch, CommonModule, ContextMenuModule
  ]
})
export class CustomerAppointmentsComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  events: CalendarEvent[]=[]

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
}
