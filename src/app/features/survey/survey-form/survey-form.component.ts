import { SurveyService } from './../survey.service';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  breadcrumbItems: MenuItem[];
  home: MenuItem;
  items: MenuItem[];

  constructor(
    private service: SurveyService,
    private errorHandler: ErrorHandler,
    private confirmation: ConfirmationService,
    private message: MessageService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: this.translate.instant('application.title'), disabled: true },
      { label: this.translate.instant('survey.list_title'), disabled: false, routerLink: '/respondent' },
      { label: this.translate.instant('survey.title'), disabled: true },
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };

    this.items = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' }
    ];
  }

}
