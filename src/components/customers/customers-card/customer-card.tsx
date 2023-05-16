import React from "react";
import { Button, Card } from "antd";
import customerData from "../mock-data/customer";
import { Link, NavLink } from "react-router-dom";
import { ADMIN_ROUTES, ROUTE_CONSTANTS } from "../../../routes/route-constants";

const CustomerCard = () => {
  return (
    <div className="_customer-wrap mt-3">
      <div className="_customer-card flex flex-col gap-4">
        {customerData?.map((data: any) => (
          <Card key={1} className="_po-card">
            <div className="flex w-full justify-between items-center grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
              <div className="flex flex-col gap-4 justify-between">
                <div className="flex text-lg sm:gap-4">
                  <span className="font-medium">Customer ID:</span>
                  <span className="_primary-color font-semibold">
                    # {data?.customerId}
                  </span>
                </div>

                <div className="flex text-lg gap-4">
                  <span className="font-medium">Customer Name:</span>
                  <span className="_grey-color font-medium ">
                    {data?.customerName}
                  </span>
                </div>
              </div>
              <div className="flex text-lg sm:gap-4">
                <div className="flex  text-lg sm:gap-4 sm:items-center">
                  <span className="_black-color sm:whitespace-nowrap">
                    Outstanding Balance:
                  </span>
                  <span className="_primary-color whitespace-nowrap font-semibold text-2xl">
                    $ {data?.balance}
                  </span>
                </div>
              </div>

              <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.VIEW_CUSTOMERS}>
                <div className="flex xs:justify-center xs:mt-2 sm:justify-end items-center ">
                  <Button>View</Button>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerCard;