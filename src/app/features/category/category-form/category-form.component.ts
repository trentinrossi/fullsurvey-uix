import { NotificationService } from './../../../shared/messages/notification.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { CategoryService } from './../category.service';
import { Category } from './../category.model';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() category: Category;
  @Output() refreshData = new EventEmitter();

  showModal = false;
  formCategory: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.formCategory = this.fb.group({
      id: [this.category ? this.category.id : ''],
      name: [this.category ? this.category.name : '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnChanges() {
    if (this.formCategory) {
      this.formCategory.reset();
      this.formCategory.setValue({
        id: this.category.id ? this.category.id : '',
        name: this.category ? this.category.name : ''
      });
    }
    this.title = !this.category ? 'Nova categoria' : 'Alterar categoria';
  }

  get formControls() { return this.formCategory.controls; }

  cancel() {
    this.showModal = false;
  }

  save() {
    this.category ? this.edit() : this.addNew();
    console.log(this.formCategory.controls.name.value);
  }

  addNew() {
    this.service.insert(this.formCategory.value)
      .subscribe(() => {
        this.message.add({ severity: 'success', detail: 'Adicionado com sucesso' });
        this.returnChangedCategory();
      }, (error => {
        this.message.add({ severity: 'error', summary: 'Erro ao salvar o registro', detail: `${error}` });
      }));
    this.cancel();
  }

  edit() {
    this.service.update(this.category.id, this.formCategory.value)
      .subscribe(() => {
        this.message.add({ severity: 'success', detail: 'Alterado com sucesso' });
        this.returnChangedCategory();
      }, (error => {
        this.message.add({ severity: 'error', summary: 'Erro ao salvar o registro', detail: `${error}` });
      }));
    this.cancel();
  }

  returnChangedCategory() {
    this.refreshData.emit(this.formCategory.value);
  }

}
