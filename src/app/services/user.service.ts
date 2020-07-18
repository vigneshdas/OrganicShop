import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../model/app-user';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private db : AngularFireDatabase) { }

  appUser : AppUser;

  save(user : firebase.User){
    /**this.http.post('https://onlineshoppingapp-314d6.firebaseio.com/users.json', 
      {
        name : user.displayName,
        email : user.email
      }
    ).subscribe(response =>{
        console.log(response)
    })**/

    this.db.object('/users/' + user.uid).update({
        name : user.displayName,
        email : user.email
    });
  }

  getDataById(uId : String )  {
    return this.http.get<AppUser>('https://onlineshoppingapp-314d6.firebaseio.com/users/'+uId+'.json');
  }
}
