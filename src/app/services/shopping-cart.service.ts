import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminProduct } from '../model/admin-product';
import { Items } from '../model/items';
import { cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http : HttpClient) { }

  url = "https://onlineshoppingapp-314d6.firebaseio.com/";
  cartId = {};

  createCart(product : AdminProduct){
    this.cartId = this.getCartIdFromLocalStorage();
    if(this.cartId)
        return this.updateOrSaveProduct(product,this.cartId);
        
    this.createCartAndSaveProduct(product);   
  }

  createCartAndSaveProduct(product : AdminProduct){
    console.log("createCartAndSaveProduct Called");
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
      this.addCartToLocalStorage(resData.name);
    })
  }

  updateOrSaveProduct(product : AdminProduct, cartId ){
    this.http.get(this.url+"shoppingCart/"+cartId+"/items/"+product.id+".json")
      .subscribe((resData : Items) =>{
        if(resData){ //Product already exists in cart
           this.updateProduct(product, cartId, resData.quantity+1);
        }else{
          this.updateProduct(product, cartId, 1);
        }
      })      
  }

  updateProduct(product : AdminProduct, cartId , quantity){
      console.log("updateProduct Caaled quantity=="+quantity)
      this.http.put(this.url+"shoppingCart/"+cartId+"/items/"+product.id+".json",{product: product , quantity : quantity})
      .subscribe(resData=>{
        console.log("Product Updated with quantity=="+quantity+1)
      },
      error => {                              
        console.error('error caught in component=='+error)
      }) 
  }

  addCartToLocalStorage(cartId){
      console.log("addCartToLocalStorage Called=="+cartId)
      localStorage.setItem("cartId",cartId);
  }

  getCartIdFromLocalStorage(){
    console.log("getCartIdFromLocalStorage Called"+localStorage.getItem("cartId"))
    return localStorage.getItem("cartId");
  }

  formJson(key , value){
    if(key === 'createCart'){
        return ""
    }
  }
}
