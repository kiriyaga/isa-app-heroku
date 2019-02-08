import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LocationModule } from '../../hotel-company/location/location.module';
import { AdminCompanyDTO } from '../../profile/admin-company-dto/admin-company-dto.module';
import { ProfileService } from '../../services/profile.service';
import { CompanyAdminDTO } from '../company-admin-dto.module';

@Component({
  selector: 'app-system-admin-options',
  templateUrl: './system-admin-options.component.html',
  styleUrls: ['./system-admin-options.component.css']
})
export class SystemAdminOptionsComponent implements OnInit {

  editDestForm = new FormGroup({
    code: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required),
  });

  basicForm = new FormGroup({
    name: new FormControl('', Validators.required),
    locationID: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  addCompanyAdminForm = new FormGroup({
    companyID: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  setDiscountForm = new FormGroup({
    discount: new FormControl('', Validators.required)
  })

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router, private profileService: ProfileService) { }

  ngOnInit() { }


  public addLocation() {

    var location: LocationModule;
    location = this.editDestForm.value;
    this.profileService.addLocation(location).subscribe(

      data => {
        alert("Success! Location has been added.")
      },
      error => {
        alert("error")
      }
    )

  }

  public addCompany() {

    let adminCompanyDto = new AdminCompanyDTO();
    adminCompanyDto.locationID = this.LocationID;
    adminCompanyDto.name = this.Name;
    adminCompanyDto.type = this.Type;

    this.profileService.addCompany(adminCompanyDto).subscribe(

      data => {
        alert("Success! Company has been added.")
      },
      error => {
        alert("error")
      } 
    )
  }

  public addCompanyAdmin() {
    let companyAdminDto = new CompanyAdminDTO();
    companyAdminDto.companyID = this.companyID;
    companyAdminDto.name = this.firstName;
    companyAdminDto.lastname = this.lastName;
    companyAdminDto.username = this.username;
    companyAdminDto.email = this.email;
    companyAdminDto.password = this.password;
    companyAdminDto.repassword = this.confirmPassword;

    this.profileService.addCompanyAdmin(companyAdminDto).subscribe(

      data => {
        alert("Success! Company admin has been added.")
      },
      error => {
        alert("error")
      } 
    )


  }

  public setDiscount() {
    alert("Success! Discount has been modified.")

  }

  // basic info getters 
  get Name() { return this.basicForm.get('name').value }
  get LocationID() { return this.basicForm.get('locationID').value }
  get Type() { return this.basicForm.get('type').value }
  // location getters
  get EditAdress() { return this.editDestForm.get('adress').value }
  get EditCode() { return this.editDestForm.get('code').value }
  get EditLat() { return this.editDestForm.get('lat').value }
  get EditLng() { return this.editDestForm.get('lng').value }
  // companty admin getters companyID
  get companyID() { return this.addCompanyAdminForm.get('companyID').value }
  get firstName() { return this.addCompanyAdminForm.get('firstName').value }
  get lastName() { return this.addCompanyAdminForm.get('lastName').value }
  get email() { return this.addCompanyAdminForm.get('email').value }
  get username() { return this.addCompanyAdminForm.get('username').value }
  get password() { return this.addCompanyAdminForm.get('password').value }
  get confirmPassword() { return this.addCompanyAdminForm.get('confirmPassword').value }

}
