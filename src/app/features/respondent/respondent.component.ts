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
    private router: Router
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: 'Gestão de pesquisas', disabled: true },
      { label: 'Respondentes cadastrados', disabled: true }
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
    if (description === RespondentType.CANDIDATE) { return 'Candidato'; }
    if (description === RespondentType.EMPLOYEE) { return 'Empregado'; }
    if (description === RespondentType.INTERN) { return 'Estagiário'; }
    if (description === RespondentType.VISITOR) { return 'Visitante'; }
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
        label: 'Editar',
        command: () => {
          this.respondentSelected = respondent;
          this.router.navigate([`/respondent/${respondent.id}`]);
        }
      },
      {
        id: 'delete',
        icon: 'fa fa-trash',
        label: 'Excluir',
        command: () => this.confirmDelete(respondent)
      }
    ];
  }

  new() {
    this.router.navigate([`/respondent/new`]);
  }

  confirmDelete(respondent: Respondent): void {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
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
        this.message.add({ severity: 'success', detail: 'Respondente excluído com sucesso!' });
      }, (error) => {
        this.message.add({
          severity: 'error',
          summary: 'Erro ao excluir o respondente',
          detail: `Erro ao excluir ${error.error.error}`
        });
      });
  }

  paginate(event: { first: number; rows: number; }) {
    this.currentPage = event.first / event.rows;
  }

  updateRespondents() {
    this.loading = true;
    this.service.findAll(this.currentPage, 5, '')
      .subscribe(resp => {
        console.log(resp.content);

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
