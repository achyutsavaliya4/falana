import { properties } from "@/commonJS/interfaces/canvas";

export interface CreateForm {
  title: string;
  visibility: "public" | "closed" | "draft";
  theme: string;
  width: string;
  dark_mode: "system" | "light" | "dark";
  color: string;
  hide_title: boolean;
  uppercase_labels: boolean;
  no_branding: boolean;
  transparent_background: boolean;
  workspace_id: number;

  description?: string | null;
  properties?: properties[];

  notifies?: boolean;
  slack_notifies?: boolean;
  send_submission_confirmation?: boolean;
  webhook_url?: string | null;
  notification_settings?: Record<string, any>;

  notification_sender?: string;
  notification_subject?: string;
  notification_body?: string;
  notifications_include_submission?: boolean;

  auto_save?: boolean;
  submit_button_text?: string;
  submitted_text?: string;

  re_fillable?: boolean;
  re_fill_button_text?: string;
  editable_submissions_button_text?: string;

  closes_at?: string | null;
  closed_text?: string;

  max_submissions_count?: number | null;
  max_submissions_reached_text?: string;

  use_captcha?: boolean;
  is_rating?: boolean;
  rating_max_value?: number;
  confetti_on_submission?: boolean;

  can_be_indexed?: boolean;
  seo_meta?: SeoMeta;

  redirect_url?: string | null;
  database_fields_update?: any | null;
}

export interface SeoMeta {
  page_title: string | null;
  page_description: string | null;
  page_thumbnail: string | null;
}
