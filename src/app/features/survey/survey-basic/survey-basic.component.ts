import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-survey-basic',
  templateUrl: './survey-basic.component.html',
  styleUrls: ['./survey-basic.component.scss']
})
export class SurveyBasicComponent implements OnInit {

  @Output() formStatus = new EventEmitter();
  form: FormGroup;
  pt: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      // tslint:disable-next-line: max-line-length
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Semana'
    };

    this.form = this.fb.group({
      id: [''],
      customerId: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      initialDate: [''],
      finalDate: [''],
      instructorName: ['', [Validators.maxLength(100)]],
      evaluatorName: ['', [Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(255)]],
      expirationDate: [''],
      objective: ['', [Validators.maxLength(255)]],
      responseTime: ['', [Validators.max(1440)]],
      anonymous: [''],
      answerLink: ['', [Validators.maxLength(255)]],
      titleIcon: ['', [Validators.maxLength(45)]]
    });
  }

  get name() { return this.form.get('name'); }
  get responseTime() { return this.form.get('responseTime'); }
  get instructorName() { return this.form.get('instructorName'); }
  get evaluatorName() { return this.form.get('evaluatorName'); }

}
