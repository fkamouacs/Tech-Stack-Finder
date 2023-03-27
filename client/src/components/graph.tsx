import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const graph = (props: { data: { x?: String; y?: Number }[] }) => {
  const data = { datasets: [{ data: props.data }] };

  console.log(data);
  const renderLineChart = <Bar options={options} data={data} />;

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default graph;
