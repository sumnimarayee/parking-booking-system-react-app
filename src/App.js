import Register from "./Components/UserRegister";
import Login from "./Components/Login";
import MapViewSelection from "./Components/MapViewSelection";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddParkingLot from "./Components/AddParkingLot";
import BookingInformation from "./Components/BookingInformation";
import TimeSelection from "./Components/TimeSelection";
import InitialUpdate from "./Components/StaffProfileUpdate/InitialUpdate";
import StaffDashboard from "./Components/StaffDashboard/StaffDashboard";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";
import NotFound from "./Components/FallbackComponents/NotFound";
import Unauthorized from "./Components/FallbackComponents/Unauthorized";
import PersistLogin from "./Components/PersistLogin";
import ParkingPayment from "./Components/ParkingPayment";
import Analytics from "./Components/Analytics/index";
import BookingHistory from "./Components/BookingHistory";
import UserProfileUpdate from "./Components/UserProfileUpdate/UserProfileUpdate";
import ReviewForm from "./Components/Reviews/ReviewForm";
import TotalReviews from "./Components/Reviews/TotalReviews";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { messaging } from "./utils/Firebase";
import { getToken } from "firebase/messaging";
import useAxiosprivate from "./hooks/useAxiosPrivate";
import useAuth from "./hooks/useAuth";

function App() {
  useEffect(() => {
    // const socket = io("http://localhost:3002");
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view-reviews/:id" element={<TotalReviews />} />
        <Route element={<PersistLogin />}>
          {/* Staff specific routes */}
          <Route element={<RequireAuth roleName="isStaff" />}>
            <Route path="/initial-update" element={<InitialUpdate />} />
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>

          {/* User specific routes */}
          <Route element={<RequireAuth roleName="isBookingUser" />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/map-view-selection" element={<MapViewSelection />} />
            <Route path="/book" element={<BookingInformation />} />
            <Route path="/time-selection" element={<TimeSelection />} />
            <Route path="/parking-payment" element={<ParkingPayment />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="/review/:id" element={<ReviewForm />} />
            <Route
              path="/user-profile-update"
              element={<UserProfileUpdate />}
            />
          </Route>

          {/* SuperAdmin specific routes */}
          <Route element={<RequireAuth roleName="isSuperAdmin" />}>
            <Route
              path="/superAdmin-dashboard"
              element={<SuperAdminDashboard />}
            />
            <Route path="/add-parkinglot" element={<AddParkingLot />} />
          </Route>
        </Route>

        {/* Fallback components */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
