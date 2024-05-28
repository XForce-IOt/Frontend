import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { PetsComponent } from './components/pets/pets.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPetComponent } from './components/edit-pet/edit-pet.component';
import { CreateAppointmentComponent } from './components/create-appointment/create-appointment.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HammerModule } from '@angular/platform-browser';
import { IgxDatePickerModule, IgxTimePickerModule } from 'igniteui-angular';
import { FullCalendarModule } from "@fullcalendar/angular";
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    AppointmentComponent,
    ProfileComponent,
    ChangePasswordComponent,
    HomeComponent,
    AuthComponent,
    RegistrationComponent,
    EditPetComponent,
    CreateAppointmentComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgApexchartsModule,
    CommonModule,
    GoogleMapsModule,
    HammerModule,
    IgxDatePickerModule,
    IgxTimePickerModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
