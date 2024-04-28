import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPetsComponent } from './customer-pets/customer-pets.component';
import { CustomerAppointmentsComponent } from './customer-appointments/customer-appointments.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';

const routes: Routes = [
  { path: 'customers', component: CustomerPetsComponent },
  { path: 'customerAppointments', component: CustomerAppointmentsComponent },
  { path: 'customerProfile', component: CustomerProfileComponent },
  { path: 'customerSettings', component: CustomerSettingsComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
