import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CommonTab from "./common-tab";
import { laptopData } from "./tabs-mock-data";
import { capitalize } from "../../../utils/functions/functions";

const onChange = (key: string) => {
  console.log(key);
};

const DashboardTabs: React.FC = () => {
  const temp = ['abc', 'laptops']
  const products = temp.map((data: any) => ({
    key: data,
    label: capitalize(data),
    children: <CommonTab data={laptopData} />,
  }));

  const items: TabsProps["items"] = products;
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default DashboardTabs;
