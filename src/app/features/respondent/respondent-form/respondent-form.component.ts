import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RespondentService } from './../respondent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespondentType, Respondent } from './../respondent.model';
import { MenuItem, SelectItem, MessageService } from 'primeng/api';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import moment from 'moment';

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
  form: FormGroup;
  respondent: Respondent;
  idRespondent: string;
  isNew = false;
  title = '';
  pt: any;

  constructor(
    private fb: FormBuilder,
    private service: RespondentService,
    private route: ActivatedRoute,
    private router: Router,
    private message: MessageService,
    private errorHandler: ErrorHandler,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: this.translate.instant('application.title'), disabled: true },
      { label: this.translate.instant('respondent.list_title'), disabled: false, routerLink: '/respondent' },
      { label: this.translate.instant('respondent.title'), disabled: true },
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };

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
      respondentIdentifier: [''],
      respondentType: ['', [Validators.required]],
      registration: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      cpf: ['', Validators.maxLength(45)],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.maxLength(45)]],
      admissionDate: [''],
      experienceContractExpiration1: [''],
      experienceContractExpiration2: [''],
      educationLevel: ['', [Validators.maxLength(150)]],
      workstationId: ['', [Validators.maxLength(150)]],
      positionName: ['', [Validators.maxLength(150)]],
      dismissalDate: [''],
      dismissalCause: ['', [Validators.max(100)]],
      companyId: [''],
      companyName: ['', [Validators.maxLength(255)]],
      branchId: [''],
      branchName: ['', [Validators.maxLength(255)]],
      visitDate: [''],
      visitDescription: ['', [Validators.max(150)]],
      _respondentTypeSelected: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.title = this.translate.instant('respondent.edit');
      this.service.find(id).subscribe(respondent => {
        this.form.patchValue(respondent);
        this.convertDateFromAPI();
        this.setRespondentTypeSelected(respondent.respondentType);
        console.log(this.form);
      });
    } else {
      this.isNew = true;
      this.title = this.translate.instant('respondent.new');
    }
  }

  get registration() { return this.form.get('registration'); }
  get name() { return this.form.get('name'); }
  get cpf() { return this.form.get('cpf'); }
  get email() { return this.form.get('email'); }
  get companyId() { return this.form.get('companyId'); }
  get branchId() { return this.form.get('branchId'); }

  convertDateFromAPI() {
    if (this.form.get('admissionDate').value) {
      this.form.get('admissionDate').setValue(moment(this.form.get('admissionDate').value).toDate());
    }
    if (this.form.get('experienceContractExpiration1').value) {
      this.form.get('experienceContractExpiration1').setValue(moment(this.form.get('experienceContractExpiration1').value).toDate());
    }
    if (this.form.get('experienceContractExpiration2').value) {
      this.form.get('experienceContractExpiration2').setValue(moment(this.form.get('experienceContractExpiration2').value).toDate());
    }
    if (this.form.get('dismissalDate').value) {
      this.form.get('dismissalDate').setValue(moment(this.form.get('dismissalDate').value).toDate());
    }
    if (this.form.get('visitDate').value) {
      this.form.get('visitDate').setValue(moment(this.form.get('visitDate').value).toDate());
    }
  }

  getAllRespondents() {
    this.respondentTypes = [
      { label: this.translate.instant('application.employee'), value: RespondentType.EMPLOYEE },
      { label: this.translate.instant('application.visitor'), value: RespondentType.VISITOR },
      { label: this.translate.instant('application.candidate'), value: RespondentType.CANDIDATE },
      { label: this.translate.instant('application.intern'), value: RespondentType.INTERN }
    ];
  }

  setRespondentTypeSelected(type: RespondentType) {
    this.respondentTypeSelected = type;
    switch (type) {
      case RespondentType.CANDIDATE:
        this.form.controls._respondentTypeSelected.setValue({
          label: this.translate.instant('application.candidate'),
          value: RespondentType.CANDIDATE
        });
        break;
      case RespondentType.EMPLOYEE:
        this.form.controls._respondentTypeSelected.setValue({
          label: this.translate.instant('application.employee'),
          value: RespondentType.EMPLOYEE
        });
        break;
      case RespondentType.INTERN:
        this.form.controls._respondentTypeSelected.setValue({
          label: this.translate.instant('application.intern'),
          value: RespondentType.INTERN
        });
        break;
      case RespondentType.VISITOR:
        this.form.controls._respondentTypeSelected.setValue({
          label: this.translate.instant('application.visitor'),
          value: RespondentType.VISITOR
        });
        break;
      default:
        break;
    }
  }

  onSelectRespondentType(event) {
    this.form.controls.respondentType.setValue(event.value);
    this.respondentTypeSelected = event.value;
    console.log(this.form);

  }

  save() {
    console.log(this.form.value);

    if (this.form.controls.id.value) {
      this.update();
    } else {
      this.insert();
    }
  }

  update() {
    this.service.update(this.form.controls.id.value, this.form.value)
      .subscribe(() => {
        this.message.add({ severity: 'success', detail: this.translate.instant('application.edit_success') });
        this.router.navigate(['/respondent']);
      }, (error => {
        this.errorHandler.handleError(error);
      }));
  }

  insert() {
    this.service.insert(this.form.value)
      .subscribe(() => {
        this.message.add({ severity: 'success', detail: this.translate.instant('application.new_success') });
        this.router.navigate(['/respondent']);
      }, (error => {
        this.errorHandler.handleError(error);
      }));
  }

}
