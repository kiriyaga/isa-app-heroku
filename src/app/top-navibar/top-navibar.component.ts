import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UserModule } from '../avio-company/user/user.module';
import { OrderModule } from '../avio-company/order/order.module';
import { AvioCompanyService } from '../services/avio-company.service';
import { HotelCompanyService } from '../services/hotel-company.service';
import { fromStringWithSourceMap } from 'source-list-map';
@Component({
  selector: 'app-top-navibar',
  templateUrl: './top-navibar.component.html',
  styleUrls: ['./top-navibar.component.css'],
  providers: [AuthenticationService]
})
export class TopNavibarComponent implements OnInit {
  isLogin = this.authenticationService.checkSessionUser();
  user : UserModule;
  username : string = "";
  avioOrder:OrderModule;
  hotelOrder:any;
  avioOrderReturn:OrderModule;

  constructor(private router: Router, private hotelService: HotelCompanyService, private authenticationService: AuthenticationService, private toastService : ToastService,private avioService: AvioCompanyService) {}

  ngOnInit() {
    if(this.isLogin) {
      let user = this.authenticationService.getSessionUser();
      if(user != null) {
        this.user = user;
        this.username = user.username;
      } 
    }
  }

  Logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    location.reload(true);
  }


  ShowCart(){
    this.avioOrder = JSON.parse(localStorage.getItem('AvioOrder'));
    this.hotelOrder = JSON.parse(localStorage.getItem('HotelOrder'));
    this.avioOrderReturn = JSON.parse(localStorage.getItem('AvioOrderReturn'));
  }
  DeleteHotel(){
    localStorage.removeItem('HotelOrder');
    this.hotelOrder=null;
  }

  DeleteFlight(){
    localStorage.removeItem('AvioOrder');
    this.avioOrder=null;
  }

  DeleteReturnFlight(){
    localStorage.removeItem('AvioOrderReturn');
    this.avioOrderReturn=null;
  }

  Reservation(){
   var  fr = true;
   var frr=true;
   var hr = true;
    if(this.avioOrder!=null){
    this.avioService.reserveFlight(this.avioOrder).subscribe(
      data=>{
        fr=true;
        localStorage.removeItem('AvioOrder');
      },
      error=>{
        alert("error");
        fr=false;
      }
    )}
    if(this.avioOrderReturn!=null){
      this.avioService.reserveFlight(this.avioOrderReturn).subscribe(
        data=>{
          frr=true;
          localStorage.removeItem('AvioOrderReturn');
        },
        error=>{
          alert("error");
          frr=false;
        }
      )}
    if(this.hotelOrder!=null){
    this.hotelService.makeReservation(this.hotelOrder).subscribe(
      data => {
       hr=true;
       localStorage.removeItem('HotelOrder');
      },
      error => {
       alert('error');
       hr=false;
      }
    )
    }
    if(fr && hr && frr){
        alert("Successful reservations!")
    }

  }

}
