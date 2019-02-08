import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserModule } from '../avio-company/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class SystemAdminGuardService {
  private sessionUser: UserModule

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (this.sessionUser != null && this.sessionUser.authority == "SYSADMIN") {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}