import React, { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CommonTab from "./common-tab";
import { laptopData } from "./tabs-mock-data";
import { capitalize } from "../../../utils/functions/functions";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getProducts } from "../../../store/products/products-slice";

const onChange = (key: string) => {
  console.log(key);
};

const DashboardTabs: React.FC = () => {
  const { products } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()

  console.log('products, ', products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  const temp = ['abc', 'laptops']
  const productsNew = products?.map((data: any) => ({
    key: data?._id,
    label: capitalize(data?.name),
    children: <CommonTab data={laptopData} />,
  }));

  const items: TabsProps["items"] = productsNew;
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default DashboardTabs;
