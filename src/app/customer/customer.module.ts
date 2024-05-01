import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPetsComponent } from './customer-pets/customer-pets.component';
import { CustomerAppointmentsComponent } from './customer-appointments/customer-appointments.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    CustomerPetsComponent,
    CustomerAppointmentsComponent,
    CustomerProfileComponent,
    CustomerSettingsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, 
    MatSlideToggleModule
  ]
})
export class CustomerModule { }
