import { RespondentFormComponent } from './respondent-form/respondent-form.component';
import { RespondentComponent } from './respondent.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RespondentComponent
  },
  {
    path: ':id',
    component: RespondentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespondentRoutingModule { }
