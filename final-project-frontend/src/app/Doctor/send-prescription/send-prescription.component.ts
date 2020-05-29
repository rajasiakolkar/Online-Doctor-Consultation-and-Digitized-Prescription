import { Component, OnInit ,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DoctorService} from '../shared/doctor.service';
import { Doctor } from '../shared/doctor.model';

import { appointment} from '../../Customer/appointment';



export interface DialogData {
  customerID: string;
  doctorID: string;
  appID:string;
}
interface customer {
  firstname:string;
  lastname:string;
  gender:string;
  dob:string;
}
@Component({
  selector: 'app-send-prescription',
  templateUrl: './send-prescription.component.html',
  styleUrls: ['./send-prescription.component.scss']
})
export class SendPrescriptionComponent implements OnInit {
 customer:any;
   
 app:appointment;
 today: number = Date.now();
 pdfMake:any;
  constructor(private doctorService : DoctorService,
    public dialogRef: MatDialogRef<SendPrescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.intialisedoctor();
    this.getdoctor();
    this.getcustomer();
    this.getapp();
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  //defining selected doctor
  intialisedoctor()
  {
    this.app={
      _id:"",
      doctorID:"",
      customerID:"",
      appointment_date:"",
      appointment_time:0,
      appointment_value:"",
      prescription:"",
      customer_name:"",
      doctor_name:""

    }
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
    
    this.customer={customer:{
      firstname:"",
      lastname:"",
      gender:"",
      dob:"",
    }
    }
    
    
  }
  //get selected doctor
  getdoctor()
  {
    this.doctorService.getDoctor(this.data.doctorID).subscribe((res)=>{
      this.doctorService.selecteddoctor=res as Doctor;
      console.log(res);
      console.log(this.doctorService.selecteddoctor);
    })
  }

  //get particular customer
  getcustomer()
  {
    this.doctorService.getcustomer(this.data.customerID).subscribe((res)=>{
       
       this.customer=res ;
      //   console.log(this.customer);
      //  if(this.customer.gender==undefined)this.customer.gender="";
      //  if(this.customer.dob==undefined)this.customer.dob="";
       
    })
  }

  //update appointment
  updateapp()
  {
    this.doctorService.updateapp(this.app).subscribe((res)=>{
      console.log(res);
    })
  }

  //get appointment
  getapp()
  {
    this.doctorService.getoneapp(this.data.appID).subscribe((res)=>{
      this.app=res as appointment;
      console.log(this.app);
      
    })
  }

 
  

}

