import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { matchOtherValidator } from 'src/app/register/matchPasswords';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, matchOtherValidator('password')])
  })
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.clearRegistrationErrors();
    this.authenticationService.register(this.firstName.value, this.lastName.value, this.email.value, 
        this.username.value, this.password.value, this.confirmPassword.value).subscribe(
      data => {
        location.reload(true);
        this.router.navigate(['/home']);
      },
      error => {
        this.errorMessage = error;
        if (error.includes('Password')) {
          this.password.setErrors({ 'passwordError': error });
        } else if (error.includes('Username')) {
          this.username.setErrors({ 'usernameError': error });
        } else if (error.includes('Re-password')) {
          this.confirmPassword.setErrors({ 'confirmPasswordError': error });
        } else if (error.includes('First name')) {
          this.firstName.setErrors({ 'firstNameError': error });
        } else if (error.includes('Last name')) {
          this.lastName.setErrors({ 'lastNameError': error });
        } else if (error.includes('Email')) {
          this.email.setErrors({ 'emailError': error });
        }
      }
    )
  }

  // Metoda za proveru poklapanja password-a
  checkPasswords() {
    let password = this.password.value;
    let confirmPassword = this.confirmPassword.value;

    return password === confirmPassword ? null : { notSame: true }
  }

  private clearRegistrationErrors() {
    this.username.setErrors({ 'usernameError': null });
    this.username.updateValueAndValidity();
    this.password.setErrors({ 'passwordError': null });
    this.password.updateValueAndValidity();
    this.confirmPassword.setErrors({ 'confirmPasswordError': null });
    this.confirmPassword.updateValueAndValidity();
    this.firstName.setErrors({ 'firstNameError': null });
    this.firstName.updateValueAndValidity();
    this.lastName.setErrors({ 'lastNameError': null });
    this.lastName.updateValueAndValidity();
    this.email.setErrors({ 'emailError': null });
    this.email.updateValueAndValidity();
  }


  // Geteri za polja firstName, lastName, username, email, password, repeatPassword
  get firstName() {
    return this.registerForm.get('firstName')
  }
  get lastName() {
    return this.registerForm.get('lastName')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get username() {
    return this.registerForm.get('username')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }
}