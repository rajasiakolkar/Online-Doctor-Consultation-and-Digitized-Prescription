import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { DoctorService} from '../shared/doctor.service';
import {Doctor} from '../shared/doctor.model';
import { AuthService } from 'src/app/Homepage/auth.service';
import {MatSnackBar} from '@angular/material';
export interface time {
  value: string;
  no:number;
}
export interface day{
  value:string;
}
declare var M :any;


@Component({
  selector: 'app-clinictime',
  templateUrl: './clinictime.component.html',
  styleUrls: ['./clinictime.component.scss']
})
export class ClinictimeComponent implements OnInit {
  userID: string;
  timing:time[];
  days:day[];

  constructor(private snackBar: MatSnackBar,private doctorService : DoctorService ,private authService: AuthService) { 
    this.timing= [
      {value:'7:00 AM',no:1},{value:'7:15 AM',no:2},{value:'7:30 AM',no:3},{value:'7:45 AM',no:4},
        {value:'8:00 AM',no:5},{value:'8:15 AM',no:6},{value:'8:30 AM',no:7},{value:'8:45 AM',no:8} 
      ];
    this.days=[{value:"mon"},{value:"tue"},{value:"wed"},{value:"thu"},{value:"fri"},
    {value:"sat"},{value:"sun"},];



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


  ngOnInit() {
    this.userID=this.authService.getUserID();
    this.resetForm();
    this.getdoctor();
    
  }

  // update doctor
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
    if(this.doctorService.selecteddoctor.timing==undefined)
    this.doctorService.selecteddoctor.timing={
      mon:{ from:0,to:0},tue:{ from:0, to:0},wed:{from:0,to:0},thu:{ from:0,to:0},
      fri:{ from:0, to:0},sat:{from:0,to:0},sun:{from:0,to:0}   
    }
    
    })
    
  }


}
