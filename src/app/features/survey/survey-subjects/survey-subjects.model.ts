import { Subject } from '../../subject/subject.model.';
export interface SurveySubjects {
  id?: string;
  surveyId: string;
  subjects: Subject[];
}
