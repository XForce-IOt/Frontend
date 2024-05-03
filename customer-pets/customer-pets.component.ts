import { Component, OnInit } from '@angular/core';
import { Pet } from '../customer-appointments/model/pet.entity';
import { PetsService } from '../customer-appointments/service/pets.service';
import { AppointmentsService } from '../customer-appointments/service/appointments.service';
import { Appointment } from '../customer-appointments/model/appointment.entity';

@Component({
  selector: 'app-customer-pets',
  templateUrl: './customer-pets.component.html',
  styleUrls: ['./customer-pets.component.css']
})


export class CustomerPetsComponent implements OnInit{
  pets: Pet[]=[];
  public appointments: Appointment[];

  constructor(private PetsService: PetsService, private appointmentService: AppointmentsService){
    this.appointments = [];
  }


  ngOnInit(): void {
    this.getPets();
    this.getAllAppointments;
  }

  getPets(){
    this.PetsService.getPets().subscribe(
      (pets)=>{
        this.pets=pets;
        console.log(this.pets)
      }
    )
  }

  getAllAppointments(){
    this.appointmentService.getAll().subscribe((response: any)=>{
      this.appointments = response;
      console.log(this.appointments )
    })
  }
}
