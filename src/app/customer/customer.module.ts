import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPetsComponent } from './customer-pets/customer-pets.component';
import { CustomerAppointmentsComponent } from './customer-appointments/customer-appointments.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';



@NgModule({
  declarations: [
    CustomerPetsComponent,
    CustomerAppointmentsComponent,
    CustomerProfileComponent,
    CustomerSettingsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
