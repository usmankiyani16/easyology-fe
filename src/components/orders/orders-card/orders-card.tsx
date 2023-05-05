import { Card, Button } from "antd";
import React from "react";
import ordersData from "../mock-data/orders-data";
import { NavLink } from "react-router-dom";

const OrderCard = () => {
  return (
    <div className="_order-card-wrap">
      <div className="flex flex-col gap-4 mt-3">
        {ordersData?.map((data: any) => (
          <Card>
            <div className="flex w-full justify-between items-center grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
              <div className="flex flex-col gap-4 justify-between">
                <div className="flex text-lg sm:gap-4">
                  <span className="font-medium">Order ID:</span>
                  <span className="_primary-color font-semibold">
                    # {data?.OrderId}
                  </span>
                </div>

                <div className="flex text-lg gap-4">
                  <span className="font-medium">Order Type:</span>
                  <span className="_grey-color font-medium ">
                    {data?.OrderType}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center text-lg sm:gap-4">
                <div className="flex  text-lg sm:gap-4 sm:items-center">
                  <span className="_black-color sm:whitespace-nowrap">
                    Customer Name:
                  </span>
                  <span className="_grey-color whitespace-nowrap font-semibold">
                    {data?.customerName}
                  </span>
                </div>
                <div className="flex  text-lg sm:gap-4 sm:items-center">
                  <span className="_black-color sm:whitespace-nowrap">
                    Invoice Status:
                  </span>
                  <span className="whitespace-nowrap  text-lg">
                    {data?.InvoiceStatus}
                  </span>
                </div>
              </div>

              <NavLink to="/view-orders">
                <div className="flex xs:justify-center xs:mt-2 sm:justify-end items-center ">
                  <Button>View</Button>
                </div>
              </NavLink>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
