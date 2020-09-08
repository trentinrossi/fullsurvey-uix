import { environment } from './../../../../environments/environment';
import { SurveySubjects } from './survey-subjects.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveySubjectsService {

  endpoint: string;

  constructor(public http: HttpClient) {
    this.endpoint = `${environment.api.getApiUrl}/surveySubjects`;
  }

  findAvaiableSubjectsBySurveyId(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/getAvaiableSubjectsBySurveyId/${id}`);
  }

  findSurveySubjectsBySurveyId(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/getSurveySubjects/${id}`);
  }

  findSurveySubjectsBySurveyIdAndCategoryId(id: string, categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/getAvaiableSubjectsBySurveyIdAndCategoryId/${id}/${categoryId}`);
  }

  addSurveySubject(subject: SurveySubjects): Observable<SurveySubjects> {
    return this.http.post<SurveySubjects>(`${this.endpoint}/addSurveySubjects`, subject);
  }

  deleteSurveySubject(subject: SurveySubjects): Observable<SurveySubjects> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: subject,
    };
    return this.http.delete<SurveySubjects>(`${this.endpoint}/deleteSurveySubjects`, options);
  }

}
