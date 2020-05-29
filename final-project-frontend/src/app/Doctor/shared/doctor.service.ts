import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor } from './doctor.model';
import {appointment} from '../../Customer/appointment';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  selecteddoctor : Doctor;
  doctors: Doctor[];
  lat:number;
  readonly appURL='http://localhost:3000/appointment';
  readonly custURL='http://localhost:3000/customer';
  readonly baseURL= 'http://localhost:3000/doctor';
  constructor(private http :HttpClient) { }

  // create doctor
  postDoctor(emp: Doctor)
  {
    return this.http.post(this.baseURL,emp);
  }

  //update doctor
  putDoctor(emp:Doctor)
  {
    return this.http.put(this.baseURL + `/${emp._id}` , emp);
  }

  // get particular doctor 
  getDoctor(_id:string)
  {
     return this.http.get(this.baseURL + `/${_id}` );
  }
 
  // get all appointments
  getappoinments(_id:string)
  {
    return this.http.get(this.appURL+`/${_id}`);
  }

  // get particular customer
  getcustomer(_id:string)
  {
    return this.http.get(this.custURL+ `/${_id}`);
  }
  
  //update appoinment
  updateapp(app:appointment)
  {
    return this.http.put(this.appURL+`/${app._id}` ,app);
  }

  // get appointemnt
  getoneapp(_id:string)
  {
    return this.http.get('http://localhost:3000/appointment/one'+`/${_id}`);
  }
}
