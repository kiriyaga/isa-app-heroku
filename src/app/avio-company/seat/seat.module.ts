import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightStopModule } from '../flight-stop/flight-stop.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class SeatModule { 

  constructor(){
   }
  id: number;
  additionalPriceForClass: number;
  seatType: String;
  seatClass: String;
  seatCode: String;
  startDestination: FlightStopModule;
  endDestination: FlightStopModule;
  name:String;
  lastname:String;
  passport:String;
  discount:number;
  priceForTicket:number
  checkBagCount:number;
  carryBagCount:number;
  version:number;
}

export enum SeatTypeEnum{
  RESERVED,
  AVAILABLE,
  NOTACTIVE,
  FASTRESERVE  
}

export enum SeatClassEnum{
  ECONOMIC,
  BUSINESS,
  FIRSTCLASS
}
  
