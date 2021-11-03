import { Navigate, Route } from "react-router";
import { useAuth } from "./components/Context/authProvider";

export const PrivateRoute = ({ path, ...props }) => {
  const { authState } = useAuth();
  if (authState.isLoggedIn) {
    return <Route path={path} {...props} />;
  }
  return <Navigate state={{ from: path }} replace to="/login" />;
};
