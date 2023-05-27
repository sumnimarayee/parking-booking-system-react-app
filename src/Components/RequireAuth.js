import { useLocation, Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/sidebar/Sidebar";
import useAuth from "../hooks/useAuth";
import Navbar from "./navbar/Navbar";
import { useState } from "react";

const RequireAuth = ({ roleName }) => {
  const { auth } = useAuth();
  const [displaySidebar, setDisplaySidebar] = useState(false);
  return auth?.role?.[roleName] ? (
    <>
      <Navbar
        toggleSidebar={setDisplaySidebar}
        displaySidebar={displaySidebar}
      />
      <Sidebar displaySidebar={displaySidebar} />
      <Outlet />
    </>
  ) : auth?.access_token ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/" />
  );
};

export default RequireAuth;
