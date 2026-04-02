import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { authTokens } = useContext(AuthContext);

  if (!authTokens) {
    return <Navigate to="/login" />;
  }

  return children;
}
