import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories : Array<Category>;
  @Input('categoryId') categoryId;

  constructor(private categoryService : CategoryService) { 
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

  getAllCategories(){
    this.categoryService.getCategories()
    .subscribe(resData=>{
       this.categories = resData;
    })
  }

}
