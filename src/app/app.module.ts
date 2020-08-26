import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { ConfirmationService } from 'primeng/api';
import { NotificationModule } from './shared/messages/notification.module';
import { NotificationService } from './shared/messages/notification.service';
import { AppRoutingModule } from './app-routing.module';
// import ptBr from '@angular/common/locales/pt';

import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/messageservice';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';

import { AnalyticsHeaderModule, SBadgeModule } from '@senior-gestao-pessoas/angular-components';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LoadingStateModule, LocaleModule } from '@seniorsistemas/angular-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AnalyticsHeaderModule,
    LoadingStateModule,
    BreadcrumbModule,
    ToastModule,
    NotificationModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    MessageService,
    ConfirmationService,
    // { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
