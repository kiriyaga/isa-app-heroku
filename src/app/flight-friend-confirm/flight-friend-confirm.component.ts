import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvioCompanyService } from '../services/avio-company.service';

@Component({
  selector: 'app-flight-friend-confirm',
  templateUrl: './flight-friend-confirm.component.html',
  styleUrls: ['./flight-friend-confirm.component.css']
})
export class FlightFriendConfirmComponent implements OnInit {
  
  token:String;
  seat:number;
  flight:number;
  username:string
  constructor(private route: ActivatedRoute, private router: Router, private avioService: AvioCompanyService) { }

  Yes(){
    this.avioService.confirmFlight('YES',this.seat,this.flight,this.token).subscribe(
      data=>{
        alert(data.message)
        this.router.navigate(['/home'])
      },
      error=>{
        alert(error)
        this.router.navigate(['/home'])
      }
    )
  }

  No(){
    this.avioService.confirmFlight('NO',this.seat,this.flight,this.token).subscribe(
      data=>{
        alert(data)
        this.router.navigate(['/home'])
      },
      error=>{
        alert(error)
        this.router.navigate(['/home'])
      }
    )
  }

  ngOnInit() {
    this.token= this.route.snapshot.paramMap.get('token');
    this.seat=+ this.route.snapshot.paramMap.get('id');
    this.flight = +this.route.snapshot.paramMap.get('id2');

    this.avioService.checkConfirm(this.seat,this.flight,this.token).subscribe(
      data=>{
        this.username = data.message
      },
      error=>{
        alert(error)
      }
    )
  }

}
