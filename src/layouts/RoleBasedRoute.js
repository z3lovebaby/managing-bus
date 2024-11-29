import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("admin")); // Lấy user từ localStorage

  // Kiểm tra vai trò
  console.log(user);
  return user && user === requiredRole ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RoleBasedRoute;
