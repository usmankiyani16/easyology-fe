import React, { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CommonTab from "./common-tab";
import { laptopData } from "./tabs-mock-data";
import { capitalize } from "../../../utils/functions/functions";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getProducts } from "../../../store/products/products-slice";



const DashboardTabs: React.FC = () => {
  const { products } = useAppSelector((state) => state.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [])
  const productsNew = products?.map((data: any) => ({
    key: data?._id,
    label: capitalize(data?.name),
    img: data?.image,
    children: <CommonTab data={data?.products} />,

  }));

  // <CommonTab data={productsNew} />

  const items: TabsProps["items"] = productsNew;
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default DashboardTabs;
