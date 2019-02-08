import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelCompanyService } from '../services/hotel-company.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchedRoomModule } from '../hotel-company/searched-room/searched-room.module'
import { DatePipe } from '@angular/common'
import { RoomModule } from '../hotel-company/room/room.module';
import { RoomReservationModule } from '../hotel-company/room-reservation/room-reservation.module';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.css']
})
export class RoomSearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelCompanyService, public datepipe: DatePipe) { }

  searchedRooms: Array<SearchedRoomModule>;

  hotelName: String;
  hotelLocation: String;
  checkInDate: Date;
  checkOutDate: Date;

  checkInDateString: String;
  checkOutDateString: String;
  priceRang: number;

  // make reservation
  roomToBook : SearchedRoomModule;

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
  additionalSerrvicesPrice: number;
  roomPrice: number;
  finalPrice: number;

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

  searchForm = new FormGroup({
    hotelName: new FormControl(''),
    hotelLocation: new FormControl(''),
    checkInDate: new FormControl(new Date()),
    checkOutDate: new FormControl(new Date()),
  });

  bookRoomForm = new FormGroup({
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

  ngOnInit() {

    this.hotelName = this.route.snapshot.paramMap.get('hotelName');
    this.hotelLocation = this.route.snapshot.paramMap.get('hotelLocation');
    this.checkInDate = new Date(this.route.snapshot.paramMap.get('checkInDate'));
    this.checkOutDate = new Date(this.route.snapshot.paramMap.get('checkOutDate'));

    if (this.hotelName === "null") {
      this.searchForm.controls['hotelName'].setValue('');
    } else {
      this.searchForm.controls['hotelName'].setValue(this.hotelName);
    }

    if (this.hotelLocation === "null") {
      this.searchForm.controls['hotelLocation'].setValue('');
    } else {
      this.searchForm.controls['hotelLocation'].setValue(this.hotelLocation);
    }

    this.searchForm.controls['checkInDate'].setValue(this.checkInDate);
    this.searchForm.controls['checkOutDate'].setValue(this.checkOutDate);

    this.hotelService.searchRooms(this.hotelName, this.hotelLocation, this.checkInDate, this.checkOutDate).subscribe(
      data => {
        this.searchedRooms = data;

      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )

  }

  public getAllRooms() {

    this.resetSearchFields();

    this.hotelName = "null";
    this.hotelLocation = "null";

    this.hotelService.searchRooms(this.hotelName, this.hotelLocation, this.checkInDate, this.checkOutDate).subscribe(
      data => {
        this.searchedRooms = data;

      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )
  }

  public searchForRooms() {

    this.hotelName = this.searchForm.get('hotelName').value;
    this.hotelLocation = this.searchForm.get('hotelLocation').value;
    this.checkInDate = this.searchForm.get('checkInDate').value;
    this.checkOutDate = this.searchForm.get('checkOutDate').value;

    if (this.hotelName === "") {
      this.hotelName = "null";
    }

    if (this.hotelLocation === "") {
      this.hotelLocation = "null";
    }

    


    this.hotelService.searchRooms(this.hotelName, this.hotelLocation, this.checkInDate, this.checkOutDate).subscribe(
      data => {
        this.searchedRooms = data;
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )
  }

  public makeReservation() {

    let tempRoomReservation = new RoomReservationModule();

    tempRoomReservation.checkInDate = this.checkInDate;
    tempRoomReservation.checkOutDate = this.checkOutDate;
    tempRoomReservation.room = this.roomToBook.room;
    tempRoomReservation.owner = JSON.parse(localStorage.getItem('sessionUser'));
    
    for (let as of this.roomToBook.hotelCompany.additionalServices) {

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

    localStorage.setItem('HotelOrder', JSON.stringify(tempRoomReservation));
  }

  public bookRoom(item: SearchedRoomModule) {
    this.resetFields();
    

    // zapamti o kojoj sobi je rec
    this.roomToBook = item;

    this.roomFloor = item.room.floor;
    this.roomNumber = item.room.number;
    this.roomNumberOfBeds = item.room.numberOfBeds;

    this.checkInDateString = this.datepipe.transform(this.checkInDate, 'MM-dd-yyyy');
    this.checkOutDateString = this.datepipe.transform(this.checkOutDate, 'MM-dd-yyyy');

    this.hotelService.checkPriceRang(this.checkInDate).subscribe(
      data => {
        this.priceRang = data;
        this.setFinalPrice(data, item.room);
      },
      error => {
        this.router.navigate(['/hotels']);
      }
    )

    for (let as of item.hotelCompany.additionalServices) {
      
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

  public setFinalPrice(priceRang: number, room: RoomModule) {

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
        this.additionalSerrvicesPrice += this.transportFromAirportPrice;
      } else if ("transportToAirport" === checkBoxId) {
        this.additionalSerrvicesPrice += this.transportToAirportPrice;
      } else if ("parking" === checkBoxId) {
        this.additionalSerrvicesPrice += this.parkingPrice;
      } else if ("swimmingPool" === checkBoxId) {
        this.additionalSerrvicesPrice += this.swimmingPoolPrice;
      } else if ("restaurant" === checkBoxId) {
        this.additionalSerrvicesPrice += this.restaurantPrice;
      } else if ("roomService" === checkBoxId) {
        this.additionalSerrvicesPrice += this.roomServicePrice;
      } else if ("wellness" === checkBoxId) {
        this.additionalSerrvicesPrice += this.wellnessPrice;
      } else if ("spaCenter" === checkBoxId) {
        this.additionalSerrvicesPrice += this.spaCenterPrice;
      } else if ("wifi" === checkBoxId) {
        this.additionalSerrvicesPrice += this.wifiPrice;
      }

    } else {
      this.numberOfAdditionalServices -= 1;

      if ("transportFromAirport" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.transportFromAirportPrice;
      } else if ("transportToAirport" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.transportToAirportPrice;
      } else if ("parking" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.parkingPrice;
      } else if ("swimmingPool" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.swimmingPoolPrice;
      } else if ("restaurant" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.restaurantPrice;
      } else if ("roomService" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.roomServicePrice;
      } else if ("wellness" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.wellnessPrice;
      } else if ("spaCenter" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.spaCenterPrice;
      } else if ("wifi" === checkBoxId) {
        this.additionalSerrvicesPrice -= this.wifiPrice;
      }
    }

    this.finalPrice = this.additionalSerrvicesPrice * (1 - (5 * this.numberOfAdditionalServices) / 100);
  }

  public resetSearchFields() {

    this.searchForm.get("hotelName").reset();
    this.searchForm.get("hotelLocation").reset();
    this.searchForm.get("checkInDate").setValue(new Date());
    this.searchForm.get("checkOutDate").setValue(new Date());
  }

  public resetFields() {
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
    this.numberOfAdditionalServices = 0;
    this.additionalSerrvicesPrice = 0;
  }

}
