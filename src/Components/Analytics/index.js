import { useEffect } from "react";
import { useState } from "react";
import BarChart from "./BarChart";
import "./index.css";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import useAxiosprivate from "../../hooks/useAxiosPrivate";

const Analytics = () => {
  const [revenueLabel, setRevenueLabel] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  const axios = useAxiosprivate();

  const fetchRevenueData = async (filter) => {
    const response = await axios.get(
      `/analytics/get-revenue-data?timePeriod=${filter ? filter : "thisWeek"}`
    );
    setRevenueData(response.data.data.data);
    setRevenueLabel(response.data.data.label);
  };

  useEffect(() => {
    const fetchAllChartInitially = async () => {
      fetchRevenueData("thisWeek");
    };
    fetchAllChartInitially();
  }, []);
  return (
    <div className="analytics-container">
      <div className="chart-container"></div>
      <div className="chart-container">
        <PieChart />
      </div>
      <div className="chart-container">
        <BarChart />
      </div>
      <div className="chart-container">
        <div className="chart-filter-container">
          <div className="filter-selector">
            <select
              className="form-select"
              onChange={(e) => {
                console.log("something");
                console.log("incoming value  = " + e.target.value);
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
