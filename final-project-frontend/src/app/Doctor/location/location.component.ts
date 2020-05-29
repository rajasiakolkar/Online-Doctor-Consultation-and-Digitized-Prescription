import { Component, OnInit } from '@angular/core';
import {Observable}from 'rxjs';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import {DoctorService} from '../shared/doctor.service';
import { AuthService } from 'src/app/Homepage/auth.service';
import {Doctor} from '../shared/doctor.model';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';
import {MatSnackBar} from '@angular/material';

declare var google:any;
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})

export class LocationComponent implements OnInit {
lat :number = 51.678418;
lng :number = 7.809007;
pos:Position;
userID:string;

  constructor(private snackBar: MatSnackBar,private doctorService : DoctorService ,private authService: AuthService) {}

  ngOnInit() {
   
   this.getLocation();  
   this.initialise();
   this.userID=this.authService.getUserID();
   this.getdoctor();
  }

  // get location of doctor
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
       alert("Geolocation is not supported by this browser.");
    }
  }
  
  //update map
  showPosition(position:Position) {
    document.getElementById("lati").innerHTML=position.coords.latitude.toString();
    document.getElementById("long").innerHTML=position.coords.longitude.toString();
   
  } 

  //get current position
  getpostion()
  {
    this.doctorService.selecteddoctor.location.latitude=parseFloat( document.getElementById("lati").innerHTML);
    this.doctorService.selecteddoctor.location.longitude=parseFloat( document.getElementById("long").innerHTML);
  }

 // get location of particular doctor
get()
{
  this.getpostion();
  this.doctorService.putDoctor(this.doctorService.selecteddoctor).subscribe((res)=>{
         
  });
  this.snackBar.open("details updated", "OK", {
   duration: 2000,
 });
}
 
//defining selected doctor
initialise()
{
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
      longitude:7.809007,
      latitude:51.678418
    },
    fees:0
  }
}

// get selected doctor
getdoctor()
  {
    this.doctorService.getDoctor(this.userID).subscribe((res)=>{
    this.doctorService.selecteddoctor=res as Doctor;
    if(this.doctorService.selecteddoctor.location==undefined)
    this.doctorService.selecteddoctor.location={
      longitude:7.809007,
      latitude:51.678418
    }
    
    })
  }
  
  
}


