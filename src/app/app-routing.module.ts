import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './collar-function/pages/pets/pets.component';
import { ProfileComponent } from './account-management/pages/profile/profile.component';
import { ChangePasswordComponent } from './account-management/pages/change-password/change-password.component';
import { AppointmentComponent } from './appointment-function/pages/appointment/appointment.component';
import { AuthComponent } from './account-management/pages/auth/auth.component';
import { RegistrationComponent } from './account-management/pages/registration/registration.component';
import { HomeComponent } from './public/pages/home/home.component';
import { EditPetComponent } from './collar-function/pages/edit-pet/edit-pet.component';
import {CreateAppointmentComponent} from "./appointment-function/pages/create-appointment/create-appointment.component";
import { ClinicsComponent } from './appointment-function/pages/clinics/clinics.component';
import { VeterinariansComponent } from './appointment-function/pages/veterinarians/veterinarians.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  { path: 'login', component: AuthComponent, pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'pets', component: PetsComponent, pathMatch: 'full' },
      { path: 'pet/edit/:id', component: EditPetComponent, pathMatch: 'full'},
      { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
      { path: 'change-password', component: ChangePasswordComponent, pathMatch: 'full' },
      { path: 'appointment', component: AppointmentComponent, pathMatch: 'full' },
      { path: 'appointment', children:[
        { path: 'clinics', component: ClinicsComponent, pathMatch:'full'},
        { path: 'clinics/:clinicId/veterinarians', component: VeterinariansComponent, pathMatch:'full'},
        { path: 'clinics/:clinicId/veterinarians/:vetId/create-appointment', component: CreateAppointmentComponent, pathMatch: 'full' }
        ]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
