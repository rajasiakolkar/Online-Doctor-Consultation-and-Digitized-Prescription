import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { from } from 'rxjs';
import { AuthService } from 'src/app/Homepage/auth.service';
import {appointment} from '../appointment'
import { CustomerService} from '../customer.service';
import { DoctorService} from '../../Doctor/shared/doctor.service';
import {Doctor} from '../../Doctor/shared/doctor.model';
import {SeeLocationComponent} from '../see-location/see-location.component';
import * as jsPDF from 'jspdf';
import { CustomerCreateData } from '../CustomerCreateData';
 


@Component({
  selector: 'app-customer-appointments',
  templateUrl: './customer-appointments.component.html',
  styleUrls: ['./customer-appointments.component.scss']
})
export class CustomerAppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['Patient', 'Date', 'Time','location','prescription'];
  animal: string;
  userID:string;
  appointments: appointment[];
  dataSource ;
  app:appointment;
  customer:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,private authService: AuthService ,private doctorService:DoctorService ,private customersevice:CustomerService) { }
  
  ngOnInit() {
    this.userID=this.authService.getUserID();
    this.getappointments();
    // defining slecteddoctor
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

// get all appointments
  getappointments()
  {
    this.customersevice.getappoinments(this.userID).subscribe((res)=>{
      this.appointments=res as appointment[];
      console.log(this.appointments);
      this.dataSource=new MatTableDataSource<appointment>(this.appointments);
      this.dataSource.paginator = this.paginator;
      
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //see location dioalog
  openDialog(customerID:string , doctorID:string): void {
    const dialogRef = this.dialog.open(SeeLocationComponent, {
      data: {customerID: customerID, doctorID: doctorID}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
  
// open prescription pdf
  openpdf(id:string){
    this.customersevice.getoneapp(id).subscribe((res)=>{
    this.app=res as appointment;
    this.doctorService.getDoctor(this.app.doctorID).subscribe((res)=>{
    this.doctorService.selecteddoctor=res as Doctor;
    })
    this.doctorService.getcustomer(this.app.customerID).subscribe((res)=>{
    this.customer=res ;
    
    const doc= new jsPDF();
    doc.setFontSize(23).setFontType("bold");
    doc.text('Clinic Name :'+this.doctorService.selecteddoctor.clinicname,60, 30);
    doc.setFontSize(20).setFontType("bold");
    doc.text('Doctor Name :'+this.doctorService.selecteddoctor.firstname+ ' '+ this.doctorService.selecteddoctor.lastname, 60, 40);
    doc.setFontSize(16);
    doc.text('Address :'+ this.doctorService.selecteddoctor.clinicaddress, 80, 50);
    doc.text('Contact : '+this.doctorService.selecteddoctor.phonenumber , 80, 60);
    doc.text('Patient Name :'+ this.customer.customer.firstname, 10, 90);
    doc.text('Patient DOB : '+ this.customer.customer.dob , 140, 90);
    doc.text('Patient Gender : '+this.customer.customer.gender , 10,  100);
    doc.text('Date : '+this.app.appointment_date , 140, 100);
    doc.setFontSize(18).setFontType("");
    doc.text( this.app.prescription,20,130);
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));

    })
    })
    
  }

  
    
     
  
}
