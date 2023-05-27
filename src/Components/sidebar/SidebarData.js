import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import RateReviewIcon from "@mui/icons-material/RateReview";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import MapIcon from "@mui/icons-material/Map";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const userSidebar = [
  { title: "Dashboard", icon: <DashboardIcon />, link: "/user-dashboard" },
  {
    title: "Manage Profile",
    icon: <AccountCircleIcon />,
    link: "/user-profile-update",
  },
  { title: "Browse Map", icon: <MapIcon />, link: "/map-view-selection" },
  {
    title: "Previous Bookings",
    icon: <ManageHistoryIcon />,
    link: "/booking-history",
  },
  { title: "Logout", icon: <LogoutIcon />, link: "/" },
];
export const staffSidebar = [
  { title: "Dashboard", icon: <DashboardIcon />, link: "/staff-dashboard" },
  {
    title: "Manage ParkingLot",
    icon: <AccountCircleIcon />,
    link: "/initial-update",
  },
  { title: "Analytics", icon: <BarChartIcon />, link: "/analytics" },
  {
    title: "View Reviews",
    icon: <RateReviewIcon />,
    link: "/view-reviews-staff",
  },
  { title: "Logout", icon: <LogoutIcon />, link: "/" },
];
export const superAdminSidebar = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/superAdmin-dashboard",
  },
  { title: "Add Parkings", icon: <AddBoxIcon />, link: "/add-parkinglot" },
  { title: "Logout", icon: <LogoutIcon />, link: "/" },
];
