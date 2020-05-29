import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { DoctorService} from '../shared/doctor.service';
import {Doctor} from '../shared/doctor.model';
import { AuthService } from 'src/app/Homepage/auth.service';
import {MatSnackBar} from '@angular/material';

export interface Degree {
  value: string;
  
}
declare var M :any;
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  userID: string;
  degrees: Degree[] = [
    {value: 'BDS'},
    {value: 'MBBS'},
    {value: 'MDS'},
    {value: 'MDS-Oral & Maxillofacial Surgery'},
    {value: 'BHMS'},
    {value: 'BAMS'},
    {value: 'MS-General Surgery'},
    {value: 'BPTh/BPT'},
    {value: 'MD-Medicine'},
  ];
  constructor(private snackBar: MatSnackBar,private doctorService : DoctorService, private authService: AuthService) { }

  ngOnInit() {
    this.userID=this.authService.getUserID();
    this.resetForm();
    this.getdoctor();
   
  }

  //defining selected doctor
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

  //update informtaion
  onSubmit (form :NgForm)
  {
    this.doctorService.putDoctor(this.doctorService.selecteddoctor).subscribe((res)=>{
         
   });
   this.snackBar.open("details updated", "OK", {
    duration: 2000,
  });
  }

  //get particular doctor
  getdoctor()
  {
    this.doctorService.getDoctor(this.userID).subscribe((res)=>{
    this.doctorService.selecteddoctor=res as Doctor;
    
    })
  }

}
