import Register from "./Components/UserRegister";
import Login from "./Components/Login";
import UserDashboard from "./Components/UserDashboard";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddParkingLot from "./Components/AddParkingLot";
import BookingInformation from "./Components/BookingInformation";
import TimeSelection from "./Components/TimeSelection";
import Esewa from "./Components/Esewa";
import Sidebar from "./Components/sidebar/Sidebar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route
              path="/superAdmin-dashboard"
              element={<SuperAdminDashboard />}
            />
            <Route path="/add-parkinglot" element={<AddParkingLot />} />
            <Route path="/book" element={<BookingInformation />} />
            <Route path="/test" element={<TimeSelection />} />
            <Route path="/parking-payment" element={<Esewa />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
