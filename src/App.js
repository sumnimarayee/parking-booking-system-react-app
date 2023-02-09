import Register from "./Components/UserRegister";
import Login from "./Components/Login";
import UserDashboard from "./Components/UserDashboard";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddParkingLot from "./Components/AddParkingLot";
import ParkingRegister from "./Components/ParkingRegister";
import BookingInformation from "./Components/BookingInformation";

function App() {
  return (
    <>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
