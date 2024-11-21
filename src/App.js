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
import Layout from "./layouts/Layout";
import UserList from "./components/user/UserList";
import Map from "./components/Map";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("1223445", isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          element={
            <Main toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          }
        >
          <Route path="/" element={<Map />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<UserList />} />
          <Route path="/test" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
