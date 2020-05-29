import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authService.getIsCustomerAuth();
    const isdocAuth = this.authService.getisDoctorAuthenticated();
    if (!isAuth && !isdocAuth) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
