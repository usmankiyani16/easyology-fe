import { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import cardData from "../../card/mock-data";

const MonthCard: React.FC<any> = ({ monthData }) => {
  const [applyBorder, setApplyBorder] = useState(false);
  const location = useLocation();
  const propData = location.state;

  console.log(propData, "view receiveable");

  // console.log(cardData, "Card Data");

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
    <div>
      <div className="flex flex-col gap-4 mt-3">
        {cardData?.map((data: any) => (
          <Card key={data?.key} className="_po-card">
            <div className="flex w-full justify-between grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } pr-7 mr-7`}
              >
                <div className="flex text-lg gap-4">
                  <span className="font-medium whitespace-nowrap">
                    {propData?.label1} ID:
                  </span>
                  <span className="font-semibold _primary-color">
                    #{data?.customerId}
                  </span>
                </div>
                <div className="flex text-lg gap-2 whitespace-nowrap">
                  <span className="font-medium">{propData?.label1} Name:</span>
                  <span className="font-medium captilize _label-grey _grey-color">
                    {data?.customerName}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } pr-7 mr-7`}
              >
                <div className="flex text-lg gap-4">
                  <span className="font-medium whitespace-nowrap">
                    {propData?.label2} No:
                  </span>
                  <span className="font-semibold _primary-color">
                    #{data?.invoiceNo}
                  </span>
                </div>
                <div className="flex text-lg gap-2 whitespace-nowrap">
                  <span className="font-medium">Amount:</span>
                  <span className="font-medium captilize _label-grey _grey-color">
                    $ {data?.totalAmount}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-lg gap-4">
                  <span className="font-medium _label-grey">
                    Payment Method:
                  </span>
                  <span className="_grey-color">{data?.paymentMethod}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MonthCard;
