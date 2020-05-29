import { Injectable } from '@angular/core';
import { CustomerCreateData } from './CustomerCreateData';
import { HttpClient } from '@angular/common/http';
import {appointment} from'./appointment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerData: CustomerCreateData;

  constructor(private http: HttpClient) { }

  //create customer profile
  createCustomerProfile(
    customerid: string,
    firstName: string,
    lastName: string,
    emailID: string,
    tou: string,
    phoneNumber: string,
    address: string,
    dob: string,
    bloodGroup: string,
    fmh: string,
    maritalStatus: string,
    voluntary: string,
    gender: string,
    ifm: string
  ) {
    const customer: CustomerCreateData = {
      firstname: firstName,
      lastname: lastName,
      email: emailID,
      typeofUser: tou,
      phonenumber: phoneNumber,
      address: address,
      dob: dob,
      bloodGroup: bloodGroup,
      fmh: fmh,
      maritalStatus: maritalStatus,
      voluntary: voluntary,
      gender: gender,
      ifm: ifm
    };
    this.http
      .put('http://localhost:3000/customer/' + customerid, customer)
      .subscribe(response => {
        console.log('success');
        console.log(response);
      });
  }

  //get customer 
  getCustomerData(customerid: string) {
      return this.http.get<{customer: CustomerCreateData}>('http://localhost:3000/customer/' + customerid)
      .pipe(map((result) => {
          return{
            firstname: result.customer.firstname,
            lastname: result.customer.lastname,
            email: result.customer.email,
            typeofUser: result.customer.typeofUser,
            phonenumber: result.customer.phonenumber,
            address: result.customer.address,
            dob: result.customer.dob,
            bloodGroup: result.customer.bloodGroup,
            fmh: result.customer.fmh,
            maritalStatus: result.customer.maritalStatus,
            voluntary: result.customer.voluntary,
            ifm: result.customer.ifm,
            gender: result.customer.gender
          };
    }));
  }

  //get doctor through speciality
  getDoctor(speciality: string) {
     return this.http.get('http://localhost:3000/doctor/sp/' + speciality);
  }

 // check appointment
  getappointment(time:number, date:string , doctor:string)
  {
    return this.http.get('http://localhost:3000/appointment/time/' + time +'/date/' + date+'/doctor/' + doctor);
  }

  //post appointment
  postappointment(app:any)
  {
     return this.http.post('http://localhost:3000/appointment/',app);
  }
  
  // get appointnment for particular customer 
  getappoinments(_id:string)
  {
    return this.http.get('http://localhost:3000/appointment/cust'+`/${_id}`);
  }

  //get appointment through id 
  getoneapp(_id:string)
  {
    return this.http.get('http://localhost:3000/appointment/one'+`/${_id}`);
  }

  // send mail
  mail(time:string, dname:string , date:string)
  {
    return this.http.get('http://localhost:3000/email/'+ time + '/dname/' + dname + '/date/'+date);
  }


}

