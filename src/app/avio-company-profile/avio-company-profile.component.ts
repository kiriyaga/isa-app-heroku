import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvioCompanyService } from '../services/avio-company.service'
import { AvioCompanyModule } from '../avio-company/avio-company.module'

import { CompanyModule } from '../avio-company/company/company.module';
import { SeatModule } from '../avio-company/seat/seat.module';
import { DatePipe } from '@angular/common';
import { FlightModule } from '../avio-company/flight/flight.module';
import { FastSeatModule } from '../avio-company/fast-seat/fast-seat.module';
import { OrderModule } from '../avio-company/order/order.module';
import { FlightStopModule } from '../avio-company/flight-stop/flight-stop.module';


@Component({
  selector: 'app-avio-company-profile',
  templateUrl: './avio-company-profile.component.html',
  styleUrls: ['./avio-company-profile.component.css']
})
export class AvioCompanyProfileComponent implements OnInit {


  id: number;
  company: CompanyModule;
  fastSeats: Array<FastSeatModule> = new Array<FastSeatModule>();
  flightStop:FlightStopModule;



  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd'); //whatever format you need. 
  }

  constructor(private route: ActivatedRoute, private router: Router, private avioService: AvioCompanyService,private datePipe: DatePipe) {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.avioService.getCompany(this.id).subscribe(

      data => {
        this.company = data;
        for (let index = 0; index < this.company.flights.length; index++) {
          for (let j = 0; j < this.company.flights[index].seats.length; j++) {
            if (this.company.flights[index].seats[j].seatType == 'FASTRESERVE') {
              var fm = new FastSeatModule();
              fm.flight=this.company.flights[index];
              fm.seat=this.company.flights[index].seats[j]
              this.fastSeats.push(fm);
            }

          }

        }
      },
      error => {
        this.router.navigate(['/avio']);
      }
    )

  }

  ngOnInit() {

  }

  public Reserve(item:FlightModule){
    this.router.navigate(['/avio/seats/'+item.id+'/ow/None']);
  }

  FastReserve(item){
    var o= new OrderModule();
    o.company= this.company;
    o.fastReserve=true;
    o.flight = item.flight;
    o.mode='ow';
    if(JSON.parse(localStorage.getItem('sessionUser')) != null) {
     o.owner = JSON.parse(localStorage.getItem('sessionUser'));
  }
    o.seats = new Array<SeatModule>();
    o.seats.push(item.seat);
    localStorage.setItem('order', JSON.stringify(o));
    this.router.navigate(['/avio/passengers']);
  }

  StopModal(item){
    this.flightStop = item;
  }

}
