import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { SBadgeModule, AutoCompleteEnumModule } from '@senior-gestao-pessoas/angular-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespondentRoutingModule } from './respondent-routing.module';
import { RespondentComponent } from './respondent.component';
import { RespondentFormComponent } from './respondent-form/respondent-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule, EmptyStateModule, LoadingStateModule, ControlErrorsModule } from '@seniorsistemas/angular-components';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [RespondentComponent, RespondentFormComponent],
  imports: [
    CommonModule,
    RespondentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    PanelModule,
    EmptyStateModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    SBadgeModule,
    DropdownModule,
    FieldsetModule,
    InputTextareaModule,
    LoadingStateModule,
    BreadcrumbModule,
    AutoCompleteModule,
    AutoCompleteEnumModule,
    MessagesModule,
    ControlErrorsModule,
    CalendarModule,
    TranslateModule
  ]
})
export class RespondentModule { }
