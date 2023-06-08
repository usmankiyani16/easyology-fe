import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
const MonthlyPieChart = () => {
  const data = [
    {
      type: "Total Sale 50%",
      value: 50,
    },
    {
      type: "Total Cost 30%",
      value: 30,
    },
    {
      type: "Net Profit 25%",
      value: 25,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <div style={{  height: '330px' }}>
      <div className="flex justify-end ">
        <Pie {...config}  />
      </div>
    </div>
  );
};

export default MonthlyPieChart;
