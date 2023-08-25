import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './interface/response';

@Injectable({
  providedIn: 'root'
})
export abstract class  ResponseService<T> {

  protected abstract url(): string;

  constructor(private http: HttpClient) {}

  create(item: T): Observable<Response<T>> {
    return this.http.post<Response<T>>(this.url(), item);
  }

  update(id: number, item: T): Observable<Response<T>> {
    const url = `${this.url()}/${id}`;
    return this.http.put<Response<T>>(url, item);
  }

  delete(id: number): Observable<Response<T>> {
    const url = `${this.url()}/${id}`;
    return this.http.delete<Response<T>>(url);
  }


}
