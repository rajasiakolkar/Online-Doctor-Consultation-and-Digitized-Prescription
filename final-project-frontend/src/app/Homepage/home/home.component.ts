import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  userisAuthenticated = false;
  doctorisAuthenticated = false;
  userID: string;
  private authSub: Subscription;
  private doctorauth: Subscription;
  constructor(private authService: AuthService , public router: Router) {}


  ngOnInit() {
    this.authSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userisAuthenticated = isAuthenticated;
        this.userID = this.authService.getUserID();
    });
    this.doctorauth = this.authService.getDoctorAuthListener().subscribe(isAuthenticated => {
      this.doctorisAuthenticated = isAuthenticated;
      this.userID = this.authService.getUserID();
    });
  }
  
  //logout 
  onLogout() {
    this.authService.logout();
  }

  //destroy
  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.doctorauth.unsubscribe();
  }
}
