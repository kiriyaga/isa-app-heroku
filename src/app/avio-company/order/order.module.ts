import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatModule } from '../seat/seat.module';
import { FlightModule } from '../flight/flight.module';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OrderModule {

  constructor(){
  }

  seats:Array<SeatModule>;
  flight:FlightModule;
  mode:String;
  company:CompanyModule;
  friends:Array<UserModule>;
  owner:UserModule; 
  fastReserve:boolean;
  landing:Date; 
 }
