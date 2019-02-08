import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyModule } from '../hotel-company/company/company.module';
import { DatePipe } from '@angular/common';
import { HotelCompanyService } from '../services/hotel-company.service';
import { RoomModule } from '../hotel-company/room/room.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomReservationModule } from '../hotel-company/room-reservation/room-reservation.module';
import { HotelFastReservationRoomModule } from '../hotel-company/hotel-fast-reservation-room/hotel-fast-reservation-room.module';

@Component({
  selector: 'app-hotel-company-profile',
  templateUrl: './hotel-company-profile.component.html',
  styleUrls: ['./hotel-company-profile.component.css']
})
export class HotelCompanyProfileComponent implements OnInit {

  id: number;
  company: CompanyModule;

  checkInDate: Date;
  checkOutDate: Date;

  priceRang: number;

  // fast reservations
  fastReservations: Array<HotelFastReservationRoomModule>;

  // make reservation
  roomToBook: RoomModule;
  numberOfDays: number = 1;

  // reservation modal - room info
  roomFloor: number;
  roomNumber: number;
  roomNumberOfBeds: number;

  // reservation modal - additional-services prices
  transportFromAirportPrice: number;
  transportToAirportPrice: number;
  parkingPrice: number;
  swimmingPoolPrice: number;
  restaurantPrice: number;
  roomServicePrice: number;
  wellnessPrice: number;
  spaCenterPrice: number;
  wifiPrice: number;

  // reservation modal - final price
  numberOfAdditionalServices: number;
  additionalServicesPrice: number;
  roomPrice: number = 0;
  finalPrice: number = 0;

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

