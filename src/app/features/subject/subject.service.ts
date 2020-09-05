import { Subject } from './subject.model.';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  endpoint: string;

  constructor(public http: HttpClient) {
    this.endpoint = `${environment.api.getApiUrl}/subject`;
  }

  findAll(page: number, linesPerPage: number, globalFilter: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}?page=${page}&size=${linesPerPage}&globalFilter=${globalFilter}`);
  }

  findAllBycategory(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/getSubjectsByCategory/${id}`);
  }

  find(id: string): Observable<Subject> {
    return this.http.get<Subject>(`${this.endpoint}/${id}`);
  }

  insert(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.endpoint}`, subject);
  }

  update(id: string, subject: any): Observable<Subject> {
    return this.http.put<Subject>(`${this.endpoint}/${id}`, subject);
  }

  delete(id: string): Observable<Subject> {
    return this.http.delete<Subject>(`${this.endpoint}/${id}`);
  }
}
