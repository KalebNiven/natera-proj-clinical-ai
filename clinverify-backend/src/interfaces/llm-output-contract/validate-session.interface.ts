export interface IValidateSession {
  session_id: string;
  user_id: string;
  user_name: string;
  user_role: string;
  start_time: string;
  end_time: string;
  modifications_count: number;
  categories_modified: string[];
}
