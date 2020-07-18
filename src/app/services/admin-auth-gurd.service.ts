import { Injectable } from '@angular/core';
import { LoginAuthService } from './login-auth.service';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGurdService implements CanActivate{

  constructor(private userServ : UserService , private lgAuth : LoginAuthService) { }

  isAdmin : boolean

  canActivate(){
    return this.lgAuth.user$
      .pipe(
        switchMap ( user =>{
            return this.userServ.getDataById(user.uid);
        })
        ,map(data => {
          console.log("AdminAuthGurdService==is Adfmin=="+data.isAdmin);
          return data.isAdmin;
        })
      )
     
  }
}
