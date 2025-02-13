import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ roles, allowedRoles }) => {
  const hasAccess = roles?.some((role) => allowedRoles.includes(role));

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;