import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SendPrescriptionComponent} from '../send-prescription/send-prescription.component'
import { from } from 'rxjs';
import { DoctorService} from '../shared/doctor.service';
import { AuthService } from 'src/app/Homepage/auth.service';
import { appointment} from '../../Customer/appointment';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  animal: string;
  name: string;
  userID:string;
  no:number=0;
  appointments: appointment[];
  table:table[];
  newtable:table;
  displayedColumns: string[] = ['Patient', 'Date', 'Time','prescription'];
  dataSource ;
  customer:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,private doctorService : DoctorService , private authService: AuthService) { }

  ngOnInit() {
    this.table=[];
    this.userID=this.authService.getUserID();
    this.getappointments();
    // this.add();
    
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // send prescription
  openDialog(customerID:string , doctorID:string, appid:string): void {
    const dialogRef = this.dialog.open(SendPrescriptionComponent, {
      data: {customerID: customerID, doctorID: doctorID, appID:appid}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  // get all appointments
  getappointments()
  {
    this.doctorService.getappoinments(this.userID).subscribe((res)=>{
      this.appointments=res as appointment[];
      console.log(this.appointments);
      this.dataSource=new MatTableDataSource<appointment>(this.appointments);
      this.dataSource.paginator = this.paginator;
      
    });
  }
 
 
}

// table interface
export interface table {
 no:number;
 name:string;
 time:string;
 date:string;
 customerID:string;
 doctorID: string;
}

