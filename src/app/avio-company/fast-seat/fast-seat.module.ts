import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatModule } from '../seat/seat.module';
import { FlightModule } from '../flight/flight.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FastSeatModule { 

  seat:SeatModule;
  flight:FlightModule;
}
