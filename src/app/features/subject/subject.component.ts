import { SubjectFormComponent } from './subject-form/subject-form.component';
import { Subject } from './subject.model.';
import { SubjectService } from './subject.service';
import { MenuItem, ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { Component, OnInit, ErrorHandler, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  @ViewChild(SubjectFormComponent, { static: false }) subjectModal: SubjectFormComponent;
  items: MenuItem[];
  home: MenuItem;
  breadcrumbItems: MenuItem[];

  totalElements: number;
  loading: boolean;
  subjects: Subject[];
  subjectSelected: Subject;
  errorMessage: string;
  hasErrors: boolean;
  currentPage: number;

  constructor(
    private service: SubjectService,
    private errorHandler: ErrorHandler,
    private confirmation: ConfirmationService,
    private message: MessageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: this.translate.instant('application.title'), disabled: true },
      { label: this.translate.instant('subject.title_form'), disabled: true }
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };
  }

  findByLazy(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event);
    const page = event.first / event.rows;
    let filter = '';
    event.globalFilter === null ? filter = '' : filter = event.globalFilter;
    console.log(event.globalFilter);

    this.service.findAll(page, event.rows, '')
      .subscribe(resp => {
        this.subjects = resp.content;
        this.totalElements = resp.totalElements;
        this.loading = false;
      }, (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = error.errorMessage;
      }));
  }

  toggleModal() {
    this.subjectModal.showModal = !this.subjectModal.showModal;
  }

  getActions(subject: Subject): MenuItem[] {
    return [
      {
        id: 'edit',
        icon: 'fa fa-pencil',
        label: this.translate.instant('application.edit'),
        command: () => {
          this.subjectSelected = subject;
          this.toggleModal();
        }
      },
      {
        id: 'delete',
        icon: 'fa fa-trash',
        label: this.translate.instant('application.delete'),
        command: () => this.confirmDelete(subject)
      }
    ];
  }

  confirmDelete(subject: Subject): void {
    this.confirmation.confirm({
      message: this.translate.instant('application.confirm_delete'),
      acceptLabel: this.translate.instant('application.yes'),
      rejectLabel: this.translate.instant('application.no'),
      accept: () => {
        this.subjectSelected = subject;
        this.delete(this.subjectSelected);
      }
    });
  }

  delete(subject: any) {
    this.service.delete(subject.id)
      .subscribe(() => {
        this.updateRecords();
        this.message.add({ severity: 'success', detail: this.translate.instant('application.delete_success') });
      });
  }

  new() {
    this.subjectModal.form.reset();
    this.subjectSelected = undefined;
    this.toggleModal();
  }

  paginate(event: { first: number; rows: number; }) {
    this.currentPage = event.first / event.rows;
  }

  updateRecords() {
    this.loading = true;
    this.service.findAll(this.currentPage, 5, '')
      .subscribe(resp => {
        console.log(resp.content);

        this.subjects = resp.content;
        this.totalElements = resp.totalElements;
        this.loading = false;
      }, (error => {
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
