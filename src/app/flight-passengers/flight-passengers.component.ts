import { Component, OnInit } from '@angular/core';
import { OrderModule } from '../avio-company/order/order.module';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvioCompanyService } from '../services/avio-company.service';

@Component({
  selector: 'app-flight-passengers',
  templateUrl: './flight-passengers.component.html',
  styleUrls: ['./flight-passengers.component.css']
})
export class FlightPassengersComponent implements OnInit {
  order: OrderModule;
  items: FormArray;
  orderForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private avioService: AvioCompanyService) { }


  Reserve() {

    this.order.owner = JSON.parse(localStorage.getItem('sessionUser'));
    let informations = JSON.parse(localStorage.getItem('order'));
    for (let index = 0; index < this.items.length; index++) {
      var f = this.getItemsFormGroup(index);
      this.order.seats[index].name = f.controls['name'].value;
      this.order.seats[index].lastname = f.controls['lastname'].value;
      this.order.seats[index].carryBagCount=f.controls['carryBag'].value;
      this.order.seats[index].checkBagCount=f.controls['checkBag'].value;
      this.order.seats[index].passport = f.controls['passport'].value;
    }
    localStorage.setItem('AvioOrder', JSON.stringify(this.order));


    if (this.order.mode == 'rw') {
      this.router.navigate(['/avio/search/ONE-WAY/1/ECONOMIC/' + this.order.flight.endDestination.location.adress + '/' + this.order.flight.startDestination.location.adress + '/' + this.order.flight.endDestination.takeOff + '/' + this.order.flight.endDestination.takeOff]);
    }
    else {
      if (this.order.fastReserve == null) {
        this.router.navigate(['/hotels']);
      }
      if (this.order.fastReserve == true) {

      this.avioService.reserveFlight(this.order).subscribe(
        data => {
          alert(data.message);
          this.router.navigate(['/avio']);
        },
        error => {
          alert("error");
        }
      )
    }

    }
  }
  getSeatCode(i: number) {
    return this.order.seats[i].seatCode;
  }

  // contact formgroup
  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      passport: ['', Validators.required],
      carryBag: ['',[Validators.required,Validators.max(this.order.flight.maxCarryBag),Validators.min(0)]],
      checkBag:['',[Validators.required,Validators.max(this.order.flight.maxCheckBag),Validators.min(0)]]
     
    });
  }

  getItemsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    var formGroup = this.items.controls[index] as FormGroup;
    return formGroup;
  }

  ngOnInit() {

    this.order = JSON.parse(localStorage.getItem('order'));
    if (this.order == null) {
      this.router.navigate(['/avio']);
    }

    this.orderForm = this.fb.group({
      customerName: '',
      email: '',
      items: this.fb.array([])
    });

    this.items = this.orderForm.get('items') as FormArray;

    this.order.seats.forEach(element => {
      this.addItem();

    });


    let sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (sessionUser && sessionUser.token) {
      //postoji user popuni prvu formu
      var i = this.getItemsFormGroup(0);
      i.get('name').setValue(sessionUser.name);
      i.get('lastname').setValue(sessionUser.lastName);

      for (let index = 0; index < this.order.friends.length; index++) {
        var ix = this.getItemsFormGroup(index + 1);
        ix.get('name').setValue(this.order.friends[index].name);
        ix.get('lastname').setValue(this.order.friends[index].lastName);

      }

    }


  }

  clearSelected() {
    localStorage.removeItem('order');
    this.router.navigate(['/avio']);

  }

  addItem() {

    this.items.push(this.createItem());
  }

}
class Book {
  name: string;
  lastname: string;
  passport: string;
  constructor() {
  }
}