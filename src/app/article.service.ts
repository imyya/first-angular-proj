import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './interface/response';
import { Category } from './interface/category';
import { Data } from './interface/data';
import { CategoryResponse } from './interface/category-response';
import { Articleresponse } from './interface/articleresponse';
import { Article } from './interface/article';
import { ResponseService } from './response.service';


@Injectable({
  providedIn: 'root'
})
export class ArticleService extends ResponseService<Response<Article>> {

  // private baseUrl= 'http://127.0.0.1:8000/atelier-api'
  // getArticleData(page:number):Observable<Response<Articleresponse>>{
  //   return this.http.get<Response<Articleresponse>>(`${this.baseUrl}/articles/?page=`+page)
  // }
  // addArticle(articleData: any):Observable<Response<Article>> {
  //   const headers = new HttpHeaders();

  //   return this.http.post<Response<Article>>(`${this.baseUrl}/articles/store`, articleData, { headers });
  // }

  // update(id:number, data:any):Observable<Response<Article>>{
  //  // const formData = new FormData()
  //  data.append('_method', "PUT");
  //   // formData.append('json', JSON.stringify(data)); // Convert data to JSON string

  //   const url = `${this.baseUrl}/articles/${id}`;
  //   const options = {
  //     headers: new HttpHeaders({
  //     })
  //   };

  //   return this.http.post<Response<Article>>(url,data,options);

  // }

  // delete(id:number):Observable<Response<Article>>{
  //   return this.http.delete<Response<Article>>(`${this.baseUrl}/articles/delete/${id}`)
  // }

  override uri(): string {
    return '/articles';
  }

}
