import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomerService } from '../customer.service';
import { AuthService } from '../../Homepage/auth.service';
import { NgForm } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { CustomerCreateData } from '../CustomerCreateData';

export interface MaritalStatus {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  customerData$: CustomerCreateData;
  userID: string;
  maritalStatus: MaritalStatus[] = [
    {value: 'single', viewValue: 'Single'},
    {value: 'married', viewValue: 'Married'},
    {value: 'divorced', viewValue: 'Divorced/Separated'}
  ];
  selected: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private customerService: CustomerService, private authService: AuthService) { }

  ngOnInit() {
    //first form 
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required]
    });
    //second form
    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      fmh: ['', Validators.required],
      ifm: ['', Validators.required],
      voluntary: ['', Validators.required]
    });
    
    this.userID = this.authService.getUserID();

    //defining doctor
    this.customerData$={
      firstname:"",
      lastname:"",
      email:"",
      typeofUser:"",
      phonenumber:"",
      address:"",
      dob:"",
      bloodGroup:"",
      fmh:"",
      maritalStatus:"",
      voluntary:"",
      gender:"",
      ifm:"",
    }
    console.log(this.userID);
    this.customerService.getCustomerData(this.userID)
    .subscribe(arg => this.customerData$ = arg );
    console.log(this.customerData$);
  }

  finalFormSubmit(stepper: NgForm) {
    if (stepper.invalid) {
      return;
    }
    //update customer profile
    this.customerService.createCustomerProfile(
      this.userID,
      this.customerData$.firstname,
      this.customerData$.lastname,
      this.customerData$.email,
      this.customerData$.typeofUser,
      this.customerData$.phonenumber,
      this.customerData$.address,
      this.customerData$.dob,
      this.customerData$.bloodGroup,
      this.customerData$.fmh,
      this.customerData$.maritalStatus,
      this.customerData$.voluntary,
      this.customerData$.gender,
      this.customerData$.ifm);
  }


}
