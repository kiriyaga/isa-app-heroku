import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomModule } from '../room/room.module';
import { AdditionalServiceModule } from '../additional-services/additional-services.module';
import { UserModule } from '../user/user.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class HotelFastReservationModule {

    constructor() { }

    checkInDate: Date;
    checkOutDate: Date;
    room: RoomModule;
    additionalServices: Array<AdditionalServiceModule> = new Array<AdditionalServiceModule>();

}