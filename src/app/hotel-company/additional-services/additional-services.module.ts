import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModule } from '../company/company.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
})
export class AdditionalServiceModule {

    id: number;
    price: number;
    additionalServiceType: String;
    hotelCompany: CompanyModule

    constructor() { }
}

export enum HotelAdditionalServiceEnum {

    TRANSPORT_FROM_AIRPORT,
    TRANSPORT_TO_AIRPORT,
    PARKING,
    SWIMMING_POOL,
    RESTAURANT,
    ROOM_SERVICE,
    WELLNESS,
    SPA_CENTER,
    WIFI
}