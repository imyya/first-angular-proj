import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';


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

  deleteData(data: number[]) {
    const url = `${this.baseUrl}/categories/delete`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const requestBody = { ids: data }; // Sending the array as an object
  
    return this.http.delete(url, { ...options, body: requestBody });
  }

  
  updateData(id: number, newData: any): any {
    const url = `${this.baseUrl}/categories/update/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(url, newData, options);
  }

  
  
}
