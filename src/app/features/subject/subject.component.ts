import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  items: MenuItem[];
  home: MenuItem;

  constructor() { }

  ngOnInit() {
    this.items = [
      { label: 'Gestão de pesquisas', disabled: true },
      { label: 'Cadastro de Assuntos', disabled: true }
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };
  }

}
