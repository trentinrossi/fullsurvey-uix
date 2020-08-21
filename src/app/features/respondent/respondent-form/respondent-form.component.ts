import { RespondentType } from './../respondent.model';
import { MenuItem, SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-respondent-form',
  templateUrl: './respondent-form.component.html',
  styleUrls: ['./respondent-form.component.scss']
})
export class RespondentFormComponent implements OnInit {

  breadcrumbItems: MenuItem[];
  home: MenuItem;
  respondentTypes: SelectItem[];
  respondentTypeSelected: string;

  constructor() { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: 'Gestão de pesquisas', disabled: true },
      { label: 'Cadastro de Respondentes', disabled: true }
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };

    this.respondentTypes = [
      { label: 'Selecione...', value: '' },
      { label: 'Empregado', value: 'EMPLOYEE' },
      { label: 'Visitante', value: 'VISITOR' },
      { label: 'Candidato', value: 'CANDIDATE' },
      { label: 'Estagiário', value: 'INTERN' }
    ];
  }

  onSelectRespondentType(event) {
    console.log(event);
    this.respondentTypeSelected = event.value.value;
    console.log(this.respondentTypeSelected);

  }

}
