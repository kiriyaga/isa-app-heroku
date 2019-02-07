import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { TopNavibarComponent } from '../top-navibar/top-navibar.component';
import { ToastService } from '../services/toast.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  nav: TopNavibarComponent;
  errorMessage: string;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  toaster : ToastrService;

  constructor(private route: ActivatedRoute, private router: Router,
    private authenticationService: AuthenticationService, private toastService: ToastService) { }

  ngOnInit() { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.clearCredentialsErrors();
    this.authenticationService.login(this.username.value, this.password.value).subscribe(
      data => {
        location.reload(true);
        this.router.navigate(['/home']);
        if (data.authority == "SYSADMIN") {
          this.toastService.showSuccess("Where do you what to travel today?", "WELCOME BACK!");
        }
      },
      error => {
        this.errorMessage = error;
        if (error.includes("password")) {
          this.password.setErrors({ 'passwordError': error });
        } else {
          this.username.setErrors({ 'usernameError': error });
        }
      }
    )
  }

  private clearCredentialsErrors() {
    this.username.setErrors({ 'usernameError': null });
    this.username.updateValueAndValidity();
    this.password.setErrors({ 'passwordError': null });
    this.password.updateValueAndValidity();
  }

  // Geteri za polja username i password
  get username() {
    return this.loginForm.get('username')
  }
  get password() {
    return this.loginForm.get('password')
  }

}