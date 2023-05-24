import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import customerData from "../mock-data/customer";
import { Link, NavLink } from "react-router-dom";
import { ADMIN_ROUTES, ROUTE_CONSTANTS } from "../../../routes/route-constants";




interface cutsomerCardTypes {
  customers: any;
}

const CustomerCard: React.FC<cutsomerCardTypes> = ({ customers }) => {
  const [applyBorder, setApplyBorder] = useState(false);
  const [signleCustomerData, setSignleCustomerData] = useState({});

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1100) {
        setApplyBorder(true);
      } else {
        setApplyBorder(false);
      }
    }
  
    window.addEventListener("resize", handleResize);
    handleResize();
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="_customer-wrap mt-3">
      <div className="_customer-card flex flex-col gap-4">
        {customers?.map((data: any) => (
          <Card key={data?._id} className="_po-card">
            <div className="flex w-full justify-between items-center grid lg:gap-24 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">

              <div       className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                }`}>
              <div className="flex flex-col gap-4 justify-between">
                <div className="flex text-lg gap-2">
                  <span className="font-medium whitespace-nowrap">
                    Customer ID:
                  </span>
                  <span className="_primary-color font-semibold xs:overflow-x-auto md:overflow-visible">
                    {data?.userNo}
                  </span>
                </div>

                <div className="flex text-lg gap-4 sm:whitespace-nowrap">
                  <span className="font-medium whitespace-nowrap">
                    Customer Name:
                  </span>
                  <span className="_grey-color font-medium ">
                    {`${data?.firstName} ${data?.lastName} `}
                  </span>
                </div>
              </div>
              </div>
              <div className="flex text-lg sm:gap-4">
                <div className="flex  text-lg sm:gap-4 sm:items-center">
                  <span className="_black-color sm:whitespace-nowrap ">
                    Outstanding Balance:
                  </span>
                  <span className="_primary-color whitespace-nowrap font-semibold text-2xl">
                    $ {data?.totalRemainingBalance}
                  </span>
                </div>
              </div>

              <Link
                to={{
                  pathname:
                    ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.VIEW_CUSTOMERS,
                }}
                state={data}

                
              >
                <div className="flex xs:justify-center xs:mt-2 sm:justify-end items-center ">
                  <Button
                    onClick={() => {
                      setSignleCustomerData(data);
                      // console.log(data);
                    }}
                  >
                    View
                  </Button>
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
