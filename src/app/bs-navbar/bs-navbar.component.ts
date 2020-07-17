import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{

  user :  any;
  closeResult = '';

  constructor(private afAuth : AngularFireAuth , private modalService: NgbModal) { 
    afAuth.authState.subscribe( authRes =>{
        this.user= (authRes) ? authRes :  null;
    })
  }

  login(){
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout(){
    console.log("Logout Called")
    this.afAuth.signOut();
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
