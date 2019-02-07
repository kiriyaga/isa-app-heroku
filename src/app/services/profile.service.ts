import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map, first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private router: Router) { }

  basicEdit(lastName: string, name: string, email: string, telephone: string, adress: string) {
    return this.http.post<any>(environment.apiUrl + '/auth/profile/basicEdit', {
      name, lastName, email, telephone, adress
    }).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('sessionUser', JSON.stringify(user));
        return user;
      }

    }
    ));
  }

  passwordEdit(currentPassword: string, password: string, rePassword: string) {
    return this.http.post<any>(environment.apiUrl + '/auth/profile/passwordEdit', {
      currentPassword, password, rePassword
    }).pipe(map(user => {
      if (user && user.token) {
        return user;
      }

    }
    ));
  }

}
