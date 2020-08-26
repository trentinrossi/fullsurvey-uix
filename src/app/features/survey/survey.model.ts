export interface Survey {
  id: string;
  customerId: string;
  name: string;
  initialDate: Date;
  finalDate: Date;
  instructorName: string;
  evaluatorName: string;
  description: string;
  expirationDate: Date;
  objective: string;
  responseTime: number;
  anonymous: boolean;
  answerLink: string;
  titleIcon: string;
}
