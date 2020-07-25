import { Component, OnInit, Input } from '@angular/core';
import { AdminProduct } from 'src/app/model/admin-product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  @Input('product') product: AdminProduct;
  @Input('showAction') showAction = true; //key is used to enable disable Add to cart button


  constructor(private cartService : ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product : AdminProduct){
     console.log("product==="+product.category+"==Price=="+product.price+"==="+product.title);
     this.cartService.createCart(product);
  }

}
