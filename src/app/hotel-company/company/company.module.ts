import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModule } from '../room/room.module';
import { LocationModule } from '../location/location.module';
import { AdditionalServiceModule } from '../additional-services/additional-services.module';

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

  location: LocationModule;

  rate: number;

  rateCount: number;

  rooms: Array<RoomModule>

  additionalServices: Array<AdditionalServiceModule>
  
 }