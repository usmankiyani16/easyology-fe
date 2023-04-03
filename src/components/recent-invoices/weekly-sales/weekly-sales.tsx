import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";

const WeeeklySales = () => {
  const data = [
    {
      day: "Mon",
      value: 3,
    },
    {
      day: "Tues",
      value: 4,
    },
    {
      day: "Wed",
      value: 3.5,
    },
    {
      day: "Thur",
      value: 5,
    },
    {
      day: "Fri",
      value: 4.9,
    },
    {
      day: "Sat",
      value: 6,
    },
    {
      day: "Sun",
      value: 7,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: "Weekly Sales",
    },
    data,
    xField: "day",
    yField: "value",
    label: {},
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };
  return <Line {...config} />;
};

export default WeeeklySales;
