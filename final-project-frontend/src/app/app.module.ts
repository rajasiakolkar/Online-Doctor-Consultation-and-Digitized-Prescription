import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { LoginCreateComponent } from './Homepage/login-create/login-create.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from './Homepage/footer/footer.component';
import { DoctorRegistrationComponent } from './Homepage/doctor-registration/doctor-registration.component';
import { HomeComponent } from './Homepage/home/home.component';
import { CustomerProfileComponent } from './Customer/customer-profile/customer-profile.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { CustomerHomepageComponent } from './Customer/customer-homepage/customer-homepage.component';
import { CustomerAppointmentsComponent } from './Customer/customer-appointments/customer-appointments.component';
import { AuthInterceptor } from './Homepage/auth-interceptor';
import { ClinicComponent } from './Doctor/clinic/clinic.component';
import { DemographicComponent } from './Doctor/demographic/demographic.component';
import { MainComponent } from './Doctor/main/main.component';
import { EducationComponent } from './Doctor/education/education.component';
import { ClinictimeComponent } from './Doctor/clinictime/clinictime.component';
import {MatSnackBarModule} from "@angular/material";
import { LocationComponent } from './Doctor/location/location.component';
import { AppointmentComponent } from './Doctor/appointment/appointment.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { SendPrescriptionComponent } from './Doctor/send-prescription/send-prescription.component';
import {AgmCoreModule } from '@agm/core';
import {MatChipsModule} from '@angular/material/chips';
import { SeeLocationComponent } from './Customer/see-location/see-location.component';
import { ConfirmAppointmentComponent } from './Customer/confirm-appointment/confirm-appointment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginCreateComponent,
    FooterComponent,
    DoctorRegistrationComponent,
    HomeComponent,
    CustomerProfileComponent,
    CustomerHomepageComponent,
    CustomerAppointmentsComponent,
    ClinicComponent,
    DemographicComponent,
    MainComponent,
    EducationComponent,
    ClinictimeComponent,
    LocationComponent,
    AppointmentComponent,
    SendPrescriptionComponent,
    SeeLocationComponent,
    ConfirmAppointmentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatChipsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBasa0YYrtweVdF0ZmmxEwTvKJ-TITybTo'
    })

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents:[SendPrescriptionComponent,SeeLocationComponent,ConfirmAppointmentComponent]
})
export class AppModule { }
