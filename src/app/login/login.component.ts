import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;
  constructor(private router : Router , private route : ActivatedRoute) { }
  
  
  ngOnInit(): void {

  }

  signIn(form){
    this.router.navigate(['/home']);
  }
}
