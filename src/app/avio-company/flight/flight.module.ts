import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightStopModule } from '../flight-stop/flight-stop.module';
import { CompanyModule } from '../company/company.module';
import { SeatModule } from '../seat/seat.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FlightModule { 
  constructor(){
  }
  id: number;
  rate: number;
  rateCount: number;
  flightStop: Array<FlightStopModule>;
  avioCompany: CompanyModule;
  seats: Array<SeatModule>;
	priceForTicket:number;
	additionalPriceCarryBag:number;
  additionalPriceCheckBag:number;
  maxCheckBag:number;
  maxCarryBag:number;
  startDestination: FlightStopModule;
  endDestination: FlightStopModule;
  travelTime: String;
  travelDistance: String;
}
