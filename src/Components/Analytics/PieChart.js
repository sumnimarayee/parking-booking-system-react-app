import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Title, Tooltip } from "chart.js";

Chart.register(ArcElement, Legend, Title, Tooltip);

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: {
        fontSize: 14,
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

const PieChart = () => {
  return <Pie data={data} options={options} />;
};

export default PieChart;
