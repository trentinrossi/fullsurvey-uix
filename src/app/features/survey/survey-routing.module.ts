import { SurveyComponent } from './survey.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyFormComponent } from './survey-form/survey-form.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent
  },
  {
    path: ':id',
    component: SurveyFormComponent
  },
  {
    path: ':new',
    component: SurveyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
