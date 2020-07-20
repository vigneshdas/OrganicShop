import { Component, OnInit ,PipeTransform  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { AdminProduct } from 'src/app/model/admin-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  msg = null;

  products : Array<AdminProduct>;
  filteredproducts : Array<AdminProduct>;

  constructor(private route : ActivatedRoute, private poductService : ProductsService) {
     this.getAllProduct();
    
  }

  ngOnInit(): void {
    this.msg =  this.route.snapshot.queryParamMap.get('responseMsg');  
     this.getAllProduct();
  }

  getAllProduct(){
    console.log();
    return this.poductService.getAllProduct()
      .subscribe (resData =>{
          this.products = resData;
          this.filteredproducts =  this.products;
      })
  }

  deletproduct(productId){
    this.poductService.deletproduct(productId)
    .subscribe(resData=>{
      console.log("deletproduct=="+resData)
      this.msg = "Deleted successfully";
      this.getAllProduct();
    })
  }

  filter(query){
    this.filteredproducts = 
    (query) ? this.products.
        filter(p => {
          console.log(p.title)
          p.title.toLowerCase().includes(query.toLowerCase)
        
        }) 
     : this.products;
  }

  search(text: string)  {
    this.filteredproducts =  this.products.filter(product => {
          const term = text.toLowerCase();
          return product.title.toLowerCase().includes(term)
              ||  product.price.toString().includes(term)
              ||  product.category.toString().includes(term)
    });
  }
     
}