  bookRoomForm = new FormGroup({
    checkInDate: new FormControl(new Date()),
    checkOutDate: new FormControl(new Date()),
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
    // label
    transportFromAirportPrice: new FormControl(''),
    transportToAirportPrice: new FormControl(''),
    parkingPrice: new FormControl(''),
    swimmingPoolPrice: new FormControl(''),
    restaurantPrice: new FormControl(''),
    roomServicePrice: new FormControl(''),
    wellnessPrice: new FormControl(''),
    spaCenterPrice: new FormControl(''),
    wifiPrice: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelCompanyService, private datePipe: DatePipe) {

    this.id = +this.route.snapshot.paramMap.get('id');

    this.hotelService.getCompany(this.id).subscribe(

      data => {
        this.company = data;
      },
      error => {
        this.router.navigate(['/hotel']);
      }
    )
    
    
    this.hotelService.getFastResevationsForCompany(this.id).subscribe(

      data => {
        this.fastReservations = data;
      },
      error => {
        this.router.navigate(['/hotel']);
      }
    )

  }

  ngOnInit() {}

  public reserveFastOffer(item: HotelFastReservationRoomModule) {
    
    let owner = JSON.parse(localStorage.getItem('sessionUser'));

    this.hotelService.reserveFastOffer(owner, item.hfro).subscribe(
      data => {
        alert(data.message)
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )
  }

  public makeReservation() {

    let tempRoomReservation = new RoomReservationModule();

    tempRoomReservation.checkInDate = this.checkInDate;
    tempRoomReservation.checkOutDate = this.bookRoomForm.get('checkOutDate').value;
    tempRoomReservation.room = this.roomToBook;
    tempRoomReservation.owner = JSON.parse(localStorage.getItem('sessionUser'));

    for (let as of this.company.additionalServices) {
      
      if (as.additionalServiceType === "TRANSPORT_FROM_AIRPORT" && this.bookRoomForm.get('transportFromAirport').value == true) {
        
        tempRoomReservation.additionalServices.push(as)

      } else if (as.additionalServiceType === "TRANSPORT_TO_AIRPORT" && this.bookRoomForm.get('transportToAirport').value == true) {
        
        tempRoomReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "PARKING" && this.bookRoomForm.get('parking').value == true) {
        
        tempRoomReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "SWIMMING_POOL" && this.bookRoomForm.get('swimmingPool').value == true) {
        
        tempRoomReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "RESTAURANT" && this.bookRoomForm.get('restaurant').value == true) {

        tempRoomReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "ROOM_SERVICE" && this.bookRoomForm.get('roomService').value == true) {
        
        tempRoomReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "WELLNESS" && this.bookRoomForm.get('wellness').value == true) {
        
        tempRoomReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "SPA_CENTER" && this.bookRoomForm.get('spaCenter').value == true) {
        
        tempRoomReservation.additionalServices.push(as);

      } else if (as.additionalServiceType === "WIFI" && this.bookRoomForm.get('wifi').value == true) {
        
        tempRoomReservation.additionalServices.push(as);

      }

    }

    this.hotelService.makeReservation(tempRoomReservation).subscribe(
      data => {
        alert(data.message)
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )

  }

  public bookRoom(item: RoomModule) {
    this.resetFields();

    // zapamti o kojoj sobi je rec
    this.roomToBook = item;

    this.roomFloor = item.floor;
    this.roomNumber = item.number;
    this.roomNumberOfBeds = item.numberOfBeds;

    this.checkInDate = new Date();
    this.checkInDate = new Date();

    this.hotelService.checkPriceRang(this.checkInDate).subscribe(
      data => {
        this.priceRang = data;
        this.setRoomPrice(data, this.roomToBook);
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )

    for (let as of this.company.additionalServices) {
      
      if (as.additionalServiceType === "TRANSPORT_FROM_AIRPORT") {
        this.transportFromAirportBool = true;
        this.transportFromAirportPrice = as.price;

      } else if (as.additionalServiceType === "TRANSPORT_TO_AIRPORT") {
        this.transportToAirportBool = true;
        this.transportToAirportPrice = as.price;

      } else if (as.additionalServiceType === "PARKING") {
        this.parkingBool = true;
        this.parkingPrice = as.price;

      } else if (as.additionalServiceType === "SWIMMING_POOL") {
        this.swimmingPoolBool = true;
        this.swimmingPoolPrice = as.price;

      } else if (as.additionalServiceType === "RESTAURANT") {
        this.restaurantBool = true;
        this.restaurantPrice = as.price;

      } else if (as.additionalServiceType === "ROOM_SERVICE") {
        this.roomServiceBool = true;
        this.roomServicePrice = as.price;

      } else if (as.additionalServiceType === "WELLNESS") {
        this.wellnessBool = true;
        this.wellnessPrice = as.price;

      } else if (as.additionalServiceType === "SPA_CENTER") {
        this.spaCenterBool = true;
        this.spaCenterPrice = as.price;

      } else if (as.additionalServiceType === "WIFI") {
        this.wifiBool = true;
        this.wifiPrice = as.price;

      }
    }

  }

  public setRoomPrice(priceRang: number, room: RoomModule) {

    if (priceRang == 1) {
      this.roomPrice = room.nextMonthPrice;

    } else if (priceRang == 2) {
      this.roomPrice = room.nextThreeMonthPrice;

    } else if (priceRang == 3) {
      this.roomPrice = room.nextHalfYearPrice;

    }

  }

  public changeCheckBox(event: any) {
    var checkBoxId = event.currentTarget.id

    if (event.target.checked) {
      this.numberOfAdditionalServices += 1;

      if ("transportFromAirport" === checkBoxId) {
        this.additionalServicesPrice += this.transportFromAirportPrice;
      } else if ("transportToAirport" === checkBoxId) {
        this.additionalServicesPrice += this.transportToAirportPrice;
      } else if ("parking" === checkBoxId) {
        this.additionalServicesPrice += this.parkingPrice;
      } else if ("swimmingPool" === checkBoxId) {
        this.additionalServicesPrice += this.swimmingPoolPrice;
      } else if ("restaurant" === checkBoxId) {
        this.additionalServicesPrice += this.restaurantPrice;
      } else if ("roomService" === checkBoxId) {
        this.additionalServicesPrice += this.roomServicePrice;
      } else if ("wellness" === checkBoxId) {
        this.additionalServicesPrice += this.wellnessPrice;
      } else if ("spaCenter" === checkBoxId) {
        this.additionalServicesPrice += this.spaCenterPrice;
      } else if ("wifi" === checkBoxId) {
        this.additionalServicesPrice += this.wifiPrice;
      }

    } else {
      this.numberOfAdditionalServices -= 1;

      if ("transportFromAirport" === checkBoxId) {
        this.additionalServicesPrice -= this.transportFromAirportPrice;
      } else if ("transportToAirport" === checkBoxId) {
        this.additionalServicesPrice -= this.transportToAirportPrice;
      } else if ("parking" === checkBoxId) {
        this.additionalServicesPrice -= this.parkingPrice;
      } else if ("swimmingPool" === checkBoxId) {
        this.additionalServicesPrice -= this.swimmingPoolPrice;
      } else if ("restaurant" === checkBoxId) {
        this.additionalServicesPrice -= this.restaurantPrice;
      } else if ("roomService" === checkBoxId) {
        this.additionalServicesPrice -= this.roomServicePrice;
      } else if ("wellness" === checkBoxId) {
        this.additionalServicesPrice -= this.wellnessPrice;
      } else if ("spaCenter" === checkBoxId) {
        this.additionalServicesPrice -= this.spaCenterPrice;
      } else if ("wifi" === checkBoxId) {
        this.additionalServicesPrice -= this.wifiPrice;
      }
    }

    this.finalPrice = this.additionalServicesPrice * (1 - (5 * this.numberOfAdditionalServices) / 100);
  }

  public dataChange(room: RoomModule) {
    this.hotelService.checkPriceRang(this.checkInDate).subscribe(
      data => {
        this.priceRang = data;
        this.setRoomPrice(data, room);
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )
  }

  public calculateRoomPrice() {
    this.checkInDate = this.bookRoomForm.get("checkInDate").value;
    this.dataChange(this.roomToBook);
  }

  public resetFields() {
    // from date
    this.bookRoomForm.get("checkInDate").setValue(new Date());
    this.bookRoomForm.get("checkOutDate").setValue(new Date());

    // form boolean
    this.bookRoomForm.controls['transportFromAirport'].setValue(false);
    this.bookRoomForm.controls['transportToAirport'].setValue(false);
    this.bookRoomForm.controls['parking'].setValue(false);
    this.bookRoomForm.controls['swimmingPool'].setValue(false);
    this.bookRoomForm.controls['restaurant'].setValue(false);
    this.bookRoomForm.controls['roomService'].setValue(false);
    this.bookRoomForm.controls['wellness'].setValue(false);
    this.bookRoomForm.controls['spaCenter'].setValue(false);
    this.bookRoomForm.controls['wifi'].setValue(false);

    // additional-services boolean
    this.transportFromAirportBool = false;
    this.transportToAirportBool = false;
    this.parkingBool = false;
    this.swimmingPoolBool = false;
    this.restaurantBool = false;
    this.roomServiceBool = false;
    this.wellnessBool = false;
    this.spaCenterBool = false;
    this.wifiBool = false;

    // final price
    this.finalPrice = 0;
    this.roomPrice = 0;
    this.numberOfDays = 0;
    this.numberOfAdditionalServices = 0;
    this.additionalServicesPrice = 0;
  }

  public transformDate(date: Date) {
    this.datePipe.transform(date, 'MM-dd-yyyy'); //whatever format you need. 
  }

}
