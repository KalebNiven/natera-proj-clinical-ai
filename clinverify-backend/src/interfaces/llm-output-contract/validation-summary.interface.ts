interface IValidator {
  user_id: string;
  user_name: string;
  user_role: string;
  extractions_validated: number;
  extractions_added: number;
  extractions_deleted: number;
}

export interface IValidationSummary {
  total_extractions: number;
  validated: number;
  pending: number;
  human_added: number;
  deleted: number;
  validation_progress: number;
  last_validation_date: string;
  validators: IValidator[];
}
