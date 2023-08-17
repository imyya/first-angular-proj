import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './interface/response';
import { Category } from './interface/category';
import { Data } from './interface/data';
import { CategoryResponse } from './interface/category-response';
import { Articleresponse } from './interface/articleresponse';
import { Article } from './interface/article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl= 'http://127.0.0.1:8000/atelier-api'
  constructor(private http: HttpClient) { }
  getArticleData(page:number):Observable<Response<Articleresponse>>{
    return this.http.get<Response<Articleresponse>>(`${this.baseUrl}/articles/all?page=`+page)
  }

  getFournisseur():Observable<Response<Category[]>>{
    return this.http.get<Response<Category[]>>(`${this.baseUrl}/fournisseurs/all`)
  }

  countArticles(id:number){
    return this.http.get(`${this.baseUrl}/articles/${id}`)

  }

  addArticle(articleData: Article) {
    const headers = new HttpHeaders();

    return this.http.post(`${this.baseUrl}/articles/store`, articleData, { headers });
  }

}
