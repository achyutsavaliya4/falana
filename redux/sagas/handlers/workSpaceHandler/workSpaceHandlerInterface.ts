export interface WorkspaceListItem {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  icon: string;
  custom_domains: string[];
  deleted_at: string | null;
  is_pro: boolean;
  is_enterprise: boolean;
  pivot: {
    user_id: number;
    workspace_id: number;
  };
  max_file_size: number;
}
