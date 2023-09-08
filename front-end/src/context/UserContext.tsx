import React, { createContext } from "react";

type UserContextType = {
  accessToken: any;
  setAccessToken: React.Dispatch<any>;
  userArray: any;
  setUserArray: React.Dispatch<any>;
  authId: string;
  setAuthId: React.Dispatch<any>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
