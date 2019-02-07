import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightModule } from '../flight/flight.module';
import { LocationModule } from '../location/location.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CompanyModule {
  name: String;

  id: String;

  promtiveDescription: String;

  rate: number;

  rateCount: number;

  earnings:Array<Earnings>;


  location: LocationModule;

  flights: Array<FlightModule>

  destinations: Array<LocationModule>
 }

 class Earnings{

  constructor(){}

  date:Date;
  money:number;
 }