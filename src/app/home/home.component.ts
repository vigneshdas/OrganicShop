import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';
import { ProductsService } from '../services/products.service';
import { AdminProduct } from '../model/admin-product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : Array<AdminProduct>;
  filteredProduct: Array<AdminProduct>;
  categories : Array<Category>;
  categoryId;
  
  constructor(private categoryService : CategoryService , private poductService : ProductsService, private route : ActivatedRoute ) {
    this.getAllCategories();
    this.getAllProduct();

    console.log("categoryId=="+this.categoryId)
  }

  ngOnInit(): void {
    
  }

  getAllCategories(){
    this.categoryService.getCategories()
    .subscribe(resData=>{
       this.categories = resData;
    })
  }

  getAllProduct(){
    return this.poductService.getAllProduct()
      .pipe(
        switchMap(resData =>{
          this.filteredProduct = this.products = resData
          return this.route.queryParamMap;
        })
      )
      .subscribe (category =>{
          this.categoryId = category.get('category');
          this.filteredProduct = 
            (this.categoryId && this.categoryId !== 'All') ? this.products.filter(p => p.category === this.categoryId) : this.products;
        
      })
  }

  getProductBtCategory(categoryId){
    console.log("categoryId=="+categoryId)
  }



}
