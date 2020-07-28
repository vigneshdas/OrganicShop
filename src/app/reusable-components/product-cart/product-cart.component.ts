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

  shopingItemResponse = true;

  constructor(private cartService : ShoppingCartService) { 
  }

  ngOnInit(): void {
   
  }

  addToCart(){
    this.cartService.createCart(this.product); 
    this.getShoppingItems();
  }
  
  getQuantity(){
    if(!this.shoppingCart) return 0 ;
    
    const item = this.shoppingCart.items[this.product.id];
    return (item) ? item.quantity : 0;
  }

  getShoppingItems(){
    this.cartService.getShoppingItems()
      .subscribe((resData: any) => {
        this.shoppingCart = resData;
        this.getQuantity(); 
    });
  }
}
