import { useEffect } from "react";
import { useState } from "react";
import BarChart from "./BarChart";
import "./index.css";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Tile from "./Tile";

const Analytics = () => {
  const [revenueLabel, setRevenueLabel] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [totalBookingsLabel, setTotalBookingsLabel] = useState([]);
  const [totalBookingsData, setTotalBookingsData] = useState([]);
  const [perHourBookingsLabel, setPerHourBookingsLabel] = useState([]);
  const [
    perHourBookingsDataForTwoWheeler,
    setPerHourBookingsDataForTwoWheeler,
  ] = useState([]);
  const [totalRevenueForToday, setTotalRevenueForToday] = useState(0);
  const [totalBookingsForToday, setTotalBookingsForToday] = useState(0);
  const [
    perHourBookingsDataForFourWheeler,
    setPerHourBookingsDataForFourWheeler,
  ] = useState([]);
  const parkingLotId = localStorage.getItem("parkingLotId");

  const navigate = useNavigate();
  const axios = useAxiosprivate();

  const fetchRevenueData = async (filter) => {
    const response = await axios.get(
      `/analytics/get-revenue-data/${parkingLotId}?timePeriod=${
        filter ? filter : "thisWeek"
      }`
    );
    setRevenueData(response.data.data.data);
    setRevenueLabel(response.data.data.label);
  };

  const fetchTotalBookingsData = async (filter) => {
    const response = await axios.get(
      `/analytics/get-bookings-data/${parkingLotId}?timePeriod=${
        filter ? filter : "today"
      }`
    );
    setTotalBookingsData(response.data.data.data);
    setTotalBookingsLabel(response.data.data.label);
  };

  const fetchPerHourBookingsData = async (filter) => {
    const response = await axios.get(
      `/analytics/get-perhour-booking-data/${parkingLotId}?timePeriod=${
        filter ? filter : "today"
      }`
    );
    setPerHourBookingsLabel(response.data.data.label);
    setPerHourBookingsDataForTwoWheeler(response.data.data.twoWheelerData);
    setPerHourBookingsDataForFourWheeler(response.data.data.fourWheelerData);
  };

  const fetchTodayData = async () => {
    const response = await axios.get(
      `/analytics/get-today-data/${parkingLotId}`
    );
    setTotalRevenueForToday(response.data.data.totalRevenue);
    setTotalBookingsForToday(response.data.data.totalBookings);
  };

  useEffect(() => {
    if (!parkingLotId) {
      navigate("/staff-dashboard");
    }
    const fetchAllChartInitially = async () => {
      fetchTodayData();
      fetchTotalBookingsData();
      fetchPerHourBookingsData();
      fetchRevenueData();
    };
    fetchAllChartInitially();
  }, []);
  return (
    <div className="analytics-container">
      <div className="chart-container">
        <div className="tile-heading">Today's Information</div>
        <div className="current-day-data-container">
          <Tile
            title={"Revenue Collected"}
            value={totalRevenueForToday}
            type={"revenue"}
          ></Tile>
          <Tile
            title={"Bookings Made"}
            value={totalBookingsForToday}
            type={"bookings"}
          ></Tile>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart-filter-container">
          <div className="chart-heading">Total Bookings Per Day</div>
          <div className="filter-selector">
            <select
              className="form-select"
              onChange={(e) => {
                fetchTotalBookingsData(e.target.value);
              }}
            >
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
        <PieChart label={totalBookingsLabel} dataSetData={totalBookingsData} />
      </div>
      <div className="chart-container">
        <div className="chart-filter-container">
          <div className="chart-heading">Total Bookings Per Hour</div>
          <div className="filter-selector">
            <select
              className="form-select"
              onChange={(e) => {
                fetchPerHourBookingsData(e.target.value);
              }}
            >
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
        <BarChart
          label={perHourBookingsLabel}
          twoWheelerData={perHourBookingsDataForTwoWheeler}
          fourWheelerData={perHourBookingsDataForFourWheeler}
        />
      </div>
      <div className="chart-container">
        <div className="chart-filter-container">
          <div className="chart-heading">Total Generated Revenue</div>
          <div className="filter-selector">
            <select
              className="form-select"
              onChange={(e) => {
                fetchRevenueData(e.target.value);
              }}
            >
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
        <LineChart label={revenueLabel} dataSetData={revenueData} />
      </div>
    </div>
  );
};

export default Analytics;
