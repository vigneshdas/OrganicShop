import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from  '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  films = [];
  
   /**constructor( db : AngularFireDatabase){
      db.list('/courses').snapshotChanges()
        
      
      .subscribe(data =>{
           this.films = data;
           console.log(this.films)
        })
        

   }**/

   ngOnInit(): void {
   
  }

   /**constructor(private http : HttpClient){
     
        
   }
  ngOnInit(): void {
    this.getData();
  }
   
   getData(){
      this.http.get<any>("https://fir-testhost-300a1.firebaseio.com/films.json")
      .pipe(
        map(responseData =>{
          console.log(responseData);
          const data = [];
          for(const id in responseData){
            console.log("key=="+id);
            console.log("responseData[key]=="+responseData[id]);
            data.push(responseData[id]);
          }
          return data;
        })
      ).subscribe(responseData=>{
        this.films = responseData;
      })
   }

   saveData(form){
      console.log(form.value);
      this.http.post("https://fir-testhost-300a1.firebaseio.com/films.json",form.value)
        .subscribe(response=>{
          console.log(response);
          this.getData();
        })
   }**/
   
}
