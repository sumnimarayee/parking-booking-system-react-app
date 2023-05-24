import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarController, BarElement);
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
const BarChart = ({ label, twoWheelerData, fourWheelerData }) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: "Two-Wheeler",
        data: twoWheelerData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Four-Wheeler",
        data: fourWheelerData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
