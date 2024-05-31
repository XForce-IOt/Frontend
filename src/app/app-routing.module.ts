import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './presentation/pets/pets.component';
import { ProfileComponent } from './presentation/profile/profile.component';
import { ChangePasswordComponent } from './presentation/change-password/change-password.component';
import { AppointmentComponent } from './presentation/appointment/appointment.component';
import { AuthComponent } from './auth/auth/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './presentation/home/home.component';
import { EditPetComponent } from './presentation/edit-pet/edit-pet.component';
import {CreateAppointmentComponent} from "./presentation/create-appointment/create-appointment.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
          {path: 'create-appointment', component: CreateAppointmentComponent, pathMatch: 'full' },
        ]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
