import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModule } from '../company/company.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RoomModule { 
  
  constructor() {}
  
  id: number;
  floor: number;
  number: number;
  numberOfBeds: number;
  nextMonthPrice: number;
  nextThreeMonthPrice: number;
  nextHalfYearPrice: number;
  rate: number;
  rateCount: number;
  hotelCompany: CompanyModule;
  fastReserve: boolean;
  
}