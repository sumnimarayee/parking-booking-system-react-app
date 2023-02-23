import React from "react";
import "../../styles/Sidebar.css";
import { userSidebar } from "./SidebarData";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {userSidebar.map((val, key) => {
          return (
            <li
              key={key}
              className="SidebarRow"
              onClick={() => {
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
