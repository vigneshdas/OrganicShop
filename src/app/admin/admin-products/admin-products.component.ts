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


  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(private route : ActivatedRoute, private poductService : ProductsService) {
     this.getAllProduct();
  }

  refreshproductPagination() {
    console.log("refreshproductPagibation Called")
    this.filteredproducts = this.products
      .map((product, i) => ({id: i + 1, ...product}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.msg =  this.route.snapshot.queryParamMap.get('responseMsg');  
     this.getAllProduct();
  }

  getAllProduct(){
    return this.poductService.getAllProduct()
      .subscribe (resData =>{
          this.products = resData;
          this.filteredproducts =  this.products;
          this.collectionSize = this.filteredproducts.length;
          this.refreshproductPagination();
      })
  }

  deletproduct(productId){
    this.poductService.deletproduct(productId)
    .subscribe(resData=>{
      this.msg = "Deleted successfully";
      this.getAllProduct();
    })
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
