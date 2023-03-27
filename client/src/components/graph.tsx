import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";

const graph = (props: { data: Object }) => {
  console.log(props.data);
  const data = [
    { name: "Page A", uv: 400 },
    { name: "Page B", uv: 400 },
  ];

  const renderLineChart = (
    <BarChart width={500} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
      <Bar dataKey="uv" fill="#343231" />
    </BarChart>
  );

  return <ResponsiveContainer>{renderLineChart}</ResponsiveContainer>;
};

export default graph;
