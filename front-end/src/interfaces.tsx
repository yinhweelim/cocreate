export interface UserContextType {
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  role: String;
  setRole: React.Dispatch<React.SetStateAction<String>>;
  userId: String;
  setUserId: React.Dispatch<React.SetStateAction<String>>;
  userInfo: UserInfoType[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>;
  handleLogout: () => void;
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
