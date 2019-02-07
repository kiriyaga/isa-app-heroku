import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { ToastService } from '../services/toast.service';
import { FriendModule } from '../avio-company/friend/friend.module';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserModule } from '../avio-company/user/user.module';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  currentFriends: Array<FriendModule>
  pendingFriends: Array<FriendModule>
  errorMessage: string;
  searchUsers: Array<UserModule>
  user: UserModule;
  search = new FormGroup({
    input: new FormControl(''),
  });


  constructor(private friendsService: FriendsService, private toastService: ToastService,private authenticationService: AuthenticationService) { }

Deny(item:FriendModule){
  this.friendsService.DenyFriend(item).subscribe(
    data => {
      this.friendsService.showFriendRequests().subscribe(
        data => {
          this.pendingFriends = data;
        },
        error => {
          this.toastService.showError("Error pending friends", "4Flights");
        })
  
      this.friendsService.showCurrentFriends().subscribe(
        data => {
          this.currentFriends = data;
        },
        error => {
          this.toastService.showError("Error current friends", "4Flights");
        })
      this.toastService.showSuccess("Friend is denied!", "4Flights");
    },
    error => {
      this.toastService.showError("Error for deny!", "4Flights");
    }
  )
}

  Accept(item:FriendModule){

    this.friendsService.AcceptFriendRequest(item).subscribe(
      data => {
        this.friendsService.showFriendRequests().subscribe(
          data => {
            this.pendingFriends = data;
          },
          error => {
            this.toastService.showError("Error pending friends", "4Flights");
          })
    
        this.friendsService.showCurrentFriends().subscribe(
          data => {
            this.currentFriends = data;
          },
          error => {
            this.toastService.showError("Error current friends", "4Flights");
          })
      this.toastService.showSuccess("Friend is accepted!", "4Flights");
      },
      error => {
        this.toastService.showError("Error for accept!", "4Flights");
      }
    )
  }

  AddFriend(item:UserModule){
    alert(item.username);

    this.friendsService.SendFriendRequest(item.username).subscribe(
      data => {
        this.friendsService.showFriendRequests().subscribe(
          data => {
            this.pendingFriends = data;
          },
          error => {
            this.toastService.showError("Error pending friends", "4Flights");
          })
    
        this.friendsService.showCurrentFriends().subscribe(
          data => {
            this.currentFriends = data;
          },
          error => {
            this.toastService.showError("Error current friends", "4Flights");
          })
        this.toastService.showSuccess("Friend is added!", "4Flights");
      },
      error => {
        this.toastService.showError("Error for adding friend", "4Flights");
      }
    )
  }

  Search(){
    alert(this.search.get('input').value);

    this.friendsService.SearchUseres(this.search.get('input').value).subscribe(
      data => {
        this.searchUsers = data;
      },
      error => {
        this.toastService.showError("Error pending friends", "4Flights");
      }
    )

   

  }
  ngOnInit() {

    this.user = this.authenticationService.getSessionUser();

    this.friendsService.showFriendRequests().subscribe(
      data => {
        this.pendingFriends = data;
      },
      error => {
        this.toastService.showError("Error pending friends", "4Flights");
      })

    this.friendsService.showCurrentFriends().subscribe(
      data => {
        this.currentFriends = data;
      },
      error => {
        this.toastService.showError("Error current friends", "4Flights");
      })
  }



}
