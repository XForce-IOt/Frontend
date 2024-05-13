import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: any[]=[];
  appointments: any[]=[];
  filterAppointments: any[]=[];

  constructor(private PetsService: PetService, private appointmentService: AppointmentService){
  }


  ngOnInit(): void {
    this.getPets();
    this.getNextAppointments();
  }

  getPets(): void {
    this.PetsService.getPets().subscribe(
      (pets) => {
        this.pets = pets;
        console.log(this.pets);
      }
    );
  }

  getNextAppointments(){
    const ahora = new Date();
    this.appointmentService.getAll().subscribe(
        (data) => {
          this.appointments = data;
          this.appointments.forEach(appointment => {
            const [day, month, year] = appointment.date.split('-');
            const [hour, minute] = appointment.hour.split(':');
            // Crear una nueva fecha con el formato adecuado
            const fechaCita = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
            if (fechaCita > ahora) {
              this.filterAppointments.push(appointment);
            }
          });
          console.log(this.filterAppointments);
        }
      );
  }
  checkAppointments(petId: number): boolean{
    return this.filterAppointments.some(appointment => appointment.pet === petId);
  }

}
