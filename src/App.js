import Register from "./Components/UserRegister";
import Login from "./Components/Login";
import UserDashboard from "./Components/UserDashboard";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddParkingLot from "./Components/AddParkingLot";
import BookingInformation from "./Components/BookingInformation";
import TimeSelection from "./Components/TimeSelection";
import Sidebar from "./Components/sidebar/Sidebar";
import InitialUpdate from "./Components/StaffProfileUpdate/InitialUpdate";
import StaffDashboard from "./Components/StaffDashboard/StaffDashboard";
import Layout from "./Components/Layout";
import RequireAuth from "./Components/RequireAuth";
import NotFound from "./Components/FallbackComponents/NotFound";
import Unauthorized from "./Components/FallbackComponents/Unauthorized";
import PersistLogin from "./Components/PersistLogin";
import ParkingPayment from "./Components/ParkingPayment";
import UsersTable from "./Components/Common/userTable";
import Analytics from "./Components/Analytics/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PersistLogin />}>
          {/* Staff specific routes */}
          <Route element={<RequireAuth roleName="isStaff" />}>
            <Route path="/initial-update" element={<InitialUpdate />} />
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/test" element={<Analytics />} />
          </Route>

          {/* User specific routes */}
          <Route element={<RequireAuth roleName="isBookingUser" />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/book" element={<BookingInformation />} />
            <Route path="/time-selection" element={<TimeSelection />} />
            <Route path="/parking-payment" element={<ParkingPayment />} />
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
