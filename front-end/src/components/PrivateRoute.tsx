import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = ({ children }: any) => {
  const userCtx = useContext(UserContext);
  const location = useLocation(); // Capture the current location

  if (!userCtx?.authId) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
