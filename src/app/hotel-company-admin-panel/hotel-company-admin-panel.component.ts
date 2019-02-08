import { Component, OnInit } from '@angular/core';
import { HotelCompanyService } from '../services/hotel-company.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyModule } from '../hotel-company/company/company.module';
import { LocationModule } from '../avio-company/location/location.module';
import { RoomModule } from '../hotel-company/room/room.module';
import { AdditionalServiceModule } from '../hotel-company/additional-services/additional-services.module';
import { HotelFastReservationModule } from '../hotel-company/hotel-fast-reservation/hotel-fast-reservation.module';

@Component({
  selector: 'app-hotel-company-admin-panel',
  templateUrl: './hotel-company-admin-panel.component.html',
  styleUrls: ['./hotel-company-admin-panel.component.css']
})
export class HotelCompanyAdminPanelComponent implements OnInit {

  company: CompanyModule;
  rate: number;
  roomId: any;
  data: Object;
  frRoom : RoomModule;
  earnings:number = 0;

  // fast-reserve boolean
  frTransportFromAirportBool: boolean;
  frTransportToAirportBool: boolean;
  frParkingBool: boolean;
  frSwimmingPoolBool: boolean;
  frRestaurantBool: boolean;
  frRoomServiceBool: boolean;
  frWellnessBool: boolean;
  frSpaCenterBool: boolean;
  frWifiBool: boolean;
  // additional-services boolean
  transportFromAirportBool: boolean;
  transportToAirportBool: boolean;
  parkingBool: boolean;
  swimmingPoolBool: boolean;
  restaurantBool: boolean;
  roomServiceBool: boolean;
  wellnessBool: boolean;
  spaCenterBool: boolean;
  wifiBool: boolean;


  earningsForm = new FormGroup({
    earnings1: new FormControl(new Date(), Validators.required),
    earnings2: new FormControl(new Date(), Validators.required),
  });

