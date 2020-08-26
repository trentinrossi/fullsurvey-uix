import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyFormComponent } from './survey-form/survey-form.component';

import { StepsModule } from 'primeng/steps';
import { SurveyComponent } from './survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule, EmptyStateModule, LoadingStateModule } from '@seniorsistemas/angular-components';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SBadgeModule } from '@senior-gestao-pessoas/angular-components';

@NgModule({
  declarations: [SurveyFormComponent, SurveyComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    StepsModule,
    TranslateModule,
    BreadcrumbModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    EmptyStateModule,
    LoadingStateModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    SBadgeModule,
  ]
})
export class SurveyModule { }
