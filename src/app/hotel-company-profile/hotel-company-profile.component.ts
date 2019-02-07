import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyModule } from '../avio-company/company/company.module';
import { DatePipe } from '@angular/common';
import { HotelCompanyService } from '../services/hotel-company.service';
import { RoomModule } from '../hotel-company/room/room.module';

@Component({
  selector: 'app-hotel-company-profile',
  templateUrl: './hotel-company-profile.component.html',
  styleUrls: ['./hotel-company-profile.component.css']
})
export class HotelCompanyProfileComponent implements OnInit {

  id: number;
  company: CompanyModule;
  fastSeats:any;

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

  }

  ngOnInit() { }

  /*
  public Reserve(item: RoomModule) {
    this.router.navigate(['/avio/seats/' + item.id + '/ow/None']);
  }

  public FastReserve(item) {

    this.router.navigate(['/hotel/passengers']);
  }
  */

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd'); //whatever format you need. 
  }

}
