import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightModule } from '../flight/flight.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FlightsModule {

  company:string;
  flight:FlightModule;
 }
