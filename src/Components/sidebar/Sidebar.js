import React from "react";
import "../../styles/Sidebar.css";
import { userSidebar, staffSidebar, superAdminSidebar } from "./SidebarData";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const Sidebar = ({ displaySidebar }) => {
  const { auth } = useAuth();
  const sideBar = auth.role.isBookingUser
    ? userSidebar
    : auth.role.isStaff
    ? staffSidebar
    : auth.role.isSuperAdmin
    ? superAdminSidebar
    : null;
  const logout = useLogout();
  return (
    <div className={`Sidebar ${displaySidebar ? "Sidebar-display" : ""}`}>
      <ul className="SidebarList">
        {sideBar.map((val, key) => {
          return (
            <li
              key={key}
              className="SidebarRow"
              onClick={async () => {
                val.title === "Logout" ? await logout() : console.log("");
                console.log("logout found");
                window.location.pathname = val.link;
              }}
              id={window.location.pathname == val.link ? "active" : ""}
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
