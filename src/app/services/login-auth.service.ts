import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  user$ :  Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth , private router: Router , private route :ActivatedRoute ) { 
    /**afAuth.authState.subscribe( authRes =>{
        this.user = (authRes) ? authRes :  null;
    })**/
    this.user$ = afAuth.authState;
  }

  login(){

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl' || '/')
    localStorage.setItem('returnUrl', returnUrl); //Return URl we are using in App.component
    
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout(){
    this.afAuth.signOut();
  }


  isLoggedIn(){
    
    const helper = new JwtHelperService();
    let token = localStorage.getItem('token');
    console.log("token=="+token)
    if(!token) return false;

    const decodedToken = helper.decodeToken(token);
    console.log("decodedToken=="+decodedToken)
    const expirationDate = helper.getTokenExpirationDate(token);
    console.log("expirationDate=="+expirationDate)
    const isExpired = helper.isTokenExpired(token);
    console.log("isExpired=="+isExpired)

    return !isExpired;
  }

  getAuthUserDetail(){
    let token = localStorage.getItem('token');
    return new JwtHelperService().decodeToken(token);
  }
}
