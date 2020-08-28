import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRespondentsComponent } from './survey-respondents.component';

describe('SurveyRespondentsComponent', () => {
  let component: SurveyRespondentsComponent;
  let fixture: ComponentFixture<SurveyRespondentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyRespondentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyRespondentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
