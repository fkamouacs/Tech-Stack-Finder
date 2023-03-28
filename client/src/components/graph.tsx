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

const options: ChartOptions<"bar"> = {
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
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const graph = (props: { data: { x?: String; y?: Number }[] }) => {
  const data: ChartData<"bar"> = { datasets: [{ data: props.data }] };
  return (
    <div className="flex justify-center">
      <Bar options={options} data={data} />
    </div>
  );
};

export default graph;
