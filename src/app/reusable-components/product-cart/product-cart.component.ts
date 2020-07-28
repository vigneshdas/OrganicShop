import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input('shoppingCart') shoppingCart; //: Items;

  @Output('quantChangeEvent') quantChangeEvent = new EventEmitter();

  shopingItemResponse = false;

  constructor(private cartService : ShoppingCartService) { 
  }

  ngOnInit(): void {
    this.cartService.CartTotalItem
      .subscribe(data =>{
        console.log("BehaviorSubject working===="+data);
        if(this.shopingItemResponse) {
          this.shoppingCart = data;
          this.getQuantity();
        }
      })
  }

  addToCart(){
    this.cartService.createCart(this.product); 
    this.shopingItemResponse = true;
  }
  
  getQuantity(){
    if(!this.shoppingCart) return 0 ;
    
    const item = this.shoppingCart.items[this.product.id];
    return (item) ? item.quantity : 0;
  }

 /**  getShoppingItems(){
    this.cartService.getShoppingItems()
      .subscribe((resData: any) => {

    });
  }**/
}
