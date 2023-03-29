import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";
const RequireAuth = ({ children, allowedRoles }: any) => {
  const { role }: any = JSON.parse(localStorage.getItem("user") || "{}");

  const auth = {
    user: localStorage.getItem("user"),
    roles: ["admin"],
  };
  const location = useLocation();
  return auth?.roles?.find((rolee) => allowedRoles?.includes(role)) &&
    auth?.user ? (
    children || <Outlet />
  ) : auth?.user ? (
    <Navigate to={ROUTE_CONSTANTS.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={ROUTE_CONSTANTS.LOGIN} state={{ from: location }} replace />
  );
};
export default RequireAuth;
