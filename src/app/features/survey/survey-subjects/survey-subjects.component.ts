import { CategoryService } from './../../category/category.service';
import { Category } from './../../category/category.model';
import { LazyLoadEvent } from 'primeng/api';
import { Subject } from './../../subject/subject.model.';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from './../../subject/subject.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-subjects',
  templateUrl: './survey-subjects.component.html',
  styleUrls: ['./survey-subjects.component.scss']
})
export class SurveySubjectsComponent implements OnInit {

  subjects: Subject[];
  selecteds: Subject[];
  categories: Category[];
  totalElements: number;
  loading = false;
  rowGroupMetadata: any;

  constructor(
    private subjectService: SubjectService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.subjectService.findAll(0, 1000, '').subscribe(subjects => {
      this.subjects = subjects.content;
      this.totalElements = subjects.content.lenght;
      console.log(subjects);
    });

    this.selecteds = [];
  }

  searchCategories() {
    this.categoryService.findAll(0, 1000, '').subscribe(data => {
      this.categories = data.content;
    });
  }

  categorySelected(event) {
    this.subjectService.findAllBycategory(event.id).subscribe(subjects => {
      this.subjects = subjects.content;
      this.totalElements = subjects.content.lenght;
    });
  }
}
