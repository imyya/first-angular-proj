import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './interface/response';
import { environment } from './shared/environment';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'; // Import map and catchError


@Injectable({
  providedIn: 'root'
})
export abstract class  ResponseService<T> {

  protected abstract uri(): string; 
  protected url=`${environment.api.baseUrl +this.uri()}`
 

  constructor(private http: HttpClient) {}
  index(): Observable<T> {
    console.log('dis',this.url)
    return this.http.get<T>(this.url).pipe(
      catchError(error=>{
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  create(item: any): Observable<T> {
    //const url=`${environment.api.baseUrl}`
    return this.http.post<T>(this.url+`/store`, item).pipe(
      catchError(error => {
        // Handle error here
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  update(id: number, item: any): Observable<T> {
    console.log('hola',this.url+`/${id}`, item)
        const options = {
      headers: new HttpHeaders({
      })
    };

    //const url = `${environment.api.baseUrl+this.uri()}/${id}`
    return this.http.post<T>(this.url+`/${id}`, item,options ).pipe(
      catchError(error => {
        // Handle error here
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  delete(id: number): Observable<T> {
   // const url = `${environment.api.baseUrl+this.uri()}/${id}`
    return this.http.delete<T>(this.url+`/${id}`).pipe(
      catchError(error => {
        // Handle error here
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }


}
