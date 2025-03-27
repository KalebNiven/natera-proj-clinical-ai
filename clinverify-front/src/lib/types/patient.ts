export interface CaseData {
  caseBundlingId: number;
  cancerType: string;
  project: string;
  lastExtraction: string;
  status: Status;
}

export type Status =
  | 'Paused Review'
  | 'Waiting for Review'
  | 'Needs Review'
  | 'Awaiting Response'
  | 'Reviewed';
