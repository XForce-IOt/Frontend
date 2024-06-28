import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {Appointment} from "../../model/appointment.model";
import {AppointmentService} from "../../services/appointment.service";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  searchText: any;
  public appointments: Appointment[];
  public calendarOptions?: CalendarOptions;
  clinicId: any | null = null;
  vetId: any | null = null;
  petOwnerId: any | null = null;

  constructor(private translate: TranslateService, public appointmentService: AppointmentService, private route:ActivatedRoute, private authService: AuthService,) {
    this.appointments = [];
    this.petOwnerId = this.authService.getUserId();
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
  }

  private getAppointments(): void {
    this.appointmentService.getAppointmentsByPetOwnerId(this.petOwnerId).subscribe({
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
          //const date = this.convertDate(appointment.dateTime, appointment.hour);
          const date = appointment.dateTime
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
    this.clinicId = this.route.snapshot.paramMap.get('clinicId');
    this.vetId = this.route.snapshot.paramMap.get('vetId');
    this.getAppointments();
  }


}
