import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-login-create',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginCreateComponent implements OnInit {
  isLoading = false;
  labelPosition = 'customer';
  isSuccess = false;
  isNotAuthenticated = false;
  userNotFound = false;
  constructor(public userCreate: AuthService) {}

  // create user 
  onCreate(createForm: NgForm) {
    if (createForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userCreate.createUser(
              createForm.value.firstName,
              createForm.value.lastName,
              createForm.value.email,
              createForm.value.password,
              this.labelPosition,
              createForm.value.createTel
            );
    createForm.resetForm();
    this.isLoading = false;
    this.isSuccess = true;
    }

    //login
  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userCreate.login(loginForm.value.email, loginForm.value.password).subscribe(response => {
      console.log(response);
    });
    this.isLoading = false;
    this.isNotAuthenticated = false;
    this.userNotFound = false;
  }
  //reset login form
  resetLoginForm(loginForm: NgForm) {
    loginForm.resetForm();
  }
  // reset create form
  resetCreateForm(createForm: NgForm) {
    createForm.resetForm();
  }
  closeMessage() {
    this.isSuccess = false;
    this.isNotAuthenticated = false;
    this.userNotFound = false;
  }
  ngOnInit() {
  this.isNotAuthenticated = this.userCreate.getAuthenticationStatus();
  this.userNotFound = this.userCreate.getUserNotFoundStatus();
  }
}
