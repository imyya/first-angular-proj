import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 private baseUrl= 'http://127.0.0.1:8000/atelier-api'
  constructor(private http: HttpClient) { }
  getCategData(page:number){
    return this.http.get(`${this.baseUrl}/categories/show?page=`+page)
  }

  postData(data:any){
    return this.http.post(`${this.baseUrl}/categories/store`,data)

  }
}
