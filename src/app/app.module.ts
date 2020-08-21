import { ConfirmationService } from 'primeng/api';
import { NotificationModule } from './shared/messages/notification.module';
import { NotificationService } from './shared/messages/notification.service';
import { AppRoutingModule } from './app-routing.module';
import ptBr from '@angular/common/locales/pt';

import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/messageservice';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';

import { AnalyticsHeaderModule } from '@senior-gestao-pessoas/angular-components';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LoadingStateModule, LocaleModule } from '@seniorsistemas/angular-components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { default as fallback } from '../locale/pt-BR.json';
import { TranslateModule } from '@ngx-translate/core';

registerLocaleData(ptBr);

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

    TranslateModule.forRoot()
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
