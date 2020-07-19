import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addproduct(product){
    return this.http.post('https://onlineshoppingapp-314d6.firebaseio.com/products.json', product);
  }
}
