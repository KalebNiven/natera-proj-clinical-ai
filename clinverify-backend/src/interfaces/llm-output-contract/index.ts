import { IGroupedExtractions } from './grouped-extractions.interface';
import { IMetaData } from './meta-data.interface';
import { IValidateSession } from './validate-session.interface';
import { IValidationSummary } from './validation-summary.interface';

export interface ILLMOutputContract {
  schema_version: string;
  metadata: IMetaData;
  grouped_extractions: IGroupedExtractions;
  timeline_events: any[];
  error_log: any[];
  validation_summary: IValidationSummary;
  validation_sessions: IValidateSession[];
}
