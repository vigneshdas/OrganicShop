import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  msg = null;

  products$ : Observable<any>;

  constructor(private route : ActivatedRoute, private poductService : ProductsService) {
    this.products$ = this.getAllProduct();
    
  }

  ngOnInit(): void {
    this.msg =  this.route.snapshot.queryParamMap.get('responseMsg');  
    this.products$ = this.getAllProduct();
  }

  getAllProduct(){
    console.log();
    return this.poductService.getAllProduct();;
  }

  deletproduct(productId){
    this.poductService.deletproduct(productId)
    .subscribe(resData=>{
      console.log("deletproduct=="+resData)
      this.msg = "Deleted successfully";
      this.getAllProduct();
    })
  }
     
}
