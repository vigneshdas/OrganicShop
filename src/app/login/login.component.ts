import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../services/login-auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  constructor(private lgAuthServ : LoginAuthService) { }
  
  
  login(){
    this.lgAuthServ.login();
  }
}
