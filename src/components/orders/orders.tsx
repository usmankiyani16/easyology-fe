import { Button, DatePicker, Input } from "antd";
import React from "react";
import OrderCard from "./orders-card/orders-card";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";

const Orders = () => {
  const searchProduct = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <div className="flex justify-between sm:items-center mt-3">
        <div className="flex xs:flex-col sm:flex-row sm:items-center sm:gap-12 xs:justify-between">
          {" "}
          <h1 className="font-lato text-[2rem]">Orders</h1>
          <div className="sm:mt-4">
            <Input
              className="w-44 h-8"
              prefix={<SearchOutlined />}
              placeholder="Search Order"
              onChange={(event) => searchProduct(event.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between items-center xs:flex-col sm:flex-row sm:gap-12">
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}

          <div className="mt-4">
            <DatePicker />
          </div>


         <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.CREATE_ORDER}>
          <div>
            <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
              Create an Order
            </Button>
          </div>
          </Link>
        </div>
      </div>

      <div>
        <OrderCard />
      </div>

      
    </div>
  );
};

export default Orders;
