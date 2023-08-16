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
  allcategs(){
    return this.http.get(`${this.baseUrl}/categories/all`)

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

  getArticleData(page:number){
    return this.http.get(`${this.baseUrl}/articles/all?page=`+page)
  }

  getFournisseur(){
    return this.http.get(`${this.baseUrl}/fournisseurs/all`)
  }

  countArticles(id:number){
    return this.http.get(`${this.baseUrl}/articles/${id}`)

  }

  addArticle(articleData: any) {
    const headers = new HttpHeaders();
    // Ne spécifiez pas le type de contenu, laissez Angular gérer les en-têtes

    return this.http.post(`${this.baseUrl}/articles/store`, articleData, { headers });
  }
}
  

