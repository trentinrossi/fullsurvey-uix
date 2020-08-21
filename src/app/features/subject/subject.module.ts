import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './subject.component';
import { TableModule } from 'primeng/table';
import { ButtonModule, EmptyStateModule, LoadingStateModule } from '@seniorsistemas/angular-components';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
  declarations: [SubjectComponent],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    CommonModule,
    TableModule,
    ButtonModule,
    PanelModule,
    EmptyStateModule,

    LoadingStateModule,
    BreadcrumbModule
  ]
})
export class SubjectModule { }
