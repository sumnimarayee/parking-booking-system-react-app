import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HistoryIcon from "@mui/icons-material/History";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const userSidebar = [
  { title: "Manage Profile", icon: <AccountCircleIcon />, link: "/something" },
  { title: "Book Slot", icon: <BookOnlineIcon />, link: "/booking" },
  { title: "Previous Bookings", icon: <HistoryIcon />, link: "/previous" },
  { title: "Write Reviews", icon: <RateReviewIcon />, link: "/review" },
  { title: "Logout", icon: <LogoutIcon />, link: "/" },
];
