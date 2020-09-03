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
  totalElements: number;
  loading = false;
  rowGroupMetadata: any;

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // this.subjectService.findAll(0, 50, '').subscribe(subjects => {
    //   this.subjects = subjects.content;
    //   this.totalElements = subjects.content.lenght;
    //   console.log(subjects);
    // });

  }

  findByLazy(event: LazyLoadEvent) {
    this.loading = true;
    const page = event.first / event.rows;
    let filter = '';
    event.globalFilter === null ? filter = '' : filter = event.globalFilter;

    this.subjectService.findAll(page, event.rows, filter)
      .subscribe(resp => {
        this.subjects = resp.content;
        console.log(this.subjects);
        this.totalElements = resp.totalElements;
        this.loading = false;
      }, (error => {
        this.loading = false;
        // this.hasErrors = true;
        // this.errorHandler.handleError(error);
        // this.errorMessage = error.errorMessage;
      }));
  }

}
