import { Component } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oshop';

  constructor(private lgAuthSer : LoginAuthService,private userServ : UserService, private router : Router){
    lgAuthSer.user$.subscribe( user =>{
        if(user){
          userServ.save(user);
          
          let returnUrl = localStorage.getItem('returnUrl');
          router.navigate([returnUrl || '/'])
        }
    })
  }

}
