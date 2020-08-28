import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';
import { TableModule } from 'primeng/table';
import { ButtonModule, EmptyStateModule, LoadingStateModule } from '@seniorsistemas/angular-components';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [SubjectComponent, SubjectFormComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
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
    TranslateModule,
    LoadingStateModule,
    BreadcrumbModule,
    AutoCompleteModule,
    DropdownModule
  ]
})
export class SubjectModule { }
