import { SurveyService } from './../survey.service';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ErrorHandler, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Step, StepState, StepsComponent } from '@seniorsistemas/angular-components';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {

  @ViewChild(StepsComponent, { static: false }) step: Step;
  breadcrumbItems: MenuItem[];
  home: MenuItem;
  items: Step[];
  formTitle: string;
  activeStep: number;
  labelButtonNext: string;
  iconButtonNext: string;

  constructor(
    private service: SurveyService,
    private errorHandler: ErrorHandler,
    private confirmation: ConfirmationService,
    private message: MessageService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.activeStep = 0;
    this.labelButtonNext = this.translate.instant('application.next');
    this.iconButtonNext = 'fa fa-arrow-right';

    this.breadcrumbItems = [
      { label: this.translate.instant('application.title'), disabled: false },
      { label: this.translate.instant('survey.list_title'), disabled: false, routerLink: '/survey' },
      { label: this.translate.instant('survey.title'), disabled: true },
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };

    this.items = [
      { id: '0', label: this.translate.instant('survey.basic_data') },
      { id: '1', label: this.translate.instant('survey.subjects') },
      { id: '2', label: this.translate.instant('survey.questions') },
      { id: '3', label: this.translate.instant('survey.respondents') },
      { id: '4', label: this.translate.instant('survey.collect_answers') }
    ];
  }

  next() {
    console.log(this.activeStep);

    if (this.activeStep >= 3) {
      this.labelButtonNext = this.translate.instant('application.finish');
      this.iconButtonNext = 'fa fa-check';
      this.activeStep = 4;
    } else {
      this.activeStep++;
    }
  }

  previous() {
    if (this.activeStep > 0) {
      this.activeStep--;
      if (this.activeStep <= 3) {
        this.labelButtonNext = this.translate.instant('application.next');
        this.iconButtonNext = 'fa fa-arrow-right';
      }
    }
  }

  onStepClick(event) {
    console.log(event);
    // this.step.state = StepState.Warning;
    this.activeStep = event.index;

    if (this.activeStep >= 3) {
      this.labelButtonNext = this.translate.instant('application.finish');
      this.iconButtonNext = 'fa fa-check';
      this.activeStep = 4;
    } else {
      this.labelButtonNext = this.translate.instant('application.next');
      this.iconButtonNext = 'fa fa-arrow-right';
    }
  }

}
