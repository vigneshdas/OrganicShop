import { Component} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../services/login-auth.service';
import { AppUser } from '../model/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{

  user$ :  Observable<firebase.User>;
  appUser$ : Observable<AppUser>;
  closeResult = '';

  constructor(private loginAuth:LoginAuthService , private modalService: NgbModal  ) { 
    this.user$ = loginAuth.user$;
    this.appUser$ = loginAuth.appUser$
            
  }

  login(){
    console.log("Login Called");
    this.loginAuth.login();
  }

  logout(){
    this.loginAuth.logout();
  }


  /**
   * 
   * @param content 
   * Below Code is to display Popup to login via google
   */

  open(content) {
    console.log("Open method Called=="+content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
