import { Respondent } from './respondent.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespondentService {

  endpoint: string;

  constructor(public http: HttpClient) {
    this.endpoint = `${environment.api.getApiUrl}/respondent`;
  }

  findAll(page: number, linesPerPage: number, globalFilter: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}?page=${page}&size=${linesPerPage}&globalFilter=${globalFilter}`);
  }

  find(id: string): Observable<Respondent> {
    return this.http.get<Respondent>(`${this.endpoint}/${id}`);
  }

  insert(category: Respondent): Observable<Respondent> {
    return this.http.post<Respondent>(`${this.endpoint}`, category);
  }

  update(id: string, category: any): Observable<Respondent> {
    return this.http.put<Respondent>(`${this.endpoint}/${id}`, category);
  }

  delete(id: string): Observable<Respondent> {
    return this.http.delete<Respondent>(`${this.endpoint}/${id}`);
  }
}
