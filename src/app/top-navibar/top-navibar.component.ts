import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { UserModule } from '../avio-company/user/user.module';
import { OrderModule } from '../avio-company/order/order.module';
import { AvioCompanyService } from '../services/avio-company.service';
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

  constructor(private router: Router, private authenticationService: AuthenticationService, private toastService : ToastService,private avioService: AvioCompanyService) {}

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
    var hotelOrder;
    var carOrder;
  }

  DeleteFlight(){
    localStorage.removeItem('AvioOrder');
    this.avioOrder=null;
  }

  Reservation(){
    if(this.avioOrder!=null){
    this.avioService.reserveFlight(this.avioOrder).subscribe(
      data=>{
        alert(data.message);
        localStorage.removeItem('AvioOrder');
      },
      error=>{
        alert("error");
      }
    )}
  }

}
