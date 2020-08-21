import { Category } from './category.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  endpoint: string;

  constructor(public http: HttpClient) {
    this.endpoint = `${environment.api.getApiUrl}/category`;
  }

  findAll(page: number, linesPerPage: number, globalFilter: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}?page=${page}&size=${linesPerPage}&globalFilter=${globalFilter}`);
  }

  find(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.endpoint}/${id}`);
  }

  insert(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.endpoint}`, category);
  }

  update(id: string, category: any): Observable<Category> {
    return this.http.put<Category>(`${this.endpoint}/${id}`, category);
  }

  delete(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.endpoint}/${id}`);
  }
}
