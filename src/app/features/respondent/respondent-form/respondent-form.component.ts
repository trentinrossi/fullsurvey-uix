import { Router, ActivatedRoute } from '@angular/router';
import { RespondentService } from './../respondent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespondentType, Respondent } from './../respondent.model';
import { MenuItem, SelectItem, MessageService } from 'primeng/api';
import { Component, OnInit, ErrorHandler } from '@angular/core';

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

  constructor(
    private fb: FormBuilder,
    private service: RespondentService,
    private message: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandler
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: 'Gestão de pesquisas', disabled: true },
      { label: 'Respondentes cadastrados', disabled: false, routerLink: '/respondent' },
      { label: 'Cadastro de Respondentes', disabled: true },
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };

    this.form = this.fb.group({
      id: [''],
      respondentIdentifier: [''],
      respondentType: ['', [Validators.required]],
      registration: ['', [Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      cpf: ['', [Validators.minLength(1), Validators.maxLength(45)]],
      email: ['', Validators.required],
      phoneNumber: ['', [Validators.maxLength(45)]],
      admissionDate: [''],
      experienceContractExpiration1: [''],
      experienceContractExpiration2: [''],
      educationLevel: ['', [Validators.maxLength(150)]],
      workstationId: ['', [Validators.maxLength(150)]],
      positionName: ['', [Validators.maxLength(150)]],
      dismissalDate: [''],
      dismissalCause: ['', [Validators.max(100)]],
      companyId: ['', [Validators.minLength(1)]],
      companyName: ['', [Validators.maxLength(255)]],
      branchId: ['', [Validators.minLength(1)]],
      branchName: ['', [Validators.maxLength(255)]],
      visitDate: [''],
      visitDescription: ['', [Validators.max(150)]],
      _respondentTypeSelected: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.title = 'Alterar Respondente';
      this.service.find(id).subscribe(respondent => {
        this.form.patchValue(respondent);
        this.setRespondentTypeSelected(respondent.respondentType);
        console.log(this.form);
      });
    } else {
      this.isNew = true;
      this.title = 'Novo Respondente';
    }
  }

  getAllRespondents() {
    this.respondentTypes = [
      { label: 'Empregado', value: RespondentType.EMPLOYEE },
      { label: 'Visitante', value: RespondentType.VISITOR },
      { label: 'Candidato', value: RespondentType.CANDIDATE },
      { label: 'Estagiário', value: RespondentType.INTERN }
    ];
  }

  setRespondentTypeSelected(type: RespondentType) {
    this.respondentTypeSelected = type;
    switch (type) {
      case RespondentType.CANDIDATE:
        this.form.controls._respondentTypeSelected.setValue({ label: 'Candidato', value: RespondentType.CANDIDATE });
        break;
      case RespondentType.EMPLOYEE:
        this.form.controls._respondentTypeSelected.setValue({ label: 'Empregado', value: RespondentType.EMPLOYEE });
        break;
      case RespondentType.INTERN:
        this.form.controls._respondentTypeSelected.setValue({ label: 'Estagiário', value: RespondentType.INTERN });
        break;
      case RespondentType.VISITOR:
        this.form.controls._respondentTypeSelected.setValue({ label: 'Visitante', value: RespondentType.VISITOR });
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
        // this.casal = casal;
        this.router.navigate(['/respondent']);
      }, (error => {
        this.errorHandler.handleError(error);
        // this.message.add({ severity: 'error', summary: 'Erro ao alterar o registro', detail: `${error.message}` });
      }));
  }

  insert() {
    this.service.insert(this.form.value)
      .subscribe(() => {
        this.router.navigate(['/respondent']);
      }, (error => {
        this.errorHandler.handleError(error);
        // this.message.add({ severity: 'error', summary: 'Erro ao inserir o registro', detail: `${error.message}` });
      }));
  }

}
