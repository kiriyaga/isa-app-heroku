import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserModule } from '../avio-company/user/user.module';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeGuardService {
  private sessionUser:UserModule
  constructor(private router: Router) { }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
    this.sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (this.sessionUser != null){
     if (this.sessionUser.authority=="AVIOADMIN" || this.sessionUser.authority=="HOTELADMIN" || this.sessionUser.authority=="RENTACARADMIN") {
        if(this.sessionUser.firstLogin==true){
        
          // not logged in so redirect to login page with the return url
           this.router.navigate(['/profile'], { queryParams: { returnUrl: state.url }});
          return false;
        }
       
    }
  }
  return true;


}

}
