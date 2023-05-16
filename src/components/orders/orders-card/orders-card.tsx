import { useEffect, useState } from "react";
import { Card, Button, Pagination } from "antd";

import ordersData from "../mock-data/orders-data";
import { Link, NavLink } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";

const OrderCard = () => {
  const [applyBorder, setApplyBorder] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 880) {
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
    <div className="_order-card-wrap">
      <div className="flex flex-col gap-4 mt-3">
        {ordersData?.map((data: any) => (
          <Card>
            <div className="flex w-full justify-between items-center grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
              {/* -------- Grid 1 ------------ */}
              <div className="flex flex-col justify-between">
                <div className="flex text-lg sm:gap-4">
                  <span className="font-medium">Date:</span>
                  <span className="_grey-color">{data?.date}</span>
                </div>
                <div className="flex text-lg sm:gap-4">
                  <span className="font-medium">Order ID:</span>
                  <span className="_primary-color font-semibold">
                    # {data?.OrderId}
                  </span>
                </div>

                <div className="flex text-lg gap-4 sm:gap-4">
                  <span className="font-medium">Order Type:</span>
                  <span className="_grey-color font-medium ">
                    {data?.OrderType}
                  </span>
                </div>
              </div>

              {/* -------- Grid 2 ------------ */}
              <div className="flex flex-col justify-center text-lg sm:gap-4">
                <div className="flex  text-lg sm:gap-4 sm:items-center">
                  <span className="_black-color sm:whitespace-nowrap">
                    Customer Name:
                  </span>
                  <span className="_grey-color font-semibold">
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
              {/* -------- Grid 3 ------------ */}
              <div
                className={`flex flex-col justify-center text-lg ${data?.orderStatus === "Completed"  && "sm:gap-0"} gap-4`}
              >
                <div className="flex  text-lg sm:gap-4 sm:items-center">
                  <span className="_black-color sm:whitespace-nowrap">
                    Order Status:
                  </span>
                  <span className="_grey-color whitespace-nowrap">
                    {data?.orderStatus}
                  </span>
                </div>

                {/* -------------- Condions in Order Status ----------------  */}

                {data?.orderStatus === "Pickup from Store" && (
                  <>
                    <div className="flex  text-lg sm:gap-4 sm:items-center">
                      <span className="_black-color sm:whitespace-nowrap">
                        Time Slot:
                      </span>
                      <span className="whitespace-nowrap  text-lg _primary-color">
                        {data?.timeSlot}
                      </span>
                    </div>
                  </>
                )}
                {data?.orderStatus === "In Route" && (
                  <>
                    <div className="flex  text-lg sm:gap-4 sm:items-center">
                      <span className="_black-color sm:whitespace-nowrap">
                        Expected Delivery Time :
                      </span>
                      <span className="whitespace-nowrap  text-lg _primary-color">
                        {data?.expectedTime}
                      </span>
                    </div>
                  </>
                )}
                {data?.orderStatus === "Completed" && (
                  <>
                    <div className="flex  text-lg sm:gap-4 sm:items-center">
                      <span className="_black-color sm:whitespace-nowrap">
                        Tracking#:
                      </span>
                      <span className="whitespace-nowrap  text-lg _primary-color font-semibold">
                        {data?.trackingNo}
                      </span>
                    </div>
                    <div className="flex  text-lg sm:gap-4 sm:items-center">
                      <span className="_black-color sm:whitespace-nowrap">
                        Clerk Name:
                      </span>
                      <span className="whitespace-nowrap text-lg _grey-color">
                        {data?.clerkName}
                      </span>
                      <span className="whitespace-nowrap  text-lg _grey-color">
                        {data?.completedTime}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* -------- Grid 4 ------------ */}

              <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.VIEW_ORDERS}>
                <div className="flex xs:justify-center xs:mt-2 sm:justify-end items-center ">
                  <Button>View</Button>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      <Pagination
        //   onChange={handlePagination}
        className="flex justify-end"
        defaultCurrent={1}
        defaultPageSize={8}
        total={2}
        showSizeChanger={false}
      />

    </div>
  );
};

export default OrderCard;