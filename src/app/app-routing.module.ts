import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'insights',
    loadChildren: () => import('./features/insights/insights.module').then(m => m.InsightsModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('./features/subject/subject.module').then(m => m.SubjectModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./formulario/formulario.module').then(m => m.FormularioModule)
  },
  {
    path: 'respondent',
    loadChildren: () => import('./features/respondent/respondent.module').then(m => m.RespondentModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./features/survey/survey.module').then(m => m.SurveyModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
