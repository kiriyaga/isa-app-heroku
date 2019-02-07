import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CompanyModule } from '../hotel-company/company/company.module';
import { Router } from '@angular/router';
import { HotelCompanyService } from '../services/hotel-company.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  allComp: Array<CompanyModule>;

  searchForm = new FormGroup({
    hotelName: new FormControl(''),
    hotelLocation: new FormControl(''),
    checkInDate: new FormControl(new Date()),
    checkOutDate: new FormControl(new Date()),
  });

  constructor(private hotelService: HotelCompanyService, private router: Router) { }

  ngOnInit() {

    this.getAllHotels();
  }

  public getRoomsByParameters() {

    let hotelName = this.searchForm.get('hotelName').value;
    let hotelLocation = this.searchForm.get('hotelLocation').value;
    let checkInDate = this.searchForm.get('checkInDate').value;
    let checkOutDate = this.searchForm.get('checkOutDate').value;

    if (hotelName === "") {
      hotelName = "null";
    }

    if (hotelLocation === "") {
      hotelLocation = "null";
    }

    alert("name: " + hotelName + ", address: " + hotelLocation + ", in: " + checkInDate + ", out: " + checkOutDate);
    this.router.navigate(['/hotels/search/'+ hotelName +'/' + hotelLocation+ '/' + checkInDate + '/' + checkOutDate]);
  }

  private getAllHotels() {

    this.resetSearchFields();

    this.hotelService.getCompanies().subscribe(
      data => {
        this.allComp = data;
      },
      error => {
        this.router.navigate(['/hotel']);
      }
    )
  }

  private resetSearchFields() {

    this.searchForm.get("hotelName").reset();
    this.searchForm.get("hotelLocation").reset();
    this.searchForm.get("checkInDate").setValue(new Date());
    this.searchForm.get("checkOutDate").setValue(new Date());
  }

}
