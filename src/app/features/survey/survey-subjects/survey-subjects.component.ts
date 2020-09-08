import { SurveySubjects } from './survey-subjects.model';
import { CategoryService } from './../../category/category.service';
import { Category } from './../../category/category.model';
import { LazyLoadEvent } from 'primeng/api';
import { Subject } from './../../subject/subject.model.';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from './../../subject/subject.service';
import { Component, OnInit } from '@angular/core';
import { SurveySubjectsService } from './survey-subjects.service';

@Component({
  selector: 'app-survey-subjects',
  templateUrl: './survey-subjects.component.html',
  styleUrls: ['./survey-subjects.component.scss']
})
export class SurveySubjectsComponent implements OnInit {

  avaiableSubjects: Subject[];
  selecteds: Subject[];
  categories: Category[];
  surveySubject: SurveySubjects;
  totalElements: number;
  loading = false;
  rowGroupMetadata: any;
  id: string;

  constructor(
    private subjectService: SubjectService,
    private categoryService: CategoryService,
    private surveySubjectsService: SurveySubjectsService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.surveySubjectsService.findAvaiableSubjectsBySurveyId(this.id).subscribe(subjects => {
      this.avaiableSubjects = subjects.content;
      this.totalElements = subjects.content.lenght;
    });

    this.surveySubjectsService.findSurveySubjectsBySurveyId(this.id).subscribe(subjects => {
      this.selecteds = subjects.content;
    });
  }

  onMoveToTarget(event) {
    this.surveySubject = { surveyId: this.id, subjects: [] };
    event.items.forEach(item => {
      this.surveySubject.subjects.push(item.id);
    });

    this.surveySubjectsService.addSurveySubject(this.surveySubject).subscribe(subjects => {
      console.log(subjects);
    });
  }

  onMoveToSoure(event) {
    this.surveySubject = { surveyId: this.id, subjects: [] };
    event.items.forEach(item => {
      this.surveySubject.subjects.push(item.id);
    });

    this.surveySubjectsService.deleteSurveySubject(this.surveySubject).subscribe(subjects => {
      console.log(subjects);
    });
  }

  searchCategories() {
    this.categoryService.findAll(0, 1000, '').subscribe(data => {
      this.categories = data.content;
    });
  }

  categorySelected(event) {
    console.log(event);

    this.surveySubjectsService.findSurveySubjectsBySurveyIdAndCategoryId(this.id, event.id).subscribe(subjects => {
      this.avaiableSubjects = subjects.content;
      this.totalElements = subjects.content.lenght;
    });
  }
}
