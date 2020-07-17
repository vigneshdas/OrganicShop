import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient, private db : AngularFireDatabase) { }


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
}
