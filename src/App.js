import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "./layouts/Main";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoutes from "./layouts/PrivateRoutes";
import PublicRoutes from "./layouts/PublicRoutes";
import RoleBasedRoute from "./layouts/RoleBasedRoute";
import ProtectManRoutes from "./layouts/ProtectManRoutes";
import Layout from "./layouts/Layout";
import UserList from "./components/user/UserList";
import Map from "./components/Map";
import ManageUser from "./components/admin/ManageUser";
import QLNguoiDung from "./components/manager/QLNguoiDung";
import Admin from "./components/admin/AdminDashboard";
import Menu from "./components/admin/Menu";
import AdminDashboard from "./components/admin/AdminDashboard";
import QLTaiXe from "./components/manager/QLTaiXe";
import Feedback from "./components/manager/Feedback";
import MapDriver from "./components/driver/MapDriver";
import RouteMap from "./components/test";
function App() {
  useEffect(() => {
    console.log("1111");
  });
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* man route */}
        <Route element={<ProtectManRoutes />}>
          <Route element={<Main />}>
            <Route path="/manager/user-list" element={<QLNguoiDung />} />
            <Route path="/manager/driver-list" element={<QLTaiXe />} />
            <Route path="/manager/feedback" element={<Feedback />} />
          </Route>
        </Route>

        <Route element={<Main />}>
          <Route path="/" element={<Map />} />
          <Route path="/test123" element={<RouteMap />} />
          <Route path="/driver" element={<MapDriver />} />
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
        <Route element={<RoleBasedRoute />}>
          <Route element={<Menu />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/qluser" element={<ManageUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
