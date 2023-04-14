import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import RateReviewIcon from "@mui/icons-material/RateReview";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const userSidebar = [
  { title: "Dashboard", icon: <DashboardIcon />, link: "/user-dashboard" },
  {
    title: "Manage Profile",
    icon: <AccountCircleIcon />,
    link: "/user-profile-update",
  },
  { title: "Book Slot", icon: <BookOnlineIcon />, link: "/booking" },
  {
    title: "Previous Bookings",
    icon: <ManageHistoryIcon />,
    link: "/booking-history",
  },
  { title: "Notifications", icon: <NotificationsIcon />, link: "/review" },
  { title: "Logout", icon: <LogoutIcon />, link: "/login" },
];
export const staffSidebar = [
  { title: "Dashboard", icon: <DashboardIcon />, link: "/staff-dashboard" },
  {
    title: "Manage ParkingLot",
    icon: <AccountCircleIcon />,
    link: "/initial-update",
  },
  { title: "Analytics", icon: <BarChartIcon />, link: "/analytics" },
  { title: "View Reviews", icon: <RateReviewIcon />, link: "/view-reviews" },
  { title: "Logout", icon: <LogoutIcon />, link: "/login" },
];
export const superAdminSidebar = [
  { title: "Dashboard", icon: <DashboardIcon />, link: "/something" },
  { title: "Add Parkings", icon: <AddBoxIcon />, link: "/something" },
  { title: "Logout", icon: <LogoutIcon />, link: "/login" },
];
