import { Button, DatePicker } from "antd";
import React from "react";
import OrderCard from "./orders-card/orders-card";

const Orders = () => {
  return (
    <div>
      <div className="flex justify-between sm:items-center mt-3">
        <div>
          {" "}
          <h1 className="font-lato  mt-4 text-[2rem]">Orders</h1>
        </div>

        <div className="flex justify-between items-center xs:flex-col sm:flex-row sm:gap-12">
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}

          <div className="mt-4">
            <DatePicker />
          </div>

          <div>
            <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
              Create an Order
            </Button>
          </div>
        </div>
      </div>

      <div>

      <OrderCard />
      </div>
    </div>
  );
};

export default Orders;
