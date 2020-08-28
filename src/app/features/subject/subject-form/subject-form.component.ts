import { Category } from './../../category/category.model';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SubjectService } from './../subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from './../subject.model.';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit, OnChanges {

  @Input() subject: Subject;
  @Output() refreshData = new EventEmitter();

  showModal = false;
  form: FormGroup;
  title: string;
  categories: Category[];

  constructor(
    private fb: FormBuilder,
    private service: SubjectService,
    private message: MessageService,
    private translate: TranslateService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    console.log(this.subject);

    // this.searchCategories();

    this.form = this.fb.group({
      id: [],
      category: this.fb.group({
        id: [],
        name: []
      }),
      name: [, [Validators.required, Validators.maxLength(100)]],
      categoryId: []
    });
  }

  ngOnChanges() {
    console.log(this.subject);
    if (this.form) {
      this.form.reset();
      this.form.setValue({
        id: this.subject ? this.subject.id : '',
        category: this.subject ? this.subject.category : '',
        name: this.subject ? this.subject.name : '',
        categoryId: this.subject ? this.subject.category.id : ''
      });
      console.log('Aplicando valores: ' + this.form);
      console.log(this.form);

    }
    this.title = !this.subject ? this.translate.instant('subject.new') : this.translate.instant('subject.edit');
  }

  get formControls() { return this.form.controls; }

  searchCategories(event) {
    console.log(event);

    this.categoryService.findAll(0, 1000, '').subscribe(data => {
      this.categories = data.content;
    });
  }

  categorySelected(event) {
    console.log(event);

    this.form.controls.categoryId.setValue(event.value.id);
  }

  cancel() {
    this.showModal = false;
  }

  save() {
    this.subject ? this.edit() : this.addNew();
    console.log(this.form.controls.name.value);
  }

  addNew() {
    this.service.insert(this.form.value)
      .subscribe(() => {
        this.message.add({ severity: 'success', detail: this.translate.instant('application.new_success') });
        this.returnChanged();
      }, (error => {
        this.message.add({ severity: 'error', summary: this.translate.instant('application.new_error'), detail: `${error}` });
      }));
    this.cancel();
  }

  edit() {
    this.service.update(this.subject.id, this.form.value)
      .subscribe(() => {
        this.message.add({ severity: 'success', detail: this.translate.instant('application.edit_success') });
        this.returnChanged();
      }, (error => {
        this.message.add({ severity: 'error', summary: this.translate.instant('application.edit_error'), detail: `${error}` });
      }));
    this.cancel();
  }

  returnChanged() {
    this.refreshData.emit(this.form.value);
  }

}
