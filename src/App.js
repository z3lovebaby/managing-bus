import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Main from "./layouts/Main";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoutes from "./layouts/PrivateRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import RoleBasedRoute from "./layouts/RoleBasedRoute";
import Layout from "./layouts/Layout";
import UserList from "./components/user/UserList";
import Map from "./components/Map";
import ManageUser from "./components/admin/ManageUser";
import QLNguoiDung from "./components/manager/QLNguoiDung";
import Admin from "./components/admin/AdminDashboard";
import Menu from "./components/admin/Menu";
import AdminDashboard from "./components/admin/AdminDashboard";
import QLTaiXe from "./components/manager/QLTaiXe";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route
          element={
            <Main toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          }
        >
          <Route path="/" element={<Map />} />
          <Route path="/manager/user-list" element={<QLNguoiDung />} />
          <Route path="/manager/driver-list" element={<QLTaiXe />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/test" element={<Dashboard />} />
        </Route>

        {/* Role-Based Routes */}
        <Route element={<RoleBasedRoute requiredRole={true} />}>
          <Route path="/admin" element={<Menu />}>
            <Route path="/admin/admindb" element={<AdminDashboard />} />
            <Route path="/admin/qluser" element={<ManageUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
