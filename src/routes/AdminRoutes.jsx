import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;