import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRoute;