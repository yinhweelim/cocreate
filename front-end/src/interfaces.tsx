export interface UserContextType {
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  // role: String;
  // setRole: React.Dispatch<React.SetStateAction<String>>;
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
  lead_time_in_weeks: number;
  project_description_guideline: string;
  payment_instructions: string;
  is_deleted: boolean;
}
