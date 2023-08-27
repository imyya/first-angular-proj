import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './interface/response';
import { Category } from './interface/category';
import { Data } from './interface/data';
import { CategoryResponse } from './interface/category-response';
import { ResponseService } from './response.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ResponseService<Response<CategoryResponse>> {
//  private baseUrl= 'http://127.0.0.1:8000/atelier-api'
  // getCategData(page:number) :Observable<Response<CategoryResponse>>{
  //   return this.http.get<Response<CategoryResponse>>(`${this.baseUrl}/categories/show?page=`+page)
  // }

  // postData(data:Category){
  //   return this.http.post(`${this.baseUrl}/categories/store`,data)

  // }

  // deleteData(data: number[]) {
  //   const url = `${this.baseUrl}/categories/delete`;
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   const requestBody = { ids: data }; // Sending the array as an object
  
  //   return this.http.delete(url, { ...options, body: requestBody });
  // }
  // allcategs(){
  //   return this.http.get(`${this.baseUrl}/categories/all`)

  // }

  
  // updateData(id: number, newData: Category ): Observable<Response<Category>> {
  //   const url = `${this.baseUrl}/categories/update/${id}`;
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };

  //   return this.http.put<Response<Category>>(url, newData, options);
  // }


  protected uri(): string {
    return 'http://127.0.0.1:8000/atelier-api/categories';
  }
}
  

