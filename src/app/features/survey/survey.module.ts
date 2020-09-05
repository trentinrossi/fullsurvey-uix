import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyFormComponent } from './survey-form/survey-form.component';

import { StepsModule, ObjectCardModule, ButtonModule } from '@seniorsistemas/angular-components';
import { SurveyComponent } from './survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { EmptyStateModule, LoadingStateModule } from '@seniorsistemas/angular-components';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SBadgeModule } from '@senior-gestao-pessoas/angular-components';
import { SurveyBasicComponent } from './survey-basic/survey-basic.component';
import { SurveySubjectsComponent } from './survey-subjects/survey-subjects.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { SurveyRespondentsComponent } from './survey-respondents/survey-respondents.component';
import { SurveyGetanswersComponent } from './survey-getanswers/survey-getanswers.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { PickListModule } from 'primeng/picklist';

@NgModule({
  declarations: [
    SurveyFormComponent,
    SurveyComponent,
    SurveyBasicComponent,
    SurveySubjectsComponent,
    SurveyQuestionsComponent,
    SurveyRespondentsComponent,
    SurveyGetanswersComponent
  ],
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
    EmptyStateModule,
    LoadingStateModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    SBadgeModule,
    ObjectCardModule,
    ButtonModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    TooltipModule,
    CardModule,
    PickListModule,
    AutoCompleteModule
  ]
})
export class SurveyModule { }
