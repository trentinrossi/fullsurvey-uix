import { SurveyService } from './../survey.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-survey-basic',
  templateUrl: './survey-basic.component.html',
  styleUrls: ['./survey-basic.component.scss']
})
export class SurveyBasicComponent implements OnInit {

  @Output() formStatus = new EventEmitter();
  form: FormGroup;
  pt: any;
  isNew = false;
  title = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: SurveyService,
    private route: ActivatedRoute,
    private translate: TranslateService
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

    this.form = this.getFormGroup();

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.title = this.translate.instant('survey.edit');
      this.service.find(id).subscribe(survey => {
        this.form.patchValue(survey);
        this.convertDateFromAPI();
        console.log(this.form);
      });
    } else {
      this.isNew = true;
      this.title = this.translate.instant('survey.new');
    }
  }

  convertDateFromAPI() {
    if (this.form.get('initialDate').value) {
      this.form.get('initialDate').setValue(moment(this.form.get('initialDate').value).toDate());
    }
    if (this.form.get('finalDate').value) {
      this.form.get('finalDate').setValue(moment(this.form.get('finalDate').value).toDate());
    }
    if (this.form.get('expirationDate').value) {
      this.form.get('expirationDate').setValue(moment(this.form.get('expirationDate').value).toDate());
    }
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [''],
      customer: ['', [Validators.required]],
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
