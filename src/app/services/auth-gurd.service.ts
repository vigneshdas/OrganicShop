import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginAuthService } from './login-auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGurdService implements CanActivate {

  constructor(private router : Router, private loginAuthservice : LoginAuthService) { }

  /**
   * Now lets say user logged in with URL http://localhost:4200/admin
   * If user not loged in then code is bnavigating to Login Page
   * So once loged in it will again navigate to Home and not to the URL pasted by User i.e. admin in this case
   * 
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("AuthGurdService called=="+this.loginAuthservice.user$)
      return this.loginAuthservice.user$
        .pipe(
           map( user =>{
              if(user) return true;
              this.router.navigate(['/'],{queryParams : {returnUrl : state.url }});
              return false;    
           })
        )
     
  }
}
