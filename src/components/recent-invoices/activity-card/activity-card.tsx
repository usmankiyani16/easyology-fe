import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { capitalize } from "../../../utils/functions/functions";
import "./activity-card.scss";

const ActivityCard: React.FC<any> = ({ purchaseOrders }) => {
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
    <div className="flex flex-col gap-4">
      {purchaseOrders.map((data: any) => (
        <Card key={data?.key} className="_po-card">
          <div className="flex w-full justify-between grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
            <div
              className={`flex flex-col justify-between${
                applyBorder ? " _border-r" : ""
              } pr-7 mr-7`}
            >
              <div className="flex text-base font-semibold gap-1">
                <span>Customer Name:</span>
                <span>
                  {/* #{data?.poNumber} */}
                  Steve Paul
                </span>
              </div>
              <div className="flex text-lg gap-4">
                <span className="font-medium _label-grey">Customer Type:</span>
                <span className="font-medium">Whole Seller</span>
              </div>
              <div className="flex text-lg gap-4">
                <span className="font-medium _label-grey">
                  Conatct Details:
                </span>
                <span className="font-medium">03536363738</span>
              </div>
            </div>
            <div
              className={`flex flex-col justify-between${
                applyBorder ? " _border-r" : ""
              } pr-7 mr-7`}
            >
              {data?.products?.slice(0, 3).map((prod: any, index: number) => (
                <div key={index} className="flex text-lg gap-4">
                  <span className="font-medium">x{prod?.quantity}</span>
                  <span className="font-medium _label-grey">
                    {capitalize(prod?.name)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex text-lg gap-4">
                <span className="font-medium _label-grey">Invoice BY:</span>
                <span className="font-medium">George</span>
              </div>
              <div className="flex text-lg gap-4">
                <span className="font-medium _label-grey">Schedual:</span>
                <span className="font-medium ">{data?.dueDate}</span>
              </div>
              <span>$1499.00</span>
            </div>
            <div className="flex flex-col justify-self-end items-center justify-between">
              <span>
                Invoice Number:
                <span className="font-semibold text-3xl	 _primary-color">
                  #165387
                </span>
              </span>
              <Button className=""> View</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ActivityCard;
