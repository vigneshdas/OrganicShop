import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AdminProduct } from '../model/admin-product';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  products : Array<AdminProduct>;
  filteredProduct: Array<AdminProduct>;
  categoryId;
  shoppingCart;

  constructor( private poductService : ProductsService, private route : ActivatedRoute, private cartService : ShoppingCartService ) {
    
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getShoppingItems();
  }

  getAllProduct(){
    return this.poductService.getAllProduct()
      .pipe(
        switchMap(resData =>{
          this.filteredProduct = this.products = resData
          return this.route.queryParamMap;
        })
      ).subscribe (category =>{
          this.categoryId = category.get('category');
          this.filteredProduct = 
            (this.categoryId && this.categoryId !== 'All') ? this.products.filter(p => p.category === this.categoryId) : this.products;
      })
  }

  getShoppingItems(){
    this.cartService.getShoppingItems()
      .subscribe((resData: any) => {
        this.shoppingCart = resData;
    });
  }
}
