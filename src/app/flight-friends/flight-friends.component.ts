import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FriendsService } from '../services/friends.service';
import { ToastService } from '../services/toast.service';
import { FriendModule } from '../avio-company/friend/friend.module';

import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { OrderModule } from '../avio-company/order/order.module';
import { UserModule } from '../avio-company/user/user.module';

@Component({
  selector: 'app-flight-friends',
  templateUrl: './flight-friends.component.html',
  styleUrls: ['./flight-friends.component.css']
})
export class FlightFriendsComponent implements OnInit {

  constructor(private router: Router, private friendsService: FriendsService, private toastService: ToastService, private authenticationService: AuthenticationService) { }
  currentFriends: Array<FriendModule>
  invitedFriends: Array<FriendModule> = new Array<FriendModule>();
  search = new FormGroup({
    input: new FormControl(''),
  });
  searchFriends: Array<FriendModule> = new Array<FriendModule>();
  order: OrderModule;

  Search() {
    var splitted = this.search.get('input').value.split(" ", 2);
    this.searchFriends = [];
    this.currentFriends.forEach(element => {
      if (element.friendTwo.name.match(splitted[0]) && element.friendTwo.lastName.match(splitted[1])) {
        this.searchFriends.push(element);
      }

    });

  }

  getStatus(item: FriendModule) {
    var index = this.invitedFriends.indexOf(item);
    if (index == -1) {
      return "notinvited";
    }
    else {
      return "invited"
    }
  }

  Invite(item: FriendModule) {
    if (this.order.seats.length > this.invitedFriends.length + 1) {
      this.invitedFriends.push(item);
    }
  }
  NotInvite(item: FriendModule) {
    var invite = new Array<FriendModule>();
    var index = this.invitedFriends.indexOf(item);
    delete this.invitedFriends[index];

    this.invitedFriends.forEach(element => {
      if (element != null) {
        invite.push(element);
      }
    })
      this.invitedFriends= [];
      this.invitedFriends = invite;
   
  }

  showSelected(){
    var temp = new Array<UserModule>();
    this.invitedFriends.forEach(element => {
      var user:UserModule= new UserModule();
      user.username=element.friendTwo.username;
      user.name=element.friendTwo.name;
      user.lastName=element.friendTwo.lastName;
      temp.push(user);
    });
    this.order.friends= temp;
    localStorage.setItem('order', JSON.stringify(this.order));
    this.router.navigate(['/avio/passengers']);


  }

  clearSelected(){
    localStorage.removeItem('order');
    this.router.navigate(['/avio']);

  }


  ngOnInit() {

    this.order = JSON.parse(localStorage.getItem('order'));
    if (this.order == null) {
      this.router.navigate(['/avio']);
    }
    if (this.order.seats.length < 2) {
      this.router.navigate(['/avio/passengers']);
    }


    this.friendsService.showCurrentFriends().subscribe(
      data => {
        this.currentFriends = data;
      },
      error => {
        this.toastService.showError("Error current friends", "4Flights");
      })

  }


}
