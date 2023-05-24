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
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        fontSize: 16,
        fontColor: "black",
        boxWidth: 20,
        usePointStyle: true,
      },
    },
    tooltips: {
      callbacks: {
        label: function (context) {
          return context.label + ": " + context.parsed + "%";
        },
      },
    },
  },
};
const LineChart = ({ label, dataSetData }) => {
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
    ],
  };
  return <Line data={data} options={options} />;
};

export default LineChart;
