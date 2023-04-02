import React, { Children } from "react";
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
import { useRecoilValue } from "recoil";
import { categoriesSelector } from "../../../store/categories/categories.store";

const onChange = (key: string) => {
  console.log(key);
};

const DashboardTabs: React.FC = () => {
  const productsAndCategories = useRecoilValue(categoriesSelector);
  console.log(productsAndCategories);
  const products = productsAndCategories.map((data: any) => ({
    key: data?._id,
    label: data?.name,
    children: <CommonTab data={laptopData} />,
  }));

  const items: TabsProps["items"] = products;
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default DashboardTabs;
