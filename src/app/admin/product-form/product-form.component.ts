import { Component, OnInit} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  categories = [];
  responsemsg : String;

  constructor(private router :Router , private categoryService : CategoryService , private prdtService: ProductsService) { 

  }
  ngOnInit(): void {
      this.categoryService.getCategories()
        .subscribe(resData=>{
            
            this.categories = resData;
            console.log(this.categories)
        })
  }

  onSubmit(form){
    this.prdtService.addproduct(form)
      .subscribe(responData => {
        console.log(responData)
        this.responsemsg = "Product added successfully"
        this.router.navigate(['/admin/products/new'] ,{ queryParams: { responseMsg: this.responsemsg } } )
      },error=>{
        console.log("ProductFormComponent-->onSubmit()-->"+error)
    });
  }
}
