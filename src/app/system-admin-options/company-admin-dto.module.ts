import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CompanyAdminDTO {


  companyID: String;

  name: String;

  lastname: String;

  username: String;

  email: String;

  password: String;

  repassword: String;

 }