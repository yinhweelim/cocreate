export interface UserContextType {
  email: String;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  authId: String;
  setAuthId: React.Dispatch<React.SetStateAction<String>>;
  currentUser: UserInfoType;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInfoType>>;
  userArray: UserInfoType[];
  setUserArray: React.Dispatch<React.SetStateAction<UserInfoType[]>>;
}

export interface data {
  status?: String;
  errors?: String;
  message?: String;
  msg?: String;
  ok?: Boolean;
  data?: any;
}

export interface returnValue {
  ok: Boolean;
  data: data | any;
}

export interface useFetchType {
  (
    endpoint: String,
    method?: string,
    body?: Object,
    token?: String,
    isExtAPI?: boolean
  ): Promise<{}>;
}

export interface UserInfoType {
  user_id: string;
  role: "PATRON" | "CREATOR";
  creator_id: string | null;
  image_url: string | null;
  given_name: string | null;
}

export interface CreatorData {
  display_name: string;
  tagline: string;
  country_of_operation: string;
  about: string;
  logo_image_url: string;
  slots_per_month: number;
  display_slots_per_month: boolean;
  display_project_count: boolean;
  allow_consultation_booking: boolean;
  consultation_notice_days: number;
  lead_time_in_weeks: number | null;
  project_description_guideline: string;
  payment_instructions: string;
  is_deleted: boolean;
}

export interface Brief {
  id: string;
  creator_id: string;
  creator_name: string;
  patron_id: string;
  patron_name: string;
  product_id: string;
  product_name: string;
  details: string;
  budget_currency: string;
  budget_amount: number;
  created_at: string;
  deadline: Date;
  consultation_slot: Date;
  delivery_method: string;
  status: string;
  image_url: string;
}

export interface Project {
  creator_name: string;
  patron_name: string;
  product_image_url: string;
  requested_deadline: string | null;
  budget_currency: string;
  budget_amount: number;
  current_stage: string;
  current_stage_index: number;
  total_stage_count: string;
  id: string;
  created_at: string;
  patron_id: string;
  creator_id: string;
  brief_id: string;
  agreed_proposal_id: string | null;
  agreed_date: string | null;
  current_stage_id: string;
  is_deleted: boolean;
  name: string;
  is_completed: boolean;
}
