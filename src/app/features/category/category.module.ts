import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule, EmptyStateModule, LoadingStateModule } from '@seniorsistemas/angular-components';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [CategoryComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    ButtonModule,
    PanelModule,
    EmptyStateModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,

    LoadingStateModule,
    BreadcrumbModule
  ]
})
export class CategoryModule { }
