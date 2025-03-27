import { ILLMOutputContract } from '..';
import { EExtractionStatus, EValidationStatus } from '../meta-data.interface';

describe('LLM Output Contract', () => {
  it('should be instance of ILLMOutputContract', () => {
    const test: ILLMOutputContract =
      //Json Contract
      {
        schema_version: '1.0.0',
        metadata: {
          patient_id: 38790137,
          case_id: null,
          extraction_id: '38790137_20241109_123456',
          genai_pipeline_version: '1.0.0',
          model: 'us.anthropic.claude-3-5-sonnet-20241022-v2:0',
          extraction_timestamp: '2024-11-09T12:34:56Z',
          total_extractions: 56,
          document_date_range: {
            start: '2021-12-01',
            end: '2023-09-07',
          },
          extraction_status: EExtractionStatus.Completed,
          validation_status: EValidationStatus.InProgress,
          last_modified_by: 'user123',
          last_modified_at: '2024-11-10T09:15:23Z',
        },
        grouped_extractions: {
          Biomarker: [
            {
              biomarker_name: 'Estrogen Receptor',
              result: 'Positive',
              numeric_value: '5%',
              date: '2022-08-23',
              method: 'IHC',
              extractions: [
                {
                  id: 'e12a3456-7890-abcd-ef12-3456789abcde',
                  category: 'Biomarker',
                  event_type: 'Biomarker',
                  event_detail: 'Biomarker',
                  event_id:
                    '38790137_us.anthropic.claude-3-5-sonnet-20241022-v2:0_14',
                  llm_extraction: 'Estrogen Receptor',
                  reasoning: 'ER status is mentioned in the clinical documents',
                  parser_name: 'Biomarkers',
                  document_id: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  external_created_at: '2022-08-23T00:00:00Z',
                  patient_id: 38790137,
                  case_id: null,
                  filename: 'patient_38790137_biomarker_report.pdf',
                  test_type: 'Biomarker Analysis',
                  casebundling_id: null,
                  casebundling_type: null,
                  product_type: null,
                  document_category: 'Clinical Report',
                  total_pages: 3,
                  document_s3_link:
                    's3://medical-documents/patient_38790137/biomarker_report.pdf',
                  textract_result_s3_link:
                    's3://textract-results/patient_38790137/biomarker_report.json',
                  created_at: '2024-11-09T12:34:56Z',
                  updated_at: '2024-11-10T09:15:23Z',
                  code_label: 'ER_STATUS',
                  code_system: 'LOINC',
                  cdd_version: '2.3.1',
                  confidence_score: 0.95,
                  source: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  ocr_coordinates: {
                    page: 2,
                    bounding_box: {
                      top: 432.15,
                      left: 245.78,
                      width: 120.45,
                      height: 18.32,
                    },
                    text_segment: 'ER Status: Positive (+)',
                    confidence: 0.98,
                  },
                  validation: {
                    status: 'validated',
                    validated_by: 'user123',
                    validated_at: '2024-11-10T09:15:23Z',
                    validation_notes:
                      'Standardized terminology from abbreviation to full name',
                  },
                  modification_tracking: {
                    original_extraction: {
                      llm_extraction: 'ER',
                      confidence_score: 0.95,
                    },
                    modifications: [
                      {
                        modification_id: 'mod-12345-abcde',
                        timestamp: '2024-11-10T09:15:23Z',
                        user_id: 'user123',
                        user_name: 'Dr. Jane Smith',
                        user_role: 'Oncologist',
                        modification_type: 'update',
                        field_modified: 'llm_extraction',
                        previous_value: 'ER',
                        new_value: 'Estrogen Receptor',
                        reason: 'Standardizing terminology',
                        session_id: 'session-67890-fghij',
                      },
                    ],
                  },
                },
                {
                  id: 'f23b4567-8901-bcde-fg23-4567890bcdef',
                  category: 'Biomarker',
                  event_type: 'Biomarker',
                  event_detail: 'Biomarker Result Interpretation',
                  event_id:
                    '38790137_us.anthropic.claude-3-5-sonnet-20241022-v2:0_14',
                  llm_extraction: 'Positive',
                  reasoning:
                    "Document explicitly states 'ER Status: Positive (+)'",
                  parser_name: 'Biomarkers',
                  document_id: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  external_created_at: '2022-08-23T00:00:00Z',
                  patient_id: 38790137,
                  case_id: null,
                  filename: 'patient_38790137_biomarker_report.pdf',
                  test_type: 'Biomarker Analysis',
                  casebundling_id: null,
                  casebundling_type: null,
                  product_type: null,
                  document_category: 'Clinical Report',
                  total_pages: 3,
                  document_s3_link:
                    's3://medical-documents/patient_38790137/biomarker_report.pdf',
                  textract_result_s3_link:
                    's3://textract-results/patient_38790137/biomarker_report.json',
                  created_at: '2024-11-09T12:34:56Z',
                  updated_at: '2024-11-10T09:16:05Z',
                  code_label: 'ER_RESULT',
                  code_system: 'LOINC',
                  cdd_version: '2.3.1',
                  confidence_score: 1.0,
                  source: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  ocr_coordinates: {
                    page: 2,
                    bounding_box: {
                      top: 432.15,
                      left: 345.78,
                      width: 80.45,
                      height: 18.32,
                    },
                    text_segment: 'Positive (+)',
                    confidence: 0.99,
                  },
                  validation: {
                    status: 'validated',
                    validated_by: 'user123',
                    validated_at: '2024-11-10T09:16:05Z',
                    validation_notes: 'Confirmed with source document',
                  },
                  modification_tracking: {
                    original_extraction: {
                      llm_extraction: 'Positive',
                      confidence_score: 0.98,
                    },
                    modifications: [
                      {
                        modification_id: 'mod-12346-bcdef',
                        timestamp: '2024-11-10T09:16:05Z',
                        user_id: 'user123',
                        user_name: 'Dr. Jane Smith',
                        user_role: 'Oncologist',
                        modification_type: 'update',
                        field_modified: 'confidence_score',
                        previous_value: 0.98,
                        new_value: 1.0,
                        reason: 'Manually verified with source document',
                        session_id: 'session-67890-fghij',
                      },
                    ],
                  },
                },
              ],
              human_additions: [
                {
                  id: 'add-12347-cdefg',
                  category: 'Biomarker',
                  event_type: 'Biomarker',
                  event_detail: 'Additional Information',
                  llm_extraction: 'Allred score: 3+2=5',
                  document_id: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  confidence_score: 1.0,
                  ocr_coordinates: {
                    page: 2,
                    bounding_box: {
                      top: 450.22,
                      left: 245.78,
                      width: 180.45,
                      height: 18.32,
                    },
                    manually_selected: true,
                  },
                  validation: {
                    status: 'human_added',
                    validated_by: 'user123',
                    validated_at: '2024-11-10T09:17:30Z',
                    validation_notes:
                      'Information from page 2 of pathology report',
                  },
                  modification_tracking: {
                    creation: {
                      timestamp: '2024-11-10T09:17:30Z',
                      user_id: 'user123',
                      user_name: 'Dr. Jane Smith',
                      user_role: 'Oncologist',
                      reason: 'Adding Allred score from pathology report',
                      session_id: 'session-67890-fghij',
                    },
                    modifications: [],
                  },
                },
              ],
              deleted_extractions: [],
            },
            {
              biomarker_name: 'PR',
              result: 'Negative',
              numeric_value: 'N/A',
              date: '2022-08-23',
              method: 'IHC',
              extractions: [
                {
                  id: 'g34c5678-9012-cdef-gh34-5678901cdefg',
                  category: 'Biomarker',
                  event_type: 'Biomarker',
                  event_detail: 'Biomarker',
                  event_id:
                    '38790137_us.anthropic.claude-3-5-sonnet-20241022-v2:0_15',
                  llm_extraction: 'PR',
                  reasoning: 'PR status is mentioned in the clinical documents',
                  parser_name: 'Biomarkers',
                  document_id: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  external_created_at: '2022-08-23T00:00:00Z',
                  patient_id: 38790137,
                  case_id: null,
                  filename: 'patient_38790137_biomarker_report.pdf',
                  test_type: 'Biomarker Analysis',
                  casebundling_id: null,
                  casebundling_type: null,
                  product_type: null,
                  document_category: 'Clinical Report',
                  total_pages: 3,
                  document_s3_link:
                    's3://medical-documents/patient_38790137/biomarker_report.pdf',
                  textract_result_s3_link:
                    's3://textract-results/patient_38790137/biomarker_report.json',
                  created_at: '2024-11-09T12:34:56Z',
                  updated_at: '2024-11-09T12:34:56Z',
                  code_label: 'PR_STATUS',
                  code_system: 'LOINC',
                  cdd_version: '2.3.1',
                  confidence_score: 0.95,
                  source: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  ocr_coordinates: {
                    page: 2,
                    bounding_box: {
                      top: 460.15,
                      left: 245.78,
                      width: 120.45,
                      height: 18.32,
                    },
                    text_segment: 'PR Status: Negative (-)',
                    confidence: 0.97,
                  },
                  validation: {
                    status: 'pending',
                    validated_by: null,
                    validated_at: null,
                    validation_notes: null,
                  },
                  modification_tracking: {
                    original_extraction: {
                      llm_extraction: 'PR',
                      confidence_score: 0.95,
                    },
                    modifications: [],
                  },
                },
              ],
              human_additions: [],
              deleted_extractions: [],
            },
            {
              biomarker_name: 'HER2',
              result: 'Negative',
              numeric_value: 'N/A',
              date: '2022-08-23',
              method: 'IHC',
              extractions: [
                // HER2 extractions with full details and modification tracking
              ],
              human_additions: [],
              deleted_extractions: [
                {
                  id: 'del-12348-defgh',
                  original_extraction_id:
                    'i56e7890-1234-efgh-ij56-7890123efghi',
                  category: 'Biomarker',
                  event_type: 'Biomarker',
                  event_detail: 'HER2 Score',
                  llm_extraction: '1+',
                  document_id: 'cf3116d2-ef43-43f2-a2df-6c9342f9430d',
                  ocr_coordinates: {
                    page: 2,
                    bounding_box: {
                      top: 490.15,
                      left: 345.78,
                      width: 30.45,
                      height: 18.32,
                    },
                    text_segment: '1+',
                    confidence: 0.99,
                  },
                  modification_tracking: {
                    deletion: {
                      timestamp: '2024-11-10T09:20:45Z',
                      user_id: 'user123',
                      user_name: 'Dr. Jane Smith',
                      user_role: 'Oncologist',
                      reason:
                        'Duplicate information already captured in HER2 status',
                      session_id: 'session-67890-fghij',
                    },
                    original_extraction: {
                      llm_extraction: '1+',
                      confidence_score: 0.92,
                      reasoning: 'HER2 IHC score mentioned in pathology report',
                    },
                  },
                },
              ],
            },
          ],
          'Clinical Follow-Up': [
            // Follow-up extractions with integrated modification tracking and OCR coordinates
          ],
          Condition: [
            // Condition extractions with integrated modification tracking and OCR coordinates
          ],
          'Therapeutic Procedure': [
            // Procedure extractions with integrated modification tracking and OCR coordinates
          ],
        },
        timeline_events: [
          // Timeline events as before
        ],
        error_log: [
          // Error log as before
        ],
        validation_summary: {
          total_extractions: 56,
          validated: 12,
          pending: 44,
          human_added: 3,
          deleted: 1,
          validation_progress: 21.4,
          last_validation_date: '2024-11-10T09:20:45Z',
          validators: [
            {
              user_id: 'user123',
              user_name: 'Dr. Jane Smith',
              user_role: 'Oncologist',
              extractions_validated: 12,
              extractions_added: 3,
              extractions_deleted: 1,
            },
          ],
        },
        validation_sessions: [
          {
            session_id: 'session-67890-fghij',
            user_id: 'user123',
            user_name: 'Dr. Jane Smith',
            user_role: 'Oncologist',
            start_time: '2024-11-10T09:10:15Z',
            end_time: '2024-11-10T09:25:30Z',
            modifications_count: 4,
            categories_modified: ['Biomarker'],
          },
        ],
      };

    expect(test).toBeDefined();
  });
});
