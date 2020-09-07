import { environment } from './../../../../environments/environment';
import { SurveySubjects } from './survey-subjects.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  findgetSurveySubjectsBySurveyId(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/getSurveySubjects/${id}`);
  }

  addSurveySubject(subject: SurveySubjects[]): Observable<SurveySubjects> {
    return this.http.post<SurveySubjects>(`${this.endpoint}`, subject);
  }


}
