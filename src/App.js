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
import InitialUpdate from "./Components/StaffProfileUpdate/InitialUpdate";

function App() {
  return (
    <div class="container-fluid">
      <div class="row">
        {/* <div class="col-sm-2" style={{ padding: "0" }}>
          <Sidebar />
        </div> */}
        <div class="col-sm-12" style={{ padding: "0" }}>
          <Router>
            <Routes>
              <Route path="/" element={<InitialUpdate />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route
                path="/superAdmin-dashboard"
                element={<SuperAdminDashboard />}
              />
              <Route path="/add-parkinglot" element={<AddParkingLot />} />
              <Route path="/book" element={<BookingInformation />} />
              <Route path="/time-selection" element={<TimeSelection />} />
              <Route path="/parking-payment" element={<Esewa />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>

    // <div style={{ display: "flex" }}>
    //   <Sidebar />
    //   <div>
    //     <Router>
    //       <Routes>
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/register" element={<Register />} />
    //         <Route path="/user-dashboard" element={<UserDashboard />} />
    //         <Route
    //           path="/superAdmin-dashboard"
    //           element={<SuperAdminDashboard />}
    //         />
    //         <Route path="/add-parkinglot" element={<AddParkingLot />} />
    //         <Route path="/book" element={<BookingInformation />} />
    //         <Route path="/test" element={<TimeSelection />} />
    //         <Route path="/parking-payment" element={<Esewa />} />
    //       </Routes>
    //     </Router>
    //   </div>
    // </div>
  );
}

export default App;
