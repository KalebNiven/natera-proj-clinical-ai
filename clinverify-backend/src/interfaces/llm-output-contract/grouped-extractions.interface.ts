interface IBoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface IExtractionValidation {
  status: string; // TODO enum
  validated_by?: string | null;
  validated_at?: string | null;
  validation_notes?: string | null;
}

interface IOriginalExtraction {
  llm_extraction: string;
  confidence_score: number;
  reasoning?: string;
}

interface IModification {
  modification_id?: string;
  timestamp: string;
  user_id: string;
  user_name: string;
  user_role: string;
  modification_type?: string;
  field_modified?: string;
  previous_value?: string | number;
  new_value?: string | number;
  reason: string;
  session_id: string;
}

interface IModificationTracking {
  original_extraction?: IOriginalExtraction;
  creation?: IModification;
  deletion?: IModification;
  modifications?: IModification[];
}

interface IOcrCoordinates {
  page: number;
  bounding_box: IBoundingBox;
  text_segment?: string;
  confidence?: number;

  manually_selected?: boolean;
}

interface IExtraction {
  id: string;
  original_extraction_id?: string;
  category: string;
  event_type: string;
  event_detail: string;
  event_id?: string;
  llm_extraction: string;
  reasoning?: string;
  parser_name?: string;
  document_id: string;
  external_created_at?: string;
  patient_id?: number;
  case_id?: number | null; // TODO undefined type
  filename?: string;
  test_type?: string;
  casebundling_id?: number | null; // TODO undefined type
  casebundling_type?: string | null; // TODO undefined type
  product_type?: string | null; // TODO undefined type
  document_category?: string;
  total_pages?: number;
  document_s3_link?: string;
  textract_result_s3_link?: string;
  created_at?: string;
  updated_at?: string;
  code_label?: string;
  code_system?: string;
  cdd_version?: string;
  confidence_score?: number;
  source?: string;
  validation?: IExtractionValidation;
  modification_tracking?: IModificationTracking;
  ocr_coordinates: IOcrCoordinates;
}

interface IGroupedExtraction {
  biomarker_name: string;
  result: string;
  numeric_value: string;
  date: string;
  method: string;
  extractions: IExtraction[];
  human_additions: IExtraction[];
  //! TODO: need schema
  deleted_extractions: IExtraction[];
}

type IGroupedExtractionKey =
  | 'Biomarker'
  | 'Clinical Follow-Up'
  | 'Condition'
  | 'Therapeutic Procedure';

export type IGroupedExtractions = Record<
  IGroupedExtractionKey,
  IGroupedExtraction[]
>;
