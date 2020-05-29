import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { DoctorService} from '../shared/doctor.service';
import {Doctor} from '../shared/doctor.model';
import { AuthService } from 'src/app/Homepage/auth.service';
import {MatSnackBar} from '@angular/material';
export interface City {
  value: string;
  
}

declare var M :any;
@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  cities: City[] = [
    {value: 'Delhi'},
    {value: 'Mumbai'},
    {value: 'Pune'}
  ];
  userID: string;
 
  constructor(private snackBar: MatSnackBar,private doctorService : DoctorService, private authService: AuthService) { }
 
  //defining slected doctor
  resetForm(form?: NgForm)
  {
    
    if(form) form.reset();
    this.doctorService.selecteddoctor={
      _id:"",
      doctorID:"",
      email: "",
      password:"",
      phonenumber: "",
      firstname : "",
      lastname : "",
      speciality : "",
      gender :  "",
      image:"",
      degree : "",
      college :  "",
      eoc : "",
      eoy :  "",  
      clinicname: "",
      cliniccity:"",
      clinicaddress:"",
      timing:{
        mon:{ from:0,to:0},tue:{ from:0, to:0},wed:{from:0,to:0},thu:{ from:0,to:0},
        fri:{ from:0, to:0},sat:{from:0,to:0},sun:{from:0,to:0}   
      },
      location:{
        longitude:51.678418,
        latitude:7.809007
      },
      fees:0
    }
    
    
    
  }
  ngOnInit() {
    this.userID=this.authService.getUserID();
    this.resetForm();
    this.getdoctor();
    
  }

  // on sumbit update details
  onSubmit (form :NgForm)
  {
    this.doctorService.putDoctor(this.doctorService.selecteddoctor).subscribe((res)=>{
      
   });
   this.snackBar.open("details updated", "OK", {
    duration: 2000,
  });
  }

  // get particular doctor
  getdoctor()
  {
    this.doctorService.getDoctor(this.userID).subscribe((res)=>{
    this.doctorService.selecteddoctor=res as Doctor;
    })
  }
}
