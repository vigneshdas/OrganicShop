import { Component, OnInit, Input } from '@angular/core';
import { AdminProduct } from 'src/app/model/admin-product';

@Component({
  selector: 'product-card',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input('product') product: AdminProduct;
  @Input('showAction') showAction = true; //key is used to enable disable Add to cart button


  constructor() { }

  ngOnInit(): void {
  }

}
