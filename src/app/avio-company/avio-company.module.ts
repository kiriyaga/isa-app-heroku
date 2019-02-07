import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class AvioCompanyModule 
{
  id: number;
  takeOff: Date;
  landing: Date;
  travelTime: String;
  travelDistance: String;
  location: Location;
 
}
