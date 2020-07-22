import { Component, OnInit, Input } from '@angular/core';
import { AdminProduct } from '../model/admin-product';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input('filteredProduct') filteredProduct: Array<AdminProduct>;

  constructor() { }

  ngOnInit(): void {
  }

}
