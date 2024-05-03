import { Component, OnInit } from '@angular/core';
import { Pet } from '../customer-appointments/model/pet.entity';
import { PetsService } from '../customer-appointments/service/pets.service';
import { Appointment } from '../customer-appointments/model/appointment.entity';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-pets',
  templateUrl: './customer-pets.component.html',
  styleUrls: ['./customer-pets.component.css']
})


export class CustomerPetsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petsService: PetsService) { }

  ngOnInit(): void {
    this.getPetsWithAppointments();
  }

  getPetsWithAppointments() {
    this.petsService.getPets().subscribe(pets => {
      const petsWithAppointments$ = pets.map(pet =>
        this.petsService.getAppointmentsForPet(pet.id).pipe(
          map(appointments => {
            pet.appointments = appointments;
            return pet;
          })
        )
      );

      forkJoin(petsWithAppointments$).subscribe(completePets => {
        this.pets = completePets;
        console.log(this.pets);
      });
    });
  }
}