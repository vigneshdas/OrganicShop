import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminProduct } from '../model/admin-product';
import { Items } from '../model/items';
import { cart } from '../model/cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private http : HttpClient) { }

  url = "https://onlineshoppingapp-314d6.firebaseio.com/";
  cartId = {};
  shoppingCartItem;

  createCart(product : AdminProduct){
    this.cartId = this.getCartIdFromLocalStorage();
    console.log("createCart()-->this.cartId=="+this.cartId)
    if(this.cartId)
       return this.updateOrSaveProduct(product,this.cartId);
        
     this.createCartAndSaveProduct(product);   
  }

  createCartAndSaveProduct(product : AdminProduct){
    console.log("createCartAndSaveProduct() Called")
    this.http.post(this.url+"shoppingCart.json", 
    {'createdDate' : new Date(), 
      'items' :{
          [product.id] :{
            'product' : product,
            'quantity' : 1
          }
          
      }
    })
    .subscribe( (resData : cart)=>{
      console.log("createCartAndSaveProduct() Adding Cart to Local storeage")
      this.addCartToLocalStorage(resData.name);
    })
  }

  updateOrSaveProduct(product : AdminProduct, cartId ){
    console.log("updateOrSaveProduct() Called")
    this.http.get(this.url+"shoppingCart/"+cartId+"/items/"+product.id+".json")
      .subscribe((resData : Items) =>{
        if(resData){ //Product already exists in cart
          console.log("Product already exists in cart=="+product.id)
          this.updateProduct(product, cartId, resData.quantity+1);
        }else{
          this.updateProduct(product, cartId, 1);
        }
      });
  }

  updateProduct(product : AdminProduct, cartId , quantity){
      this.http.put(this.url+"shoppingCart/"+cartId+"/items/"+product.id+".json",{product: product , quantity : quantity})
      .subscribe(resData=>{
         console.log("updateProduct===="+resData);
      },
      error => {  
        console.log("updateProduct Error===="+error);                            
        console.error('error caught in component=='+error)
      }) 
  }

  addCartToLocalStorage(cartId){
      localStorage.setItem("cartId",cartId);
  }

  getCartIdFromLocalStorage(){
    return localStorage.getItem("cartId");
  }

  getShoppingItems(){
      let cartId = this.getCartIdFromLocalStorage();
      return this.http.get(this.url+"shoppingCart/"+cartId+".json");  
  }
}
