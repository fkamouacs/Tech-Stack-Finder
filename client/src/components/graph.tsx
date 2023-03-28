import React from "react";
import {
  Chart,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

Chart.register(
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

Chart.defaults.font.family = "Nunito";

const graph = (props: {
  data: { x?: String; y?: Number }[];
  query: { city: String; state: String };
}) => {
  const data: ChartData<"bar"> = {
    datasets: [{ label: "count", data: props.data }],
  };

  let isError = false;

  // set error if no data
  if (data.datasets[0].data.length == 0) {
    isError = true;
  }
  const chartTitle = isError ? "" : `${props.query.city}, ${props.query.state}`;

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="flex justify-center mt-4 mx-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default graph;
