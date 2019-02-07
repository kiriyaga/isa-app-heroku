import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { matchOtherValidator } from 'src/app/register/matchPasswords';
import { ProfileService } from '../services/profile.service';
import { ToastService } from '../services/toast.service';
import { AuthenticationService } from '../services/authentication.service'
import { UserModule } from '../avio-company/user/user.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthenticationService]
})
export class ProfileComponent implements OnInit {
  isLogin = this.authenticationService.checkSessionUser();
  user: UserModule;
  errorMessage: string;

  basicForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl(''),
    adress: new FormControl('')
  });
  passwordForm = new FormGroup({
    cpassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, matchOtherValidator('password')])
  });

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router, private profileService: ProfileService, private toastService: ToastService) { }

  saveBasic() {
    if (this.basicForm.invalid) {
      return;
    }

    this.clearBasicErrors();
    //poziv servica
    this.profileService.basicEdit(this.lastName.value, this.firstName.value, this.email.value, this.telephone.value, this.adress.value).subscribe(
      data => {
        localStorage.setItem('sessionUser', JSON.stringify(data));
        this.toastService.showSuccess("Succesfuly changed informations!", "4Flights");
      },
      error => {
        this.errorMessage = error;
        if (error.includes('First name')) {
          this.firstName.setErrors({ 'firstNameError': error });
        } else if (error.includes('Last name')) {
          this.lastName.setErrors({ 'lastNameError': error });
        } else {
          this.email.setErrors({ 'emailError': error });
        }
      })
  }

  savePassword() {
    if (this.passwordForm.invalid) {
      return;
    }

    this.clearPasswordForm();

    this.profileService.passwordEdit(this.cpassword.value, this.password.value, this.confirmPassword.value).subscribe(
      data => {
        localStorage.setItem('sessionUser', JSON.stringify(data));
        location.reload(true);
        this.toastService.showSuccess("Succesfuly changed password!", "4Flights");
        //this.router.navigate(['/profile']);
      },
      error => {
        this.errorMessage = error;
        if (error.includes('Password')) {
          this.password.setErrors({ 'passwordError': error });
        } else if (error.includes('Current password')) {
          this.cpassword.setErrors({ 'currentPasswordError': error });
        } else if (error.includes('Re-password')) {
          this.confirmPassword.setErrors({ 'confirmPasswordError': error });
        }
      })
  }

  ngOnInit() {
    this.setCurrentFieldValues();
  }

  private setCurrentFieldValues() {
    if (this.isLogin) {
      this.user = this.authenticationService.getSessionUser();
      if (this.user != null) {
        this.firstName.setValue(this.user.name);
        this.lastName.setValue(this.user.lastName);
        this.email.setValue(this.user.email);
        this.telephone.setValue(this.user.telephone);
        this.adress.setValue(this.user.adress);
        
      }
    }
  }

  private clearBasicErrors() {
    this.firstName.setErrors({ 'firstNameError': null });
    this.firstName.updateValueAndValidity();
    this.lastName.setErrors({ 'lastNameError': null });
    this.lastName.updateValueAndValidity();
    this.email.setErrors({ 'emailError': null });
    this.email.updateValueAndValidity();
  }

  private clearPasswordForm() {
    this.cpassword.setErrors({ 'cpasswordError': null });
    this.cpassword.updateValueAndValidity();
    this.password.setErrors({ 'passwordError': null });
    this.password.updateValueAndValidity();
    this.confirmPassword.setErrors({ 'confirmPasswordError': null });
    this.confirmPassword.updateValueAndValidity();
  }

  get firstName() {
    return this.basicForm.get('firstName')
  }
  get lastName() {
    return this.basicForm.get('lastName')
  }
  get email() {
    return this.basicForm.get('email')
  }
  get telephone() {
    return this.basicForm.get('telephone')
  }
  get adress() {
    return this.basicForm.get('adress')
  }

  get cpassword() {
    return this.passwordForm.get('cpassword')
  }
  get password() {
    return this.passwordForm.get('password')
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword')
  }

}
