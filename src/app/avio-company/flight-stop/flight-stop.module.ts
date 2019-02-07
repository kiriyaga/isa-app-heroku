import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationModule } from '../location/location.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FlightStopModule {
  id: number;
  takeOff: Date;
  time:String;
  location: LocationModule;
 }
