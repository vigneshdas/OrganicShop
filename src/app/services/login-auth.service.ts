import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  user$ :  Observable<any>;

  constructor(private afAuth : AngularFireAuth) { 
    /**afAuth.authState.subscribe( authRes =>{
        this.user = (authRes) ? authRes :  null;
    })**/
    this.user$ = afAuth.authState;
  }

  login(){
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout(){
    this.afAuth.signOut();
  }
}