  basicForm = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    promotiveDescription: new FormControl('', Validators.required),
  });

  editDestForm = new FormGroup({
    code: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required),
  });

  addRoomForm = new FormGroup({
    numberOfBeds: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    nextMonthPrice: new FormControl('', Validators.required),
    nextThreeMonthPrice: new FormControl('', Validators.required),
    nextHalfYearPrice: new FormControl('', Validators.required),
    fastReserve: new FormControl('')
  });

  editRoomForm = new FormGroup({
    numberOfBeds: new FormControl('', Validators.required),
    floor: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    nextMonthPrice: new FormControl('', Validators.required),
    nextThreeMonthPrice: new FormControl('', Validators.required),
    nextHalfYearPrice: new FormControl('', Validators.required),
    fastReserve: new FormControl('')
  });

  addAdditionalServicesForm = new FormGroup({
    // checkbox
    transportFromAirport: new FormControl(''),
    transportToAirport: new FormControl(''),
    parking: new FormControl(''),
    swimmingPool: new FormControl(''),
    restaurant: new FormControl(''),
    roomService: new FormControl(''),
    wellness: new FormControl(''),
    spaCenter: new FormControl(''),
    wifi: new FormControl(''),
    // price fields
    transportFromAirportPrice: new FormControl('', Validators.required),
    transportToAirportPrice: new FormControl('', Validators.required),
    parkingPrice: new FormControl('', Validators.required),
    swimmingPoolPrice: new FormControl('', Validators.required),
    restaurantPrice: new FormControl('', Validators.required),
    roomServicePrice: new FormControl('', Validators.required),
    wellnessPrice: new FormControl('', Validators.required),
    spaCenterPrice: new FormControl('', Validators.required),
    wifiPrice: new FormControl('', Validators.required)
  });

  roomFastReservationConfigForm = new FormGroup({
    checkInDate: new FormControl(new Date(), Validators.required),
    checkOutDate: new FormControl(new Date(), Validators.required),
    transportFromAirport: new FormControl(''),
    transportToAirport: new FormControl(''),
    parking: new FormControl(''),
    swimmingPool: new FormControl(''),
    restaurant: new FormControl(''),
    roomService: new FormControl(''),
    wellness: new FormControl(''),
    spaCenter: new FormControl(''),
    wifi: new FormControl('')
  });

  constructor(private hotelService: HotelCompanyService, private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.hotelService.getCompanyFromUser().subscribe(
      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        //this.getGraph();
        this.setCurrentFieldValues();
        this.resetAdditionalServicesBools();
        this.showHotelAdditionalServices();
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )
  }

  GetEarning(){

    this.hotelService.getEarnings(this.company.id,this.earningsForm.get('earnings1').value,this.earningsForm.get('earnings2').value).subscribe(

      data=>{
        this.earnings = data;
      },
      error=>{
        alert("error");
      }
    )

  }


  public getGraph() {
    this.hotelService.getGraph(this.company.id).subscribe(

      data => {
        var nest = {
          data: [
            { "value": data[0] },
            { "value": data[1] },
            { "value": data[2] }
          ]
        };
        this.data = JSON.stringify(nest);
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )
  }

  public addRoomFastReservation() {

    let hotelFastReservation = new HotelFastReservationModule();
    hotelFastReservation.checkInDate = this.roomFastReservationConfigForm.get('checkInDate').value;
    hotelFastReservation.checkOutDate = this.roomFastReservationConfigForm.get('checkOutDate').value;
    hotelFastReservation.room = this.frRoom;

    for (let as of this.company.additionalServices) {
      if (as.additionalServiceType === "TRANSPORT_FROM_AIRPORT" && this.roomFastReservationConfigForm.get('transportFromAirport').value) {
        
        hotelFastReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "TRANSPORT_TO_AIRPORT" && this.roomFastReservationConfigForm.get('transportToAirport').value) {
        
        hotelFastReservation.additionalServices.push(as);
        
      } else if (as.additionalServiceType === "PARKING" && this.roomFastReservationConfigForm.get('parking').value) {
        
        hotelFastReservation.additionalServices.push(as);
        
      } else if (as.additionalServiceType === "SWIMMING_POOL" && this.roomFastReservationConfigForm.get('swimmingPool').value) {
        
        hotelFastReservation.additionalServices.push(as);
        
      } else if (as.additionalServiceType === "RESTAURANT" && this.roomFastReservationConfigForm.get('restaurant').value) {
        
        hotelFastReservation.additionalServices.push(as);
        
      } else if (as.additionalServiceType === "ROOM_SERVICE" && this.roomFastReservationConfigForm.get('roomService').value) {
       
        hotelFastReservation.additionalServices.push(as);
        
      } else if (as.additionalServiceType === "WELLNESS" && this.roomFastReservationConfigForm.get('wellness').value) {
        
        hotelFastReservation.additionalServices.push(as);
        
      } else if (as.additionalServiceType === "SPA_CENTER" && this.roomFastReservationConfigForm.get('spaCenter').value) {
        
        hotelFastReservation.additionalServices.push(as);
        
      } else if (as.additionalServiceType === "WIFI" && this.roomFastReservationConfigForm.get('wifi').value) {
        
        hotelFastReservation.additionalServices.push(as);
        
      }

    }

    this.hotelService.addHotelFastReservation(hotelFastReservation).subscribe(
      data => {
        alert(data.message)
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )

  }

  public fastRoomReservationConfig(room : RoomModule) {
    
    this.frRoom = room;

    this.resetFRBoolean();
    for (let as of this.company.additionalServices) {
      if (as.additionalServiceType === "TRANSPORT_FROM_AIRPORT") {
        this.frTransportFromAirportBool = true;

      } else if (as.additionalServiceType === "TRANSPORT_TO_AIRPORT") {
        this.frTransportToAirportBool = true;
        
      } else if (as.additionalServiceType === "PARKING") {
        this.frParkingBool = true;
        
      } else if (as.additionalServiceType === "SWIMMING_POOL") {
        this.frSwimmingPoolBool = true;
        
      } else if (as.additionalServiceType === "RESTAURANT") {
        this.frRestaurantBool = true;
        
      } else if (as.additionalServiceType === "ROOM_SERVICE") {
        this.frRoomServiceBool = true;
        
      } else if (as.additionalServiceType === "WELLNESS") {
        this.frWellnessBool = true;
        
      } else if (as.additionalServiceType === "SPA_CENTER") {
        this.frSpaCenterBool = true;
        
      } else if (as.additionalServiceType === "WIFI") {
        this.frWifiBool = true;
        
      }

    }

  }

  public updateAdditionalServices() {

    this.resetAdditionalServicesBools()
    var additionalServices = new Array<AdditionalServiceModule>() // inicijalizujemo prazan niz hotelskih usluga

    if (this.addAdditionalServicesForm.get('transportFromAirport').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "TRANSPORT_FROM_AIRPORT";
      additionalService.price = this.addAdditionalServicesForm.get('transportFromAirportPrice').value;

      this.transportFromAirportBool = true;
      additionalServices.push(additionalService);
    } else {
      this.transportFromAirportBool = false;
    }

    if (this.addAdditionalServicesForm.get('transportToAirport').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "TRANSPORT_TO_AIRPORT";
      additionalService.price = this.addAdditionalServicesForm.get('transportToAirportPrice').value;
      this.transportToAirportBool = true;
      additionalServices.push(additionalService);

    } else {
      this.transportToAirportBool = false;
    }

    if (this.addAdditionalServicesForm.get('parking').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "PARKING";
      additionalService.price = this.addAdditionalServicesForm.get('parkingPrice').value;

      this.parkingBool = true;
      additionalServices.push(additionalService);
    } else {
      this.parkingBool = false;
    }

    if (this.addAdditionalServicesForm.get('swimmingPool').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "SWIMMING_POOL";
      additionalService.price = this.addAdditionalServicesForm.get('swimmingPoolPrice').value;

      this.swimmingPoolBool = true;
      additionalServices.push(additionalService);
    } else {
      this.swimmingPoolBool = false;
    }

    if (this.addAdditionalServicesForm.get('restaurant').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "RESTAURANT";
      additionalService.price = this.addAdditionalServicesForm.get('restaurantPrice').value;

      this.restaurantBool = true;
      additionalServices.push(additionalService);
    } else {
      this.restaurantBool = false;
    }

    if (this.addAdditionalServicesForm.get('roomService').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "ROOM_SERVICE";
      additionalService.price = this.addAdditionalServicesForm.get('roomServicePrice').value;

      this.roomServiceBool = true;
      additionalServices.push(additionalService);
    } else {
      this.roomServiceBool = false;
    }

    if (this.addAdditionalServicesForm.get('wellness').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "WELLNESS"
      additionalService.price = this.addAdditionalServicesForm.get('wellnessPrice').value;

      this.wellnessBool = true;
      additionalServices.push(additionalService);
    } else {
      this.wellnessBool = false;
    }

    if (this.addAdditionalServicesForm.get('spaCenter').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "SPA_CENTER"
      additionalService.price = this.addAdditionalServicesForm.get('spaCenterPrice').value;

      this.spaCenterBool = true;
      additionalServices.push(additionalService);
    } else {
      this.spaCenterBool = false;
    }

    if (this.addAdditionalServicesForm.get('wifi').value == true) {
      var additionalService = new AdditionalServiceModule;
      additionalService.hotelCompany = this.company;
      additionalService.additionalServiceType = "WIFI";
      additionalService.price = this.addAdditionalServicesForm.get('wifiPrice').value;

      this.wifiBool = true;
      additionalServices.push(additionalService);
    } else {
      this.wifiBool = false;
    }

    additionalServices.reverse()

    this.hotelService.updateAdditionalServices(this.company.id, additionalServices).subscribe(
      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
        this.resetAdditionalServicesBools();
        this.showHotelAdditionalServices();
      },
      error => {
        this.router.navigate(['/hotel']);
      }
    )

  }

  public showHotelAdditionalServices() {

    for (let service of this.company.additionalServices) {

      if (service.additionalServiceType === "TRANSPORT_FROM_AIRPORT") {
        this.transportFromAirportBool = true;
        this.addAdditionalServicesForm.controls['transportFromAirport'].setValue(true);
        this.addAdditionalServicesForm.controls['transportFromAirportPrice'].setValue(service.price);

      } else if (service.additionalServiceType === "TRANSPORT_TO_AIRPORT") {
        this.transportToAirportBool = true;
        this.addAdditionalServicesForm.controls['transportToAirport'].setValue(true);
        this.addAdditionalServicesForm.controls['transportToAirportPrice'].setValue(service.price);

      } else if (service.additionalServiceType === "PARKING") {
        this.parkingBool = true;
        this.addAdditionalServicesForm.controls['parking'].setValue(true);
        this.addAdditionalServicesForm.controls['parkingPrice'].setValue(service.price);

      } else if (service.additionalServiceType === "SWIMMING_POOL") {
        this.swimmingPoolBool = true;
        this.addAdditionalServicesForm.controls['swimmingPool'].setValue(true);
        this.addAdditionalServicesForm.controls['swimmingPoolPrice'].setValue(service.price);

      } else if (service.additionalServiceType === "RESTAURANT") {
        this.restaurantBool = true;
        this.addAdditionalServicesForm.controls['restaurant'].setValue(true);
        this.addAdditionalServicesForm.controls['restaurantPrice'].setValue(service.price);

      } else if (service.additionalServiceType === "ROOM_SERVICE") {
        this.roomServiceBool = true;
        this.addAdditionalServicesForm.controls['roomService'].setValue(true);
        this.addAdditionalServicesForm.controls['roomServicePrice'].setValue(service.price);

      } else if (service.additionalServiceType === "WELLNESS") {
        this.wellnessBool = true
        this.addAdditionalServicesForm.controls['wellness'].setValue(true);
        this.addAdditionalServicesForm.controls['wellnessPrice'].setValue(service.price);

      } else if (service.additionalServiceType === "SPA_CENTER") {
        this.spaCenterBool = true;
        this.addAdditionalServicesForm.controls['spaCenter'].setValue(true);
        this.addAdditionalServicesForm.controls['spaCenterPrice'].setValue(service.price);

      } else if (service.additionalServiceType === "WIFI") {
        this.wifiBool = true;
        this.addAdditionalServicesForm.controls['wifi'].setValue(true);
        this.addAdditionalServicesForm.controls['wifiPrice'].setValue(service.price);
      }

    }

    this.disableAllUncheckedServicesPrices();
  }

  public changeCheckBox(event: any) {
    var checkBoxId = event.currentTarget.id

    if (event.target.checked) {
      this.addAdditionalServicesForm.get(checkBoxId + 'Price').enable();
      
    } else {
      this.addAdditionalServicesForm.get(checkBoxId + 'Price').reset();
      this.addAdditionalServicesForm.get(checkBoxId + 'Price').disable();
      
    }
  }

  public editRoom() {
    var room = new RoomModule();

    room.id = this.roomId;
    room.hotelCompany = this.company;

    room.floor = this.editRoomForm.get('floor').value;
    room.number = this.editRoomForm.get('number').value;
    room.numberOfBeds = this.editRoomForm.get('numberOfBeds').value;

    room.nextMonthPrice = this.editRoomForm.get('nextMonthPrice').value;
    room.nextThreeMonthPrice = this.editRoomForm.get('nextThreeMonthPrice').value;
    room.nextHalfYearPrice = this.editRoomForm.get('nextHalfYearPrice').value;

    room.fastReserve = this.editRoomForm.get('fastReserve').value;
    

    this.hotelService.EditRoom(this.roomId, room.hotelCompany, room.floor, room.number, room.numberOfBeds, room.nextMonthPrice,
      room.nextThreeMonthPrice, room.nextHalfYearPrice, room.fastReserve).subscribe(
        data => {
          this.company = data;
          this.rate = this.company.rate / this.company.rateCount;
          this.setCurrentFieldValues();
          
        },
        error => {
          this.router.navigate(['/hotel']);
        }
      )
  }

  public editRoomModal(room: RoomModule, roomId: number) {
    this.roomId = roomId;
    this.EditNumberOfFloor.setValue(room.floor);
    this.EditNumberOfRoom.setValue(room.number);
    this.EditNumberOfBeds.setValue(room.numberOfBeds);
    this.EditNextMonthPrice.setValue(room.nextMonthPrice);
    this.EditNextThreeMonthPrice.setValue(room.nextThreeMonthPrice);
    this.EditNextHalfYearPrice.setValue(room.nextHalfYearPrice);
    this.EditFastReserve.setValue(room.fastReserve);
    this.editRoomForm.controls['fastReserve'].setValue(room.fastReserve);
    
  }

  public deleteRoom(room: RoomModule, roomId: number) {
    this.hotelService.DeleteRoom(roomId, this.company).subscribe(
      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        this.router.navigate(['/hotel']);
      }
    )
  }

  public AddRoom() {

    this.hotelService.AddRoom(this.company, this.NumberOfFloor.value, this.NumberOfRoom.value,
      this.NumberOfBeds.value, this.NextMonthPrice.value, this.NextThreeMonthPrice.value, this.NextHalfYearPrice.value,
       this.FastReserve.value).subscribe(

        data => {
          this.company = data;
          this.rate = this.company.rate / this.company.rateCount;
          this.setCurrentFieldValues();
          this.addRoomForm.reset();
        },
        error => {
          this.router.navigate(['/hotel']);
        }
      )
  }

  public EditBasic() {
    this.hotelService.EditBasic(this.Id.value, this.Name.value, this.PromtiveDescription.value).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        this.router.navigate(['/hotel']);
      }
    )
  }

  public EditLocationModal(item: LocationModule) {
    this.EditAdress.setValue(item.adress);
    this.EditCode.setValue(item.code);
    this.EditLat.setValue(item.lat);
    this.EditLng.setValue(item.lng);
  }

  public EditLocation() {
    var location: LocationModule;
    location = this.editDestForm.value;
    this.hotelService.EditLocation(location, this.company.id).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        this.router.navigate(['/hotel']);
      }
    )
  }

  public setCurrentFieldValues() {

    this.Name.setValue(this.company.name);
    this.PromtiveDescription.setValue(this.company.promtiveDescription);
    this.Id.setValue(this.company.id);
  }

  public disableAllUncheckedServicesPrices() {
    if (!this.transportFromAirportBool) {
      this.addAdditionalServicesForm.get('transportFromAirportPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('transportFromAirportPrice').enable();
    }

    if (!this.transportToAirportBool) {
      this.addAdditionalServicesForm.get('transportToAirportPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('transportToAirportPrice').enable();
    }

    if (!this.parkingBool) {
      this.addAdditionalServicesForm.get('parkingPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('parkingPrice').enable();
    }

    if (!this.swimmingPoolBool) {
      this.addAdditionalServicesForm.get('swimmingPoolPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('swimmingPoolPrice').enable();
    }

    if (!this.restaurantBool) {
      this.addAdditionalServicesForm.get('restaurantPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('restaurantPrice').enable();
    }

    if (!this.roomServiceBool) {
      this.addAdditionalServicesForm.get('roomServicePrice').disable();
    } else {
      this.addAdditionalServicesForm.get('roomServicePrice').enable();
    }

    if (!this.wellnessBool) {
      this.addAdditionalServicesForm.get('wellnessPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('wellnessPrice').enable();
    }

    if (!this.spaCenterBool) {
      this.addAdditionalServicesForm.get('spaCenterPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('spaCenterPrice').enable();
    }

    if (!this.wifiBool) {
      this.addAdditionalServicesForm.get('wifiPrice').disable();
    } else {
      this.addAdditionalServicesForm.get('wifiPrice').enable();
    }

  }

  public resetFRBoolean() {
    this.frTransportFromAirportBool = false;
    this.frTransportToAirportBool = false;
    this.frParkingBool = false;
    this.frSwimmingPoolBool = false;
    this.frRestaurantBool = false;
    this.frRoomServiceBool = false;
    this.frWellnessBool = false;
    this.frSpaCenterBool = false;
    this.frWifiBool = false;
  }

  public resetAdditionalServicesBools() {
    this.transportFromAirportBool = false;
    this.transportToAirportBool = false;
    this.parkingBool = false;
    this.swimmingPoolBool = false;
    this.restaurantBool = false;
    this.roomServiceBool = false;
    this.wellnessBool = false;
    this.spaCenterBool = false;
    this.wifiBool = false;
  }

  // basic info getters
  get Name() { return this.basicForm.get('name') }
  get PromtiveDescription() { return this.basicForm.get('promotiveDescription') }
  get Id() { return this.basicForm.get('id') }
  // location getters
  get EditAdress() { return this.editDestForm.get('adress') }
  get EditCode() { return this.editDestForm.get('code') }
  get EditLat() { return this.editDestForm.get('lat') }
  get EditLng() { return this.editDestForm.get('lng') }
  // addroom getters
  get NumberOfFloor() { return this.addRoomForm.get('floor') }
  get NumberOfRoom() { return this.addRoomForm.get('number') }
  get NumberOfBeds() { return this.addRoomForm.get('numberOfBeds') }
  get NextMonthPrice() { return this.addRoomForm.get('nextMonthPrice') }
  get NextThreeMonthPrice() { return this.addRoomForm.get('nextThreeMonthPrice') }
  get NextHalfYearPrice() { return this.addRoomForm.get('nextHalfYearPrice') }
  get FastReserve() { return this.addRoomForm.get('fastReserve') }
  // editroom getters
  get EditNumberOfFloor() { return this.editRoomForm.get('floor') }
  get EditNumberOfRoom() { return this.editRoomForm.get('number') }
  get EditNumberOfBeds() { return this.editRoomForm.get('numberOfBeds') }
  get EditNextMonthPrice() { return this.editRoomForm.get('nextMonthPrice') }
  get EditNextThreeMonthPrice() { return this.editRoomForm.get('nextThreeMonthPrice') }
  get EditNextHalfYearPrice() { return this.editRoomForm.get('nextHalfYearPrice') }
  get EditFastReserve() { return this.editRoomForm.get('fastReserve') }

}
