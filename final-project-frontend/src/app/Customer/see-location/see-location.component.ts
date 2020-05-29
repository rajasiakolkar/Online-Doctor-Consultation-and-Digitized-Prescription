import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DoctorService} from '../../Doctor/shared/doctor.service';
import { AuthService } from 'src/app/Homepage/auth.service';
import { Doctor } from '../../Doctor/shared/doctor.model';
export interface DialogData {
  customerID: string;
  doctorID: string;
}
@Component({
  selector: 'app-see-location',
  templateUrl: './see-location.component.html',
  styleUrls: ['./see-location.component.scss']
})
export class SeeLocationComponent implements OnInit {

  constructor(private doctorService : DoctorService ,private authService: AuthService,
    public dialogRef: MatDialogRef<SeeLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.initialise();
    this.getdoctor();
  }

  // defining selected doctor
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

//get doctor
getdoctor()
  {
    this.doctorService.getDoctor(this.data.doctorID).subscribe((res)=>{
    this.doctorService.selecteddoctor=res as Doctor;
    if(this.doctorService.selecteddoctor.location==undefined)
    this.doctorService.selecteddoctor.location={
      longitude:7.809007,
      latitude:51.678418
    }
    
    })
  }

}
