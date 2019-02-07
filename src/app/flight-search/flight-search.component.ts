import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvioCompanyService } from '../services/avio-company.service';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { FlightModule } from '../avio-company/flight/flight.module';
import { FlightsModule } from '../avio-company/flights/flights.module';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private avioService: AvioCompanyService) { }

  flights: Set<FlightsModule>;
  flightsCopy: Set<FlightsModule>;
  landing: Date;
  type: String;

  searchForm = new FormGroup({
    ns: new FormControl(new Boolean()),
    js: new FormControl(new Boolean()),
    ds: new FormControl(new Boolean()),
    sortic: new FormControl(''),
    price: new FormControl(new Number(0)),
    ec: new FormControl(new Boolean()),
    bc: new FormControl(new Boolean()),
    fc: new FormControl(new Boolean()),
   
    cb: new FormControl('0'),
    ccb: new FormControl('0'),
  });

  Reserve(item) {
    if (this.type == 'ONE-WAY') {
      this.router.navigate(['/avio/seats/' + item.id + '/' + 'ow/' + 'None']);
    }
    else {
      this.router.navigate(['/avio/seats/' + item.id + '/' + 'rw/' + this.landing]);
    }


  }


  onChanges() {
    this.searchForm.valueChanges.subscribe(val => {
      this.flights = this.flightsCopy;
      var ec = new Array<FlightsModule>();
      var bc = new Array<FlightsModule>();
      var fc = new Array<FlightsModule>();
      var ss = new Array<FlightsModule>();
      var pr = new Array<FlightsModule>();
      var cb = new Array<FlightsModule>();
      var ccb = new Array<FlightsModule>();
      if (val.ec == true) {
        ec = this.FilterForClass('ECONOMIC', this.flights);
      }
      if (val.bc == true) {
        bc = this.FilterForClass('BUSINESS', this.flights);
      }
      if (val.fc == true) {
        fc = this.FilterForClass('FIRSTCLASS', this.flights);
      }

      ss = this.FilterForStops(val,this.flights);


      var searched = new Set<FlightsModule>();
      ec.forEach(element => {
        searched.add(element);
      });
      bc.forEach(element => {
        searched.add(element);
      });
      fc.forEach(element => {
        searched.add(element);
      });
      ss.forEach(element => {
        searched.add(element);
      });

      if(val.price){
        pr = this.FilterForPrice(this.searchForm.get('price').value,searched);
        searched.clear();
      }

      pr.forEach(element => {
        searched.add(element);
      });

      if(val.cb){
        cb = this.FilterForCB(this.searchForm.get('cb').value,searched);
        searched.clear();
      }

      cb.forEach(element => {
        searched.add(element);
      });

      
      if(val.Ccb){
        ccb = this.FilterForCCB(this.searchForm.get('ccb').value,searched);
        searched.clear();
      }

      ccb.forEach(element => {
        searched.add(element);
      });



      this.flights=searched;
      alert(this.searchForm.get('sortic').value);

      var temp = new Array<FlightsModule>();
      searched.forEach(element => {
      temp.push(element);
      
    });
        if(this.searchForm.get('sortic').value == 'pricelow'){
          alert('dsa');
        temp.sort((a,b)=>a.flight.priceForTicket - b.flight.priceForTicket);
        var temp2 = new Set<FlightsModule>();

        temp.forEach(element => {
          temp2.add(element);
          
        });

        this.flights = temp2;
        }else if (this.searchForm.get('sortic').value == 'priceup'){
          temp.sort((a,b)=>a.flight.priceForTicket - b.flight.priceForTicket).reverse();
          var temp2 = new Set<FlightsModule>();

          temp.forEach(element => {
            temp2.add(element);
            
          });
  
          this.flights = temp2;
        }

        
      


          
    });
  }
  FilterForCCB(nucmber:number,searched){
    var tempFlights = new Array<FlightsModule>();

    searched.forEach(el => {
      if(el.flight.maxCarryBag >= nucmber ){
        tempFlights.push(el);
      }
    });

    return tempFlights;

  }


  FilterForCB(nucmber:number,searched){
    var tempFlights = new Array<FlightsModule>();

    searched.forEach(el => {
      if(el.flight.maxCheckBag >= nucmber ){
        tempFlights.push(el);
      }
    });

    return tempFlights;

  }

  FilterForPrice(price:number,flight: Set<FlightsModule>){
    var tempFlights = new Array<FlightsModule>();

    flight.forEach(el => {
      if(el.flight.priceForTicket >= price){
        tempFlights.push(el);
      }
    });

    return tempFlights;

  }
  
  FilterForClass(classs: String, flight: any) {
    var tempFlights = new Array<FlightsModule>();

    flight.forEach(el => {
      var item = false
      el.flight.seats.forEach(seat => {
        if (seat.seatClass == classs) {
          item = true;
        }
      });
      if (item) {
        tempFlights.push(el);
      }
    });

    return tempFlights;
  }

  FilterForStops(val:any,flights: Set<FlightsModule>){
    var tempFlights = new Array<FlightsModule>();

    flights.forEach(el => {
      if(val.ns == true){
      if(el.flight.flightStop.length == 0){
        tempFlights.push(el);
      }
    }
    if(val.js == true){
      if(el.flight.flightStop.length == 1){
        tempFlights.push(el);
      }
    }
    if(val.ds == true){
      if(el.flight.flightStop.length > 2){
        tempFlights.push(el);
      }
    }
    });

    return tempFlights;

  }

  ngOnInit() {

    this.type = this.route.snapshot.paramMap.get('type');
    let num = + this.route.snapshot.paramMap.get('num');
    let classs = this.route.snapshot.paramMap.get('class');
    let from = this.route.snapshot.paramMap.get('from');
    let to = this.route.snapshot.paramMap.get('to');
    let takeoff = new Date(this.route.snapshot.paramMap.get('takeoff'));
    this.landing = new Date(this.route.snapshot.paramMap.get('landing'));

    this.avioService.searchFlights(this.type, num, classs, from, to, takeoff, this.landing).subscribe(
      data => {
        alert("dsadas");
        this.flights = data;
        this.flightsCopy = this.flights;
      },
      error => {
        alert('ds');
      }
    )
    this.searchForm.get('ec').setValue(false);
    this.searchForm.get('bc').setValue(false);
    this.searchForm.get('fc').setValue(false);
    this.searchForm.get('js').setValue(false);
    this.searchForm.get('ns').setValue(false);
    this.searchForm.get('ds').setValue(false);
    this.searchForm.get('sortic').setValue("pricelow");
    this.onChanges();
  }

}
