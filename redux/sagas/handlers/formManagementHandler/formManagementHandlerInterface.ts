import { properties } from "@/commonJS/interfaces/canvas";

export interface getFormListPayload {
  workspaceId: number;
  query?: string;
}
export interface WorkspaceDetails {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  icon: string;
  custom_domains: string[];
  deleted_at: string | null;
  is_pro: boolean;
  is_enterprise: boolean;
  max_file_size: number;
}

export interface WorkspaceShort {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  icon: string;
  custom_domains: string[];
  deleted_at: string | null;
  is_pro: boolean;
  is_enterprise: boolean;
}

export interface FormExtra {
  loadedWorkspace: WorkspaceShort;
  userIsOwner: boolean;
  cleanings: any[];
}

export interface formListItem {
  id: number;
  title: string;
  slug: string;
  properties: properties[];

  created_at: string;
  updated_at: string;

  description: string;
  submit_button_text: string;
  re_fillable: boolean;
  re_fill_button_text: string;

  color: string;
  uppercase_labels: boolean;
  no_branding: boolean;
  hide_title: boolean;
  submitted_text: string;

  dark_mode: "auto" | "light" | "dark";
  logo_picture: string | null;
  cover_picture: string | null;
  custom_code: string | null;

  theme: string;
  width: "centered" | "full" | string;
  transparent_background: boolean;

  closes_at: string | null;
  closed_text: string;

  use_captcha: boolean;
  can_be_indexed: boolean;
  deleted_at: string | null;

  creator_id: number;
  max_submissions_count: number | null;
  max_submissions_reached_text: string;

  visibility: "public" | "private" | "workspace" | string;

  editable_submissions: boolean;
  editable_submissions_button_text: string;

  confetti_on_submission: boolean;

  seo_meta: any[];
  notification_settings: any[];

  auto_save: boolean;
  custom_domain: string | null;

  extra: FormExtra;

  share_url: string;

  workspace: WorkspaceDetails;

  views_count: number;
  submissions_count: number;

  notifies: boolean;
  notifies_webhook: boolean;
  notifies_slack: boolean;
  notifies_discord: boolean;

  send_submission_confirmation: boolean;

  webhook_url: string | null;
  redirect_url: string | null;
  database_fields_update: any | null;

  cleanings: any[];

  notification_sender: string;
  notification_subject: string;
  notification_body: string;
  notifications_include_submission: boolean;

  password: string | null;
  tags: string[] | null;
  notification_emails: string[] | null;

  slack_webhook_url: string | null;
  discord_webhook_url: string | null;

  removed_properties: properties[];

  last_edited_human: string;

  workspace_id: number;

  is_closed: boolean;
  is_password_protected: boolean;
  has_password: boolean;
  max_number_of_submissions_reached: boolean;

  form_pending_submission_key: string;
  max_file_size: number;
}

export interface FormListMetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface FormListMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: FormListMetaLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}
export interface FormListLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}
