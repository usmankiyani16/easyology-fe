import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CommonTab from "./common-tab";
import {
  airpodsData,
  iPadsData,
  laptopData,
  macbooksData,
  mobileAccessoriesData,
  mobileData,
} from "./tabs-mock-data";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Laptops`,
    children: <CommonTab data={laptopData} />,
  },
  {
    key: "2",
    label: `Mobile Phones`,
    children: <CommonTab data={mobileData} />,
  },
  {
    key: "3",
    label: `Mobile Accessories`,
    children: <CommonTab data={mobileAccessoriesData} />,
  },
  {
    key: "4",
    label: `Airpods`,
    children: <CommonTab data={airpodsData} />,
  },
  {
    key: "5",
    label: `Macbooks`,
    children: <CommonTab data={macbooksData} />,
  },
  {
    key: "6",
    label: `IPads`,
    children: <CommonTab data={iPadsData} />,
  },
];

const DashboardTabs: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default DashboardTabs;
