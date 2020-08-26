import { TranslateService } from '@ngx-translate/core';
import { CategoryFormComponent } from './category-form/category-form.component';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { MenuItem, LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ErrorHandler, ViewChild } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  // Para acessar a tabela
  // @ViewChild(Table, { static: false }) datatable: Table;
  @ViewChild(CategoryFormComponent, { static: false }) categoryModal: CategoryFormComponent;
  breadcrumbItems: MenuItem[];
  home: MenuItem;

  totalElements: number;
  loading: boolean;
  categories: Category[];
  categorySelected: Category;
  errorMessage: string;
  hasErrors: boolean;
  currentPage: number;

  constructor(
    private service: CategoryService,
    private errorHandler: ErrorHandler,
    private confirmation: ConfirmationService,
    private message: MessageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.breadcrumbItems = [
      { label: this.translate.instant('application.title'), disabled: true },
      { label: this.translate.instant('category.title_form'), disabled: true }
    ];
    this.home = { icon: 'pi pi-home', url: 'https://platform.senior.com.br/senior-x/' };
  }

  findByLazy(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event);
    const pagina = event.first / event.rows;
    let filter = '';
    event.globalFilter === null ? filter = '' : filter = event.globalFilter;
    console.log(event.globalFilter);

    this.service.findAll(pagina, event.rows, '')
      .subscribe(resp => {
        this.categories = resp.content;
        this.totalElements = resp.totalElements;
        this.loading = false;
      }, (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = error.errorMessage;
      }));
  }

  toggleModal() {
    this.categoryModal.showModal = !this.categoryModal.showModal;
  }

  getActions(category: Category): MenuItem[] {
    return [
      {
        id: 'edit',
        icon: 'fa fa-pencil',
        label: this.translate.instant('application.edit'),
        command: () => {
          this.categorySelected = category;
          this.toggleModal();
        }
      },
      {
        id: 'delete',
        icon: 'fa fa-trash',
        label: this.translate.instant('application.delete'),
        command: () => this.confirmDelete(category)
      }
    ];
  }

  confirmDelete(category: Category): void {
    this.confirmation.confirm({
      message: this.translate.instant('application.confirm_delete'),
      acceptLabel: this.translate.instant('application.yes'),
      rejectLabel: this.translate.instant('application.no'),
      accept: () => {
        this.categorySelected = category;
        this.delete(this.categorySelected);
      }
    });
  }

  delete(category: any) {
    this.service.delete(category.id)
      .subscribe(() => {
        this.updateCategories();
        this.message.add({ severity: 'success', detail: this.translate.instant('application.delete_success') });
      });
  }

  new() {
    this.categoryModal.formCategory.reset();
    this.categorySelected = undefined;
    this.toggleModal();
  }

  paginate(event: { first: number; rows: number; }) {
    this.currentPage = event.first / event.rows;
  }

  updateCategories() {
    this.loading = true;
    this.service.findAll(this.currentPage, 5, '')
      .subscribe(resp => {
        console.log(resp.content);

        this.categories = resp.content;
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
