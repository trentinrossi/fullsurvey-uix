export interface Respondent {
  id: string;
  respondentIdentifier?: string;
  respondentType?: RespondentType;
  registration?: number;
  name?: string;
  cpf?: string;
  email?: string;
  phoneNumber?: string;
  admissionDate: Date;
  experienceContractExpiration1: Date;
  experienceContractExpiration2: Date;
  educationLevel: string;
  workstationId: string;
  positionName: string;
  dismissalDate: Date;
  dismissalCause: string;
  companyId: number;
  companyName: string;
  branchId: number;
  branchName: string;
  visitDate: Date;
  visitDescription: string;
}

export enum RespondentType {
  EMPLOYEE = 'EMPLOYEE',
  VISITOR = 'VISITOR',
  CANDIDATE = 'CANDIDATE',
  INTERN = 'INTERN'
}
