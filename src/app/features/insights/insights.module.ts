import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { LoadingStateModule, ButtonModule, EmptyStateModule } from '@seniorsistemas/angular-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsComponent } from './insights.component';


@NgModule({
  declarations: [InsightsComponent],
  imports: [
    CommonModule,
    InsightsRoutingModule,
    TableModule,
    ButtonModule,
    PanelModule,
    EmptyStateModule,

    LoadingStateModule,
    BreadcrumbModule
  ]
})
export class InsightsModule { }
