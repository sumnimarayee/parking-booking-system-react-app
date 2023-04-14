import React, { useEffect, useState } from "react";
// import { Table, Button } from "react-bootstrap";
import "./StaffDashboard.css";
import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CSVLink } from "react-csv";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { computeStaffProfileUpdatePercentage } from "../../utils/utility";
import CircularProgressBar from "../Common/CircularProgressBar";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import CarIcon from "@mui/icons-material/DirectionsCar";
import BikeIcon from "@mui/icons-material/TwoWheeler";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";

function StaffDashboard() {
  const [tableData, setTableData] = useState([]);
  const [profileCompletedPercentage, setProfileCompletedPercentage] =
    useState(0);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});
  const [displayManualEntryBox, setDisplayManualEntryBox] = useState(false);
  const [manualEntryData, setManualEntryData] = useState({
    vehiclePlateNo: "",
    vehicleType: "twoWheeler",
  });
  const [manualEntryErrors, setManualEntryErrors] = useState({});

  const axios = useAxiosprivate();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const timeFormatter = (data, row) => {
    const startTime = data.split("-")[0];
    const endTime = data.split("-")[1];
    // return <div onClick={() => console.log(row)}>email = {data}</div>;
    return (
      <div className="intable-column-time">
        <div className="start-time">{startTime}</div>
        <div style={{ margin: "0px 4px" }}>-</div>
        {row.bookingStatus === "ongoing" && row.bookingType === "offline" ? (
          <div className="end-time">__:__</div>
        ) : (
          <div className="end-time">{endTime}</div>
        )}
      </div>
    );
  };

  const vehicleTypeFormatter = (data, row) => {
    return (
      <div>
        {data === "twoWheeler" ? (
          <div className="intable-column-vehicletype">
            <div>Two Wheeler</div>
            <div>
              <BikeIcon
                style={{ width: "2rem", height: "2rem", marginLeft: "5px" }}
              />
            </div>
          </div>
        ) : data === "fourWheeler" ? (
          <div className="intable-column-vehicletype">
            <div>Four Wheeler</div>
            <div>
              <CarIcon
                style={{ width: "2rem", height: "2rem", marginLeft: "5px" }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const handleCompleteBookingConfirmation = async (data) => {
    setModal({ show: false });
    setLoader(true);
    const parkingLotId = localStorage.getItem("parkingLotId");
    const payload = {
      bookedParkingLot: parkingLotId,
      bookingId: data.booking._id,
    };

    console.log(payload);
    console.log("im successfully displayed");

    axios
      .post("/booking/close-booking", payload)
      .then((response) => {
        const responseData = response.data.data;
        let message = "";
        if (responseData.bookingType === "offline") {
          message = "Total Amount: " + responseData.totalAmountToBePaid;
        } else if (responseData.bookingType === "online") {
          message =
            "Extra Amount To Be Paid: " + responseData.extraAmountToBePaid;
        }

        axios
          .get(`parking-lot/staff/${auth.id}`)
          .then((response) => {
            data.setTableData(response.data.data.bookings);
          })
          .catch((err) => {});

        setModal({
          show: true,
          title: "Booking Closed",
          message: message,
          type: "information",
        });
      })
      .catch((error) => {
        setLoader(false);
      });

    setLoader(false);
  };

  const completeBookingFormatter = (data, row) => {
    return (
      <div className="intable-column-boooking-complete-button">
        {row.bookingStatus === "ongoing" ? (
          <button
            className="btn btn-outline-success"
            onClick={() => {
              console.log("here");
              setModal({
                show: true,
                title: "Confirm Complete Booking",
                message: "Are you sure you want to complete this booking?",
                type: "confirmation",
                handleConfirmation: handleCompleteBookingConfirmation,
                data: {
                  booking: row,
                  setTableData: setTableData,
                },
              });
            }}
          >
            <DoneIcon />
          </button>
        ) : row.bookingStatus === "completed" ? (
          <button className="btn btn-success">
            <DoneAllIcon />
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };

  const columns = [
    {
      dataField: "assignedSlot",
      text: "Slot",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "bookedTime",
      text: "Book Period",
      formatter: timeFormatter,
    },
    {
      dataField: "vehicleType",
      text: "Vehicle Type",
      formatter: vehicleTypeFormatter,
    },
    {
      dataField: "vehiclePlateNo",
      text: "Plate No.",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "bookingType", text: "Type", sort: true },
    { dataField: "bookingStatus", text: "Status", sort: true },
    { dataField: "", text: "", formatter: completeBookingFormatter },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPageList: [10, 25, 50, 100],
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) => {},
    onSizePerPageChange: (page, sizePerPage) => {},
  });
  const fetchParkingLot = async () => {
    const response = await axios.get(`parking-lot/staff/${auth.id}`);
    setTableData(response.data.data.bookings);
    setAuth({ ...auth, parkingLotId: response.data.data.parkingLot._id });
    const computedPercentage = computeStaffProfileUpdatePercentage(
      response.data.data.parkingLot.updatedItems
    );
    localStorage.setItem("profileCompletedPercentage", computedPercentage);
    setProfileCompletedPercentage(computedPercentage);
    // console.log();
    localStorage.setItem("parkingLotId", response.data.data.parkingLot._id);
  };
  useEffect(() => {
    fetchParkingLot();
  }, []);

  const csvReport = {
    data: tableData.length > 0 ? tableData : [{ null: null }],
    filename: "test.csv",
  };

  const handleManualEntrySubmission = () => {
    setLoader(true);
    const errors = {};

    if (
      !manualEntryData.vehiclePlateNo ||
      !/^\d{4}$/.test(manualEntryData.vehiclePlateNo)
    ) {
      errors.plateNumber = "Provide 4 digit vehicle plate number";
    }

    if (
      !manualEntryData.vehicleType ||
      !manualEntryData.vehicleType === "twoWheeler" ||
      !manualEntryData.vehicleType === "fourWheeler"
    ) {
      errors.vehicleType = "Select vehicle type";
    }

    setManualEntryErrors(errors);
    if (Object.keys(errors).length === 0) {
      const payload = {
        ...manualEntryData,
        bookedParkingLot: localStorage.getItem("parkingLotId"),
      };
      axios
        .post("booking/manual-booking", payload)
        .then((response) => {
          setLoader(false);
          setDisplayManualEntryBox(false);
          setManualEntryData({
            vehiclePlateNo: "",
            vehicleType: "twoWheeler",
          });
          setManualEntryErrors({});
          setModal({
            show: true,
            title: "Manual Entry Created!",
            message: "The manual booking is created",
            type: "success",
          });
          fetchParkingLot();
        })
        .catch((err) => {
          setLoader(false);
          setManualEntryErrors({});
          setModal({
            show: true,
            title: "Error creating entry!",
            message: err.response.data.message,
            type: "failure",
          });
        });
    }
    setLoader(false);
  };
  return (
    <div className="staff-dashboard-container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          hideAfterSeconds={modal.hideAfterSeconds}
          handleConfirmation={modal.handleConfirmation}
          data={modal.data}
        />
      ) : (
        ""
      )}
      <div className="heading-buttons-container">
        <div className="table-name-container">
          <div>
            <InfoIcon />
          </div>
          <div className="table-name">Booking Details For Today</div>
        </div>
        <div className="buttons-container">
          <button
            className="btn btn-outline-primary button-1"
            onClick={() => {
              setDisplayManualEntryBox(true);
            }}
          >
            Manual Entry
          </button>
          <div
            className={`manual-entry-box ${
              displayManualEntryBox ? "manual-entry-box-display" : ""
            }`}
          >
            <div className="mb-3">
              <label for="plateNumberInput" className="form-label">
                Plate No
              </label>
              <input
                type="text"
                className="form-control"
                id="plateNumberInput"
                placeholder="Plate Number"
                value={manualEntryData.vehiclePlateNo}
                onChange={(e) => {
                  if (e.target.value.length <= 4) {
                    setManualEntryData({
                      ...manualEntryData,
                      vehiclePlateNo: e.target.value,
                    });
                  }
                }}
              />
              <div className="form-error-message">
                {manualEntryErrors.plateNumber}
              </div>
              <label for="vehicleTypeDropdown" className="form-label">
                Vehicle Type
              </label>
              <select
                className="form-select"
                value={manualEntryData.vehicleType}
                onChange={(e) => {
                  setManualEntryData({
                    ...manualEntryData,
                    vehicleType: e.target.value,
                  });
                }}
              >
                <option defaultValue disabled>
                  Select vehicle type
                </option>
                <option value="twoWheeler">2 Wheeler</option>
                <option value="fourWheeler">4 Wheeler</option>
              </select>
              <div className="form-error-message">
                {manualEntryErrors.vehicleType}
              </div>
            </div>
            <div className="create-manual-entry-button">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleManualEntrySubmission()}
              >
                Create
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  setDisplayManualEntryBox(false);
                  setManualEntryErrors({});
                  setManualEntryData({
                    vehiclePlateNo: "",
                    vehicleType: "twoWheeler",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
          <button className="btn btn-outline-primary button-2">
            <CSVLink {...csvReport}>export</CSVLink>
          </button>
        </div>
      </div>

      {/* <div className="search-container">
        <div className="grid-item-1">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Enter Vehicle Plate Number"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </div>

        <div className="grid-item-2">
          <div>13</div>
        </div>
        <div className="grid-item-3">
          <RefreshIcon />
        </div>
        <div className="col-sm-10"></div>
        <div className="col-sm-1"></div>
        <div className="col-sm-1">
          <RefreshIcon />
        </div>
      </div> */}
      {profileCompletedPercentage === 100 ? (
        tableData.length > 0 ? (
          <BootstrapTable
            data={tableData}
            columns={columns}
            keyField="_id"
            //   {...props.baseProps}
            bootstrap4
            //   headerClasses="table-header"
            hover
            condensed
            striped
            pagination={pagination}
            filter={filterFactory()}
          />
        ) : (
          <div className="no-booking-text">
            <div>No Bookings For Today</div>
          </div>
        )
      ) : (
        <div className="complete-profile-update-card">
          <div className="card">
            <div className="card-top">
              <div
                style={{
                  width: "5.5rem",
                  height: "5.5rem",
                  display: "inline-block",
                  marginTop: "10px",
                }}
              >
                <CircularProgressBar
                  completedPercentage={profileCompletedPercentage}
                />
              </div>
              <div className="complete-update-description">
                <div>
                  Update the profile for all section from the "update profile"
                  <br />
                  section with at least 3 images by clicking on the button
                  below.
                </div>
              </div>
            </div>
            <div className="card-bottom">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/initial-update")}
              >
                update profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffDashboard;
