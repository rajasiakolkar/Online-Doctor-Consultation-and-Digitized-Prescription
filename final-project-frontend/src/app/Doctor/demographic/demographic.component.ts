import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DoctorService} from '../shared/doctor.service';
import {Doctor} from '../shared/doctor.model';
import { XhrFactory, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/Homepage/auth.service';
import {MatSnackBar} from '@angular/material';

export interface Food {
  value: string;
  viewValue: string;
}
declare var M :any;

@Component({
  selector: 'app-demographic',
  templateUrl: './demographic.component.html',
  styleUrls: ['./demographic.component.scss'],
  providers:[DoctorService]
})
export class DemographicComponent implements OnInit ,AfterViewChecked {
  image:any;
  imageToShow: any;
  random:any;
  userID: string;
  selectedFile: File = null;
  fd = new FormData();
  readonly baseURL= 'http://localhost:3000/doctor/images';
  foods: Food[] = [
    {value: 'General Physician', viewValue: 'General Physician'},
    {value: 'Cardiologists',     viewValue: 'Cardiologists'},
    {value: 'Dermatologists',    viewValue: 'Dermatologists '}
  ];
  constructor(private snackBar: MatSnackBar,private doctorService : DoctorService, private http:HttpClient,  private authService: AuthService) {}
  ngAfterViewChecked()
  {
    
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

  //update informtaion
  onSubmit (form :NgForm)
  {
    this.doctorService.putDoctor(this.doctorService.selecteddoctor).subscribe((res)=>{ 
   });
   
   this.uploadimage();
   this.snackBar.open("details updated", "OK", {
    duration: 2000,
  });


   
  }

  // get particular doctor
  getdoctor()
  {
    this.doctorService.getDoctor(this.userID).subscribe((res)=>{
    this.doctorService.selecteddoctor=res as Doctor;
    this.getimage();
    
    });
    
  }
   
  // show image
  onchange(event)
  {
    this.selectedFile = <File>event.target.files[0];
    console.log(event.target.files[0].name);
    
    var reader  = new FileReader();

       reader.onloadend = () => {
          this.imageToShow  = reader.result;
          this.random= Math.random()+this.selectedFile.name;
          this.doctorService.selecteddoctor.image=this.random;
          //this.doctorService.selecteddoctor.image=this.imageToShow
       }

       if (this.selectedFile) {
           reader.readAsDataURL(this.selectedFile); //reads the data as a URL
       } else {
           this.imageToShow = "";
       }
       
  }

  //save image
  uploadimage()
  {
  
    this.fd.append('file', this.selectedFile,  this.random);
    
    this.http.post(this.baseURL, this.fd, {responseType: 'text'})
    .subscribe( (res) => {
    });

    
  
  }

  //create image
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 //image of doctor
 getimage()
 {
   if(this.doctorService.selecteddoctor.image==undefined)
   {
    this.http.get('http://localhost:3000/img/dummy.png',{responseType: 'blob'}).subscribe((res) => {
      console.log(res);
    this.createImageFromBlob(res);
  
     });
   }
   else{
  this.http.get('http://localhost:3000/img/'+this.doctorService.selecteddoctor.image,{responseType: 'blob'}).subscribe((res) => {
    console.log(res);
  this.createImageFromBlob(res);

   });
 }
}

  
 
}
