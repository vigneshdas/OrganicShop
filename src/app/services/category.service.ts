import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get('https://onlineshoppingapp-314d6.firebaseio.com/categories.json')
      .pipe(
        map(resData =>{
            const  tempData = [];
            for(const key in resData){
              tempData.push({...resData[key] , id : key});
            }
            console.log("Http Call for Category fetch=="+tempData)
            return tempData;

        })
      )    
  }
}
