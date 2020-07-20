import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AdminProduct } from '../model/admin-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  url = "https://onlineshoppingapp-314d6.firebaseio.com/products";

  addProduct(product){
    console.log("addProduct Caleddd")
    return this.http.post(this.url+'.json', product);
  }

  updateProduct(product, productId){
    console.log("Update Product Caleddd")
    return this.http.put(this.url+'/'+productId+'.json', product);
  }

  deletproduct(productId){
    console.log("deletproduct called =="+this.url+'/'+productId+'.json')
    return this.http.delete(this.url+'/'+productId+'.json');
  }

  getAllProduct(){
    return this.http.get(this.url+'.json')
      .pipe(
        map(resdata =>{
            const  tempData = [];
            for(const key in resdata){
              tempData.push({...resdata[key] , id:key});
            }
            return tempData;  
        })
      )
  }

  getAllProduct1(){
    return this.http.get(this.url+'.json')
      .pipe(
        map((resdata : AdminProduct[]) =>{
           return resdata;
        })
      )
  }

  getProductById(productId){
    console.log("getProductById=="+this.url+'/'+productId+'.json')
    return this.http.get(this.url+'/'+productId+'.json')
    .pipe(
      map((resdata : AdminProduct) =>{
         console.log("data==="+resdata)
         return resdata;
      })
    )
  }
}
