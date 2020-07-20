import { Component, OnInit} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AdminProduct } from 'src/app/model/admin-product';
 

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  categories = [];
  responsemsg : String;
  product : AdminProduct = new AdminProduct();
  productId;
  isUpdate : boolean;

  constructor(private router :Router , private route : ActivatedRoute, private categoryService : CategoryService , private prdtService: ProductsService) { 
     this.isUpdate = false;
     this.productId = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
     this.getAllCategories();
     if(this.productId) this.getProductDetailById(this.productId);
  }

  getAllCategories(){
      this.categoryService.getCategories()
      .subscribe(resData=>{
          this.categories = resData;
      })
  }

  getProductDetailById(id){
    if(id){
      this.isUpdate = true;
      this.prdtService.getProductById(id)
        .pipe(
          take(1)  //It will fetch 1 data and unsubsribe observable automatically
        ).subscribe((resData :AdminProduct) => this.product = resData);
    }
  }

  back(){
    this.router.navigate(['/admin/products']);
  }

  saveOrUpdate(form : NgForm){
    console.log("saveOrUpdate Called");
    console.log("form.status==")
      this.getAddOrUpdateService(form)
      .subscribe(responData => {
        this.responsemsg = "Product added successfully"
        this.router.navigate(['/admin/products'] ,{ queryParams: { responseMsg: this.responsemsg } } )
      },error=>{
        console.log("ProductFormComponent-->onSubmit()-->"+error)
    });
  }

  getAddOrUpdateService(form){
    console.log("getAddOrUpdateService Called with this.isUpdate=="+this.isUpdate);
    if(!this.isUpdate)
      return this.prdtService.addProduct(form);
    else
      return this.prdtService.updateProduct(form,this.productId);
  }
}
