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
      {/* <div className="row">
        <div className="col-sm-3"> */}
      <Sidebar displaySidebar={displaySidebar} />
      {/* </div>
        <div className="col-sm-9"> */}
      <Outlet />
      {/* </div>
      </div> */}
    </>
  ) : auth?.access_token ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
