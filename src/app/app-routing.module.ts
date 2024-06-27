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
import { CreateAppointmentComponent } from "./appointment-function/pages/create-appointment/create-appointment.component";
import { ClinicsComponent } from './appointment-function/pages/clinics/clinics.component';
import { VeterinariansComponent } from './appointment-function/pages/veterinarians/veterinarians.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AccessDeniedComponent } from './shared/components/access-denied/access-denied.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'pets', component: PetsComponent },
      { path: 'pet/edit/:id', component: EditPetComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'appointment', component: AppointmentComponent, pathMatch: 'full' },
      { path: 'appointment', children:[
        { path: 'clinics', component: ClinicsComponent },
        { path: 'clinics/:clinicId/veterinarians', component: VeterinariansComponent },
        { path: 'clinics/:clinicId/veterinarians/:vetId/create-appointment', component: CreateAppointmentComponent }
        ]
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
