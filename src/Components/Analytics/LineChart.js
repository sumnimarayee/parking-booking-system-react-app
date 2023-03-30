import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
} from "chart.js";
import { useState } from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "category",
      //   labels: ["January", "February", "March", "April", "May", "June", "July"],
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        font: {
          size: 10,
          weight: "bold",
        },
      },
    },
  },
};

const LineChart = ({ label, dataSetData }) => {
  //   const [dataSetData, setDataSetData] = useState([]);
  //   const [label, setLabel] = useState([]);
  const data = {
    labels: label,
    datasets: [
      {
        label: "Revenue",
        data: dataSetData,
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      //   {
      //     label: "Expenses",
      //     data: [28, 48, 40, 19, 86, 27, 90],
      //     fill: false,
      //     backgroundColor: "rgba(255, 99, 132, 0.5)",
      //     borderColor: "rgba(255, 99, 132, 1)",
      //     borderWidth: 1,
      //   },
    ],
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
