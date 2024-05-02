import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPetsComponent } from './customer-pets/customer-pets.component';;
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSettingsComponent } from './customer-settings/customer-settings.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarHeaderComponent } from './customer-appointments/calendar-header/calendar-header.component';
import { CalendarCommonModule } from "angular-calendar";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    CustomerPetsComponent,
    CustomerProfileComponent,
    CustomerSettingsComponent

  ],
  exports: [
    CalendarHeaderComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CalendarCommonModule,
    CalendarHeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ]
})
export class CustomerModule { }
