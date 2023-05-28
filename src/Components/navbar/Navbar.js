import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/Navbar.css";

const Navbar = ({ toggleSidebar, displaySidebar }) => {
  const handleToggleSidebar = () => {
    toggleSidebar(!displaySidebar);
  };
  return (
    <>
      <div className="navigation-bar">
        <div className="burger-menu" onClick={() => handleToggleSidebar()}>
          {displaySidebar ? (
            <CloseIcon style={{ color: "white" }} />
          ) : (
            <MenuIcon style={{ color: "white" }} />
          )}
        </div>
        <div className="software-name">Parking Booking System</div>
      </div>
    </>
  );
};

export default Navbar;
