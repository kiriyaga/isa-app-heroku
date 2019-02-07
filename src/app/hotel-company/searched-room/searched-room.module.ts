import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModule } from '../room/room.module';
import { CompanyModule } from '../company/company.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SearchedRoomModule {

  hotelCompany: CompanyModule;
  room: RoomModule;
 }