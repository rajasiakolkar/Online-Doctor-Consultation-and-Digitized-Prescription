import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../Homepage/auth.service';
import { Subscription } from 'rxjs';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl, NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { DoctorService } from '../../Doctor/shared/doctor.service';
import { Doctor } from '../../Doctor/shared/doctor.model';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import {appointment} from '../appointment';
import { CustomerData } from 'src/app/Homepage/CustomerData';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfirmAppointmentComponent} from '../confirm-appointment/confirm-appointment.component';
import { Email } from '@coolgk/email';

export interface time {
  value: string;
  no:number;
}
export interface Specialization {
  name: string;
}
export interface timeno{
  from:number;
  to:number;
}
@Component({
  selector: 'app-customer-homepage',
  templateUrl: './customer-homepage.component.html',
  styleUrls: ['./customer-homepage.component.scss']
})
export class CustomerHomepageComponent implements OnInit, OnDestroy {
  timing:time[];
  customer:CustomerData;
  app:appointment;
  myControl = new FormControl();
  userisAuthenticated = false;
  userID: string;
  animal: string;
  private authSub: Subscription;
  searchData: Specialization;
  //today date
  today = new Date() ;
  currentDate = new Date().setDate(this.today.getDate()) 
  tdd = this.today.getDate();
  tmm = this.today.getMonth()+1;
  tyyyy = this.today.getFullYear();
  stoday = this.tdd+'-'+this.tmm+'-'+this.tyyyy;
  currentDay= this.today.getDay() %7;
  currenttime:timeno;
  // next day date
  secondDate = new Date().setDate(this.today.getDate() + 1);
  sd= new Date(this.secondDate);
  sedd = this.sd.getDate();
  semm = this.sd.getMonth()+1;
  seyyyy = this.sd.getFullYear();
  ssecond = this.sedd+'-'+this.semm+'-'+this.seyyyy;
  secondDay  = (this.today.getDay()+1)%7;
  secondtime : timeno;
  // third day date
  thirdDate = new Date().setDate(this.today.getDate() + 2);
  td= new Date(this.thirdDate);
  tedd = this.td.getDate();
  temm = this.td.getMonth()+1;
  teyyyy = this.td.getFullYear();
  sthird = this.tedd+'-'+this.temm+'-'+this.teyyyy;
  thirdDay  =(this.today.getDay()+2)%7;
  thirdtime : timeno;
  custname:string;
 
  //specialization
  options: Specialization[] = [
    {name: 'General Physician'},
    {name: 'Cardiologists'},
    {name: 'Dermatologists'}
  ];
  filteredOptions: Observable<Specialization[]>;

  constructor(private authService: AuthService, private customerService: CustomerService, private data: DoctorService,public dialog: MatDialog) { }

  ngOnInit() {
    
    this.currenttime={
      from:0,
      to:0
    }
    this.secondtime={
      from:0,
      to:0
    }
    this.thirdtime={
      from:0,
      to:0
    }
    this.authSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userisAuthenticated = isAuthenticated;
      this.userID = this.authService.getUserID();
  });
  this.init();
  this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Specialization>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
      this.timing= [
        {value:'No shedule',no:0},{value:'7:00 AM',no:1},{value:'7:15 AM',no:2},{value:'7:30 AM',no:3},{value:'7:45 AM',no:4},
        {value:'8:00 AM',no:5},{value:'8:15 AM',no:6},{value:'8:30 AM',no:7},{value:'8:45 AM',no:8} 
      ];

      
  }
  init() {
    //defining selected doctor
    this.data.selecteddoctor= {
      _id: '',
      doctorID: '',
      email: '',
      password: '',
      phonenumber: '',
      firstname : '',
      lastname : '',
      speciality : '',
      gender :  '',
      image: '',
      degree : '',
      college :  '',
      eoc : '',
      eoy :  '',
      clinicname: '',
      cliniccity: '',
      clinicaddress: '',
      timing: {
        mon:{ from:0,to:0},tue:{ from:0, to:0},wed:{from:0,to:0},thu:{ from:0,to:0},
        fri:{ from:0, to:0},sat:{from:0,to:0},sun:{from:0,to:0}   
      },
      location:{
        longitude:51.678418,
        latitude:7.809007
      },
      fees:0
    };
    console.log(this.currentDate);
  }
  displayFn(user?: Specialization): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Specialization[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  //get doctor
  getDoctorSearch() {
    this.customerService.getDoctor(this.searchData.name).subscribe(response => {
      this.data.doctors = response as Doctor[];
    });

  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  //check avaliablity
  seeavailiablity(slot:number,date:string, doctor:string):void{
    let x:appointment[];
    let y=0;
    this.customerService.getappointment(slot,date,doctor).subscribe((res)=>{
       x= res as appointment[];
       
     });
    
     
  }
  
  //book appointment
  book(d_id:string , timeno:number , timevaue:string , date:string , d_name:string)
  {   
    this.userID=this.authService.getUserID();
     var app1={ 
      customerID:this.userID,
      doctorID:d_id,
      appointment_date:date,
      appointment_time:timeno,
      appointment_value:timevaue,
      customer_name:"puneet",
      doctor_name:d_name,
     }
     
     this.customerService.postappointment(app1).subscribe((res)=>{
        console.log(res);
     });
  }

  see()
  {
    console.log("se");
  }
 
  // confirm appointment
  openDialog(d_id:string , timeno:number , timevaue:string , date:string , d_name:string): void {
    
    if(timeno==0) return;
    let x:appointment[];
    this.customerService.getappointment(timeno,date,d_id).subscribe((res)=>{
       x= res as appointment[];
       if(x.length==0){
        const dialogRef = this.dialog.open(ConfirmAppointmentComponent, {
          data: {customerID: 0, doctorID: 1}
         });
         dialogRef.afterClosed().subscribe(result => {
           if(result==0)
           {
             this.book(d_id, timeno , timevaue , date, d_name);
             
             this.customerService.mail(timevaue,d_name,date).subscribe((res)=>{
             
            });
           }
           
         });      
         

       } else {alert("no more availiable");}
     }); 
  }

  
 
}
