import { Component} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LoginAuthService } from '../services/login-auth.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{

  user$ :  Observable<firebase.User>;
  closeResult = '';

  constructor(private loginAuth:LoginAuthService , private modalService: NgbModal  ) { 
    this.user$ = loginAuth.user$;
  }

  login(){
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
