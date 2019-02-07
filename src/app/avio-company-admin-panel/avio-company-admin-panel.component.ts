import { Component, OnInit } from '@angular/core';
import { AvioCompanyService } from '../services/avio-company.service'
import { AvioCompanyModule } from '../avio-company/avio-company.module'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { CompanyModule } from '../avio-company/company/company.module';
import { FlightStopModule } from '../avio-company/flight-stop/flight-stop.module';
import { LocationModule } from '../avio-company/location/location.module';
import { FlightModule } from '../avio-company/flight/flight.module';




@Component({
  selector: 'app-avio-company-admin-panel',
  templateUrl: './avio-company-admin-panel.component.html',
  styleUrls: ['./avio-company-admin-panel.component.css']
})
export class AvioCompanyAdminPanelComponent implements OnInit {

  company: CompanyModule;
  rate: number;
  idDest: any;
  idFlight: any;
  flightStop: Array<FlightStopModule> = new Array<FlightStopModule>();
  startDestination: FlightStopModule;
  endDestination: FlightStopModule;
  param: number;
  startBool: boolean = true;
  endBool: boolean = true;
  data:Object;
  earnings:number = 0;

  basicForm = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    promotiveDescription: new FormControl('', Validators.required),
  });

  addFlightForm = new FormGroup({
    additionalPriceCaryyBag: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    additionalPriceCheckBag: new FormControl('', Validators.required),
    travelTime: new FormControl('', Validators.required),
    maxCarryBag:new FormControl('', Validators.required),
    maxCheckBag:new FormControl('', Validators.required),
    travelDistance: new FormControl('', Validators.required),
  });

  editFlightForm = new FormGroup({
    additionalPriceCaryyBag: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    additionalPriceCheckBag: new FormControl('', Validators.required),
    travelTime: new FormControl('', Validators.required),
    maxCarryBag:new FormControl('', Validators.required),
    maxCheckBag:new FormControl('', Validators.required),
    travelDistance: new FormControl('', Validators.required),
  });

  addStopForm = new FormGroup({
    takeoff: new FormControl(new Date(), Validators.required),
    time: new FormControl('', [Validators.required,Validators.pattern("[0-2][0-9]:[0-5][0-9]")]),
    code: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required)
  });

  addDestForm = new FormGroup({
    code: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required)
  });

  editLocationForm = new FormGroup({
    code: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required)
  });

  earningsForm = new FormGroup({
    earnings1: new FormControl(new Date(), Validators.required),
    earnings2: new FormControl(new Date(), Validators.required),
  });

  editDestForm = new FormGroup({
    code: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required)
  });
  constructor(private avioService: AvioCompanyService, private authService: AuthenticationService, private router: Router) { 


  }

  private setCurrentFieldValues() {

    this.Name.setValue(this.company.name);
    this.PromotiveDescription.setValue(this.company.promtiveDescription);
    this.Id.setValue(this.company.id);
  }

  Parametrization(index) {
    this.param = index;
  }

  DeleteS(param) {
    if (param == 1) {
      this.startDestination = null;
      this.startBool = true;
    }
    else {
      this.endDestination = null;
      this.endBool = true;
    }
  }

  EditLocationModal(){

    this.editLocationForm.get('code').setValue(this.company.location.code);
    this.editLocationForm.get('adress').setValue(this.company.location.adress);
    this.editLocationForm.get('lat').setValue(this.company.location.lat);
    this.editLocationForm.get('lng').setValue(this.company.location.lng);

  }

  EditLocation(){
    var location: LocationModule;
    location = this.editLocationForm.value;
    location.id = this.company.location.id;

    this.avioService.EditDestination(location,this.company.id).subscribe(
      data=>{
        this.company = data;
      },
      error=>{
        alert("Cannnot update location");
      }
    )

  }

  AddStop() {

    var stop = new FlightStopModule();
    stop.takeOff = this.addStopForm.get('takeoff').value;
    stop.time =  this.addStopForm.get('time').value;
    var location = new LocationModule();
    location.code = this.addStopForm.get('code').value;
    location.adress = this.addStopForm.get('adress').value;
    location.lat = this.addStopForm.get('lat').value;
    location.lng = this.addStopForm.get('lng').value;
    stop.location = location;

    if (this.param == 1) {
      this.startDestination = stop;
      this.startBool = false;
    }
    else {
      this.endDestination = stop;
      this.endBool = false;
    }
  }

  GetEarning(){

    this.avioService.GetEarnings(this.company.id,this.earningsForm.get('earnings1').value,this.earningsForm.get('earnings2').value).subscribe(

      data=>{
        this.earnings=data;
      },
      error=>{
        alert("error");
      }
    )

  }

  public EditBasic() {
    this.avioService.EditBasic(this.basicForm.get('id').value, this.Name.value, this.PromotiveDescription.value).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        this.router.navigate(['/avio']);
      }
    )
  }

  EditFlightModal(item: FlightModule, i: number) {
    this.flightStop = item.flightStop;
    this.editFlightForm.get('price').setValue(item.priceForTicket);
    this.editFlightForm.get('additionalPriceCaryyBag').setValue(item.additionalPriceCarryBag);
    this.editFlightForm.get('additionalPriceCheckBag').setValue(item.additionalPriceCheckBag);
    this.editFlightForm.get('maxCheckBag').setValue(item.maxCheckBag);
    this.editFlightForm.get('maxCarryBag').setValue(item.maxCarryBag);
    this.editFlightForm.get('travelTime').setValue(item.travelTime);
    this.editFlightForm.get('travelDistance').setValue(item.travelDistance);
    this.startDestination = item.startDestination;
    this.endDestination = item.endDestination;
    if (this.startDestination == null) {
      this.startBool = true;
    }
    else {
      this.startBool = false;
    }
    if (this.endDestination == null) {
      this.endBool = true;
    }
    else {
      this.endBool = false;
    }
    this.idFlight = i;
  }
  AddModal(){
    this.startDestination == null;
    this.startBool = true;
    this.endDestination == null
    this.endBool = true;
  }

  AddFlightStopModal(item: FlightModule, i: number) {
    this.idFlight = item;
  }

  EditFlight() {
    var flight = new FlightModule();
    flight.id = this.company.flights[this.idFlight].id;
    flight.avioCompany = this.company;
    flight.priceForTicket = this.editFlightForm.get('price').value;
    flight.additionalPriceCarryBag = this.editFlightForm.get('additionalPriceCaryyBag').value;
    flight.additionalPriceCheckBag = this.editFlightForm.get('additionalPriceCheckBag').value;
    flight.maxCarryBag = this.editFlightForm.get('maxCarryBag').value;
    flight.maxCheckBag = this.editFlightForm.get('maxCheckBag').value;
    flight.travelTime = this.editFlightForm.get('travelTime').value;
    flight.travelDistance = this.editFlightForm.get('travelDistance').value;
    flight.startDestination = this.startDestination;
    flight.endDestination = this.endDestination; 
 
    this.avioService.EditFlight(flight.id,this.company,flight.additionalPriceCheckBag,flight.additionalPriceCarryBag,flight.priceForTicket,flight.startDestination,flight.endDestination,flight.travelTime,flight.travelDistance,flight.maxCarryBag,flight.maxCheckBag).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
        this.startDestination == null;
        this.startBool = true;
        this.endDestination == null
        this.endBool = true;
    
      },
      error => {
        this.router.navigate(['/avio']);
      }

    )
  }

  ngOnInit() {


    this.avioService.getCompanyFromUser().subscribe(
     

      data => {
        this.company = data;

        this.avioService.getGraph(this.company.id).subscribe(
          data=>{

            var nest = {
              data: [
                {"value": data[0]},
                {"value": data[1]},
                {"value": data[2]}
              ]
            };
        
            this.data = JSON.stringify(nest);
          },
          error=>{

          }
        )
      


        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        this.router.navigate(['/avio']);
      }
    )
      


  }

  public EditDestinationModal(item: LocationModule, index: number) {
    this.EditAdress.setValue(item.adress);
    this.EditCode.setValue(item.code);
    this.EditLat.setValue(item.lat);
    this.EditLng.setValue(item.lng);
    for (var i = 0; i < this.company.destinations.length; i++) {
      if (index == i) {
        this.idDest = this.company.destinations[i].id;
      }
    }
  }

  public AddFlightStop() {

    var stop = new FlightStopModule();
    stop.takeOff = this.addStopForm.get('takeoff').value;
    stop.time = this.addStopForm.get('time').value;
    var location = new LocationModule();
    location.code = this.addStopForm.get('code').value;
    location.adress = this.addStopForm.get('adress').value;
    location.lat = this.addStopForm.get('lat').value;
    location.lng = this.addStopForm.get('lng').value;
    stop.location = location;

    this.avioService.AddFlightStop(stop, this.idFlight, this.company).subscribe(
      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        alert("Error!");
      }
    )



  }

  AddFlight() {

    this.avioService.AddFlight(this.company, this.addFlightForm.get('additionalPriceCheckBag').value, this.addFlightForm.get('additionalPriceCaryyBag').value, this.addFlightForm.get('price').value, this.startDestination, this.endDestination,this.addFlightForm.get('travelTime').value,this.addFlightForm.get('travelDistance').value, this.addFlightForm.get('maxCheckBag').value, this.addFlightForm.get('maxCarryBag').value).subscribe(
      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        alert("Error!");
      }
    )
  }

  DeleteFlight(item: FlightModule) {
    this.avioService.DeleteFlight(item, this.company).subscribe(
      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        alert("Error!");
      }
    )

  }

  public DeleteFlightStop(item: FlightStopModule, flight:FlightModule) {

    this.avioService.DeleteFlightStop(item, flight, this.company).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        alert("Error!");
      }
    )
  }

  public EditDestination(index: number) {
    var location: LocationModule;
    location = this.editDestForm.value;
    location.id = this.idDest;
    alert(location.id);
    this.avioService.EditDestination(location, this.company.id).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        alert("Error!");
      }

    )

  }

  public AddDestination() {
    var location: LocationModule;
    location = this.addDestForm.value;
    alert(location.adress);
    alert(this.company.id);
    this.avioService.addDestination(location, this.company.id).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        alert("Error!");
      }

    )

  }

  public DeleteDestination(item: LocationModule, index: number) {

    item.id = index;
    this.avioService.DeleteDestination(item, this.company.id).subscribe(

      data => {
        this.company = data;
        this.rate = this.company.rate / this.company.rateCount;
        this.setCurrentFieldValues();
      },
      error => {
        alert("Error!");
      }

    )


  }

  get ADDFNumberOfSeats() {
    return this.addFlightForm.get('numberseats')
  }
  get Name() {
    return this.basicForm.get('name')
  }
  get PromotiveDescription() {
    return this.basicForm.get('promotiveDescription')
  }
  get Id() {
    return this.basicForm.get('id')
  }

  get AddAdress() {
    return this.addDestForm.get('adress')
  }
  get AddCode() {
    return this.addDestForm.get('code')
  }
  get AddLat() {
    return this.addDestForm.get('lat')
  }
  get AddLng() {
    return this.addDestForm.get('lng')
  }

  get EditAdress() {
    return this.editDestForm.get('adress')
  }
  get EditCode() {
    return this.editDestForm.get('code')
  }
  get EditLat() {
    return this.editDestForm.get('lat')
  }
  get EditLng() {
    return this.editDestForm.get('lng')
  }

}
