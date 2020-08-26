import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RespondentFormComponent } from './respondent-form/respondent-form.component';
import { RespondentService } from './respondent.service';
import { Respondent, RespondentType } from './respondent.model';
import { MenuItem, ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit, ErrorHandler, ViewChild } from '@angular/core';
import { BadgeColor } from '@senior-gestao-pessoas/angular-components';

@Component({
  selector: 'app-respondent',
  templateUrl: './respondent.component.html',
  styleUrls: ['./respondent.component.scss']
})
export class RespondentComponent implements OnInit {

  @ViewChild(RespondentFormComponent, { static: false }) respondentModal: RespondentFormComponent;
  breadcrumbItems: MenuItem[];
  home: MenuItem;

  totalElements: number;
  loading = false;
  respondents: Respondent[];
  respondentSelected: Respondent;
  errorMessage: string;
  hasErrors: boolean;
  currentPage: number;

  constructor(
    private service: RespondentService,
    private errorHandler: ErrorHandler,
    private confirmation: ConfirmationService,
    private message: MessageService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: this.translate.instant('application.title'), disabled: true },
      { label: this.translate.instant('respondent.title_form'), disabled: true }
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };
  }

  findByLazy(event: LazyLoadEvent) {
    this.loading = true;
    const pagina = event.first / event.rows;
    let filter = '';
    event.globalFilter === null ? filter = '' : filter = event.globalFilter;

    this.service.findAll(pagina, event.rows, filter)
      .subscribe(resp => {
        this.respondents = resp.content;
        this.totalElements = resp.totalElements;
        this.loading = false;
      }, (error => {
        this.loading = false;
        this.hasErrors = true;
        this.errorHandler.handleError(error);
        this.errorMessage = error.errorMessage;
      }));
  }

  respondentTypeDescription(description: string) {
    if (description === RespondentType.CANDIDATE) { return this.translate.instant('application.candidate'); }
    if (description === RespondentType.EMPLOYEE) { return this.translate.instant('application.employee'); }
    if (description === RespondentType.INTERN) { return this.translate.instant('application.intern'); }
    if (description === RespondentType.VISITOR) { return this.translate.instant('application.visitor'); }
    return description;
  }

  respondentTypeColor(description: string) {
    if (description === RespondentType.CANDIDATE) { return BadgeColor.TRADEWIND; }
    if (description === RespondentType.EMPLOYEE) { return BadgeColor.GREEN; }
    if (description === RespondentType.INTERN) { return BadgeColor.BLUE; }
    if (description === RespondentType.VISITOR) { return BadgeColor.ORANGE; }
  }

  getActions(respondent: Respondent): MenuItem[] {
    return [
      {
        id: 'edit',
        icon: 'fa fa-pencil',
        label: this.translate.instant('application.edit'),
        command: () => {
          this.respondentSelected = respondent;
          this.router.navigate([`/respondent/${respondent.id}`]);
        }
      },
      {
        id: 'delete',
        icon: 'fa fa-trash',
        label: this.translate.instant('application.delete'),
        command: () => this.confirmDelete(respondent)
      }
    ];
  }

  new() {
    this.router.navigate([`/respondent/new`]);
  }

  confirmDelete(respondent: Respondent): void {
    this.confirmation.confirm({
      message: this.translate.instant('application.confirm_delete'),
      acceptLabel: this.translate.instant('application.yes'),
      rejectLabel: this.translate.instant('application.no'),
      accept: () => {
        this.respondentSelected = respondent;
        this.delete(this.respondentSelected);
      }
    });
  }

  delete(category: any) {
    this.service.delete(category.id)
      .subscribe(() => {
        this.updateRespondents();
        this.message.add({ severity: 'success', detail: this.translate.instant('application.delete_success') });
      });
  }

  paginate(event: { first: number; rows: number; }) {
    this.currentPage = event.first / event.rows;
  }

  updateRespondents() {
    this.loading = true;
    this.service.findAll(this.currentPage, 5, '')
      .subscribe(resp => {
        this.respondents = resp.content;
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
