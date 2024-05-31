import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Appointment} from "../../domain/appointment/entities/appointment.model";
import {AppointmentService} from "../../domain/appointment/services/appointment.service";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  searchText: any;
  public appointments: Appointment[];
  public calendarOptions?: CalendarOptions;

  constructor(public appointmentService: AppointmentService) {
    this.appointments = [];
  }

  private getAppointments(): void {
    this.appointmentService.getAll().subscribe({
      next: (response: Appointment[]) => {
        this.appointments = response;
        this.setupCalendarOptions();
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }

  private setupCalendarOptions(): void {
    // Asegura que este método solo se llama después de que los datos están completamente cargados
    if (this.appointments.length > 0) {
      this.calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: this.appointments.map(appointment => {
          const date = this.convertDate(appointment.date, appointment.hour);
          return {
            title: appointment.title,
            start: date,
            allDay: false
          };
        })
      };
    }
  }

  private convertDate(dateStr: string, timeStr: string): string {
    // Asume que dateStr está en formato "DD-MM-YYYY" y timeStr en "HH:MM"
    const [day, month, year] = dateStr.split('-').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute).toISOString(); // Convierte a formato ISO
  }

  ngOnInit(): void{
    this.getAppointments();
  }


}
