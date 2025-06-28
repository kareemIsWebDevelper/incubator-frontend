export type FormsType = {
  form_id: string;
  form_name: string;
  assigned_organization: string;
  submissions: number;
  last_modified: string;
  created_date: string;
  status: string;
};

export type FormSubmissionType = {
  submission_id: string;
  submitted_by: string;
  startup_name: string;
  organization_name: string;
  program_name: string;
  created_at: string;
  step_name: string;
};

