import { MessageService } from 'primeng/api';
import { ErrorMessage } from './../../shared/models/errorMessage.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private message: MessageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      switch (err.status) {
        case 422:
          this.handle422(err.error);
          break;
        case 404:
          break;

        default:
          this.handleDefaultEror(err.error);
      }

      return throwError(err.error);
      // const error = err.error.message || err.statusText;
      // return throwError(error);
    }));
  }

  handle422(errorObj) {
    this.message.add({
      severity: 'error',
      summary: 'Erro de validação',
      detail: this.listErrors(errorObj.errors)
    });
  }

  handleDefaultEror(errorObj) {
    this.message.add({
      severity: 'error',
      summary: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      detail: `${errorObj.message}`
    });
  }

  private listErrors(messages: ErrorMessage[]): string {
    let s = '';
    for (let i = 0; i < messages.length; i++) {
      s = s + 'Campo: ' + messages[i].fieldName + ' - ' + messages[i].message;
    }
    return s;
  }
}
