import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/public/login', {
      username, password
    }).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('sessionUser', JSON.stringify(user));
      }
      return user;
    }
    ));
  }

  register(name: string, lastname: string, email: string, username: string, password: string, rePassword) {
    return this.http.post<any>(environment.apiUrl + '/public/register', {
      username, password, lastname, email, rePassword, name
    }).pipe(map(message => {
      return message;
    }
    ));
  }

  logout() {
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('order');
  }

  checkSessionUser() {
    let sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (sessionUser && sessionUser.token) {
      return true;
    }

    return false;
  }

  getSessionUser() {
    let sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (sessionUser) {
      return sessionUser;
    }

    return null;
  }
}
