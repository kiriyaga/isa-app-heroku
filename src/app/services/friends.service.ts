import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { FriendModule } from '../avio-company/friend/friend.module';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient, private router: Router) { }

  showFriendRequests() {
    return this.http.get<any>(environment.apiUrl + '/auth/profile/getFriendRequests', {
    }).pipe(map(pendingFriends => {
      return pendingFriends;
    }
    ));
  }

  showCurrentFriends() {
    return this.http.get<any>(environment.apiUrl + '/auth/profile/getFriends', {
    }).pipe(map(currentFriends => {
      return currentFriends;
    }
    ));
  }

  SearchUseres(search:String) {
    return this.http.get<any>(environment.apiUrl + '/auth/profile/SearchUsers/' + search).pipe(map(users => {
      return users;
    }
    ));
  }

  SendFriendRequest(search:String) {
    return this.http.post<any>(environment.apiUrl + '/auth/profile/sendFriendRequest',search).pipe(map(users => {
      return users;
    }
    ));
  }

  AcceptFriendRequest(search:FriendModule) {
    return this.http.post<any>(environment.apiUrl + '/auth/profile/acceptFriendship',search).pipe(map(users => {
      return users;
    }
    ));
  }
  DenyFriend(search:FriendModule) {
    return this.http.post<any>(environment.apiUrl + '/auth/profile/denyFriendship',search).pipe(map(users => {
      return users;
    }
    ));
  }

}
