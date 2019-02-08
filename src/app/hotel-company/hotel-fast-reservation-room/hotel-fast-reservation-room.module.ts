import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModule } from '../room/room.module';
import { AdditionalServiceModule } from '../additional-services/additional-services.module';
import { UserModule } from '../user/user.module';
import { HotelFastReservationModule } from '../hotel-fast-reservation/hotel-fast-reservation.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class HotelFastReservationRoomModule {

    constructor() { }

    room: RoomModule;
    hfro: HotelFastReservationModule;

}