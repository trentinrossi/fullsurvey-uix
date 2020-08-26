import { Survey } from './survey.model';
import { SurveyService } from './survey.service';
import { MenuItem, ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  breadcrumbItems: MenuItem[];
  home: MenuItem;

  totalElements: number;
  loading = false;
  surveys: Survey[];
  surveySelected: Survey;
  errorMessage: string;
  hasErrors: boolean;
  currentPage: number;

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
      { label: this.translate.instant('survey.title_form'), disabled: true }
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };
  }

  findByLazy(event: LazyLoadEvent) {
    this.loading = true;
    const page = event.first / event.rows;
    let filter = '';
    event.globalFilter === null ? filter = '' : filter = event.globalFilter;

    this.service.findAll(page, event.rows, filter)
      .subscribe(resp => {
        this.surveys = resp.content;
        this.totalElements = resp.totalElements;
        this.loading = false;
      }, (error => {
        this.loading = false;
        this.hasErrors = true;
        this.errorHandler.handleError(error);
        this.errorMessage = error.errorMessage;
      }));
  }

  getActions(survey: Survey): MenuItem[] {
    return [
      {
        id: 'edit',
        icon: 'fa fa-pencil',
        label: this.translate.instant('application.edit'),
        command: () => {
          this.surveySelected = survey;
          this.router.navigate([`/survey/${survey.id}`]);
        }
      },
      {
        id: 'delete',
        icon: 'fa fa-trash',
        label: this.translate.instant('application.delete'),
        command: () => this.confirmDelete(survey)
      },
      {
        id: 'manage',
        icon: 'fa fa-bar-chart',
        label: this.translate.instant('application.manage'),
        command: () => this.confirmDelete(survey)
      }
    ];
  }

  new() {
    this.router.navigate([`/survey/new`]);
  }

  confirmDelete(survey: Survey): void {
    this.confirmation.confirm({
      message: this.translate.instant('application.confirm_delete'),
      acceptLabel: this.translate.instant('application.yes'),
      rejectLabel: this.translate.instant('application.no'),
      accept: () => {
        this.surveySelected = survey;
        this.delete(this.surveySelected);
      }
    });
  }

  delete(survey: any) {
    this.service.delete(survey.id)
      .subscribe(() => {
        this.updateRecords();
        this.message.add({ severity: 'success', detail: this.translate.instant('application.delete_success') });
      });
  }

  paginate(event: { first: number; rows: number; }) {
    this.currentPage = event.first / event.rows;
  }

  updateRecords() {
    this.loading = true;
    this.service.findAll(this.currentPage, 5, '')
      .subscribe(resp => {
        this.surveys = resp.content;
        this.totalElements = resp.totalElements;
        this.loading = false;
      }, (error => {
        this.loading = false;
        this.errorHandler.handleError(error);
        this.errorMessage = error.errorMessage;
      }));
  }

  refresh() {
    this.errorMessage = '';
    this.hasErrors = false;
    this.loading = true;
    this.ngOnInit();
  }

}
