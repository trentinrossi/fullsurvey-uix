import { Category } from './../../category/category.model';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SubjectService } from './../subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from './../subject.model.';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {

  @Input() subject: Subject;
  @Output() refreshData = new EventEmitter();
  @Output() displayChange = new EventEmitter<boolean>();
  @Input()
  get display() {
    return this.displayValue;
  }
  set display(value) {
    this.displayValue = value;
    this.displayChange.emit(value);
  }

  private displayValue: boolean;
  title: string;
  categories: Category[];
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: SubjectService,
    private message: MessageService,
    private translate: TranslateService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.form = this.getFormGroup();

    if (this.subject) {
      this.form.patchValue(this.subject);
      this.form.controls.categoryId.setValue(this.subject.category.id);
      this.title = this.translate.instant('subject.edit');
    } else {
      this.title = this.translate.instant('subject.new');
    }
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [],
      category: [],
      name: [, [Validators.required, Validators.maxLength(100)]],
      categoryId: []
    });
  }

  get formControls() { return this.form.controls; }

  searchCategories(event) {
    this.categoryService.findAll(0, 1000, '').subscribe(data => {
      this.categories = data.content;
    });
  }

  categorySelected(event) {
    this.form.controls.categoryId.setValue(event.id);
  }

  cancel() {
    this.display = false;
  }

  save() {
    this.subject ? this.edit() : this.addNew();
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
