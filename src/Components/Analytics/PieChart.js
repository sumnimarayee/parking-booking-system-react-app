import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Title, Tooltip } from "chart.js";

Chart.register(ArcElement, Legend, Title, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
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

const PieChart = ({ label, dataSetData }) => {
  const data = {
    labels: label,
    datasets: [
      {
        data: dataSetData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
