import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorRegistrationComponent } from './Homepage/doctor-registration/doctor-registration.component';
import { LoginCreateComponent } from './Homepage/login-create/login-create.component';
import { CustomerHomepageComponent } from './Customer/customer-homepage/customer-homepage.component';
import { CustomerProfileComponent } from './Customer/customer-profile/customer-profile.component';
import { CustomerAppointmentsComponent } from './Customer/customer-appointments/customer-appointments.component';
import { CanActivateGuard } from './Homepage/auth.guard';
import { MainComponent } from './Doctor/main/main.component';
import { EducationComponent } from './Doctor/education/education.component';
import { DemographicComponent } from './Doctor/demographic/demographic.component';
import { ClinicComponent } from './Doctor/clinic/clinic.component';
import { ClinictimeComponent } from './Doctor/clinictime/clinictime.component';
import {LocationComponent} from './Doctor/location/location.component'
import {AppointmentComponent} from './Doctor/appointment/appointment.component';


const routes: Routes = [
{ path: '',  component: LoginCreateComponent },
{
  path: 'doctorregistration',
  component: DoctorRegistrationComponent
},
{
  path: 'logincreate',
  component: LoginCreateComponent
},
{
  path: 'customerHomepage',
  component: CustomerHomepageComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'customerProfile',
  component: CustomerProfileComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'customerAppointments',
  component: CustomerAppointmentsComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'doctorHome',
  component: AppointmentComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'doctorEducation',
  component: EducationComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'doctorprofile',
  component: DemographicComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'doctorclinic',
  component: ClinicComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'doctortime',
  component: ClinictimeComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'doctorlocation',
  component: LocationComponent,
  canActivate : [CanActivateGuard]
},
{
  path: 'doctorappointment',
  component: AppointmentComponent,
  canActivate : [CanActivateGuard]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard]
})
export class AppRoutingModule { }
