import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectToken } from "../../store/slices/authSlice";

function CheckToken() {
  const location = useLocation();
  const token = useSelector(selectToken);

  return token ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default CheckToken;
