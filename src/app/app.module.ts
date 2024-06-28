import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { PetsComponent } from './collar-function/pages/pets/pets.component';
import { AppointmentComponent } from './appointment-function/pages/appointment/appointment.component';
import { ProfileComponent } from './account-management/pages/profile/profile.component';
import { ChangePasswordComponent } from './account-management/pages/change-password/change-password.component';
import { HomeComponent } from './public/pages/home/home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthComponent } from './account-management/pages/auth/auth.component';
import { RegistrationComponent } from './account-management/pages/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPetComponent } from './collar-function/pages/edit-pet/edit-pet.component';
import { CreateAppointmentComponent } from './appointment-function/pages/create-appointment/create-appointment.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HammerModule } from '@angular/platform-browser';
import { IgxDatePickerModule, IgxTimePickerModule } from 'igniteui-angular';
import { FullCalendarModule } from "@fullcalendar/angular";
import { FilterPipe } from './filter.pipe';
import { MatCardModule } from '@angular/material/card';
import { VeterinariansComponent } from './appointment-function/pages/veterinarians/veterinarians.component';
import { ClinicsComponent } from './appointment-function/pages/clinics/clinics.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Factory function for the loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    VeterinariansComponent,
    ClinicsComponent,
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
    FormsModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
