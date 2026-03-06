export interface ReInviteUserResponse {
  success: boolean;
  message: string;
  data: ReInviteUserData;
}

export interface ReInviteUserData {
  user_id: number;
  name: string;
  email: string;
  mobile_number: string;
  reinvited: boolean;
}

export interface UsersMasterResponse {
  success: boolean;
  status_code: number;
  message: string;
  data: UsersData;
  meta: PaginationMeta;
}

export interface UsersData {
  users: User[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  is_active: boolean;
  last_login: string;
  roles: string[];
  facilities: string[];
  invites: Invite[];
  invite_status: string;
}

export interface Invite {
  invite_id: number;
  invitation_status: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  current_page_record: number;
}

export interface InviteUserResponse {
  success: boolean;
  message: string;
  data: InviteUserData;
}

export interface InviteUserData {
  user_id: number;
  name: string;
  email: string;
  mobile_number: string;
  reinvited: boolean;
}
