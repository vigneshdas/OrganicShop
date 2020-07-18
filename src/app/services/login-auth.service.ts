import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable ,of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router, ActivatedRoute } from '@angular/router';
import { AppUser } from '../model/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  user$ :  Observable<firebase.User>;
  uId : String;

  constructor(
    private afAuth : AngularFireAuth , 
    private router: Router , 
    private route :ActivatedRoute , 
    private userServ : UserService 
  ) { 
   
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

  get appUser$() : Observable <AppUser>{
    return this.user$
      .pipe(
        switchMap ( user =>{
            if(user) 
              return this.userServ.getDataById(user.uid);
            return of(null);

        })
      )
  }
  
}
