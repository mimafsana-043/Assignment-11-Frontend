import { Navigate, useLocation } from "react-router-dom";

import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {

  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      state={location.pathname}
      replace
    />
  );
};

export default PrivateRoute;