import { Component} from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AdminProduct } from '../model/admin-product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products : Array<AdminProduct>;
  filteredProduct: Array<AdminProduct>;
  
  categoryId;
  
  constructor( private poductService : ProductsService, private route : ActivatedRoute ) {
    this.getAllProduct();
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
}
