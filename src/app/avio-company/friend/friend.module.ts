import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FriendModule { 

  id:number;
  friendOne: UserModule;
  friendTwo: UserModule;
  firendshipStatus : UserModule;
  owner: UserModule;
  
}
