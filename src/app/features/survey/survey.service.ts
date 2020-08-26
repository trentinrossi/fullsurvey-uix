import { Survey } from './survey.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  endpoint: string;

  constructor(public http: HttpClient) {
    this.endpoint = `${environment.api.getApiUrl}/survey`;
  }

  findAll(page: number, linesPerPage: number, globalFilter: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}?page=${page}&size=${linesPerPage}&globalFilter=${globalFilter}`);
  }

  find(id: string): Observable<Survey> {
    return this.http.get<Survey>(`${this.endpoint}/${id}`);
  }

  insert(survey: Survey): Observable<Survey> {
    return this.http.post<Survey>(`${this.endpoint}`, survey);
  }

  update(id: string, survey: any): Observable<Survey> {
    return this.http.put<Survey>(`${this.endpoint}/${id}`, survey);
  }

  delete(id: string): Observable<Survey> {
    return this.http.delete<Survey>(`${this.endpoint}/${id}`);
  }
}
