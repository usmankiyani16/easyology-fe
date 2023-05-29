import { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import ReceiveableMockData from "../acount-receiveable-card/mock-data";

const ViewReceiveableCard: React.FC<any> = ({ receiveableData }) => {
  const [applyBorder, setApplyBorder] = useState(false);
  const location = useLocation();
  const datas = location.state;

  console.log(datas, 'view receiveable')


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
        {ReceiveableMockData?.map((data: any) => (
          <Card key={data?.key} className="_po-card">
            <div className="flex w-full justify-between grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } pr-7 mr-7`}
              >
                <div className="flex text-lg gap-4">
                  <span className="font-medium whitespace-nowrap">
                  {datas?.label1} ID:
                  </span>
                  <span className="font-semibold _primary-color">
                    #{data?.customerId}
                  </span>
                </div>
                <div className="flex text-lg gap-2 whitespace-nowrap">
                  <span className="font-medium">{datas?.label1} Name:</span>
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
                  {datas?.label2} No:
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
                  <span className="font-medium _label-grey">Payment Method:</span>
                  <span
                    className='_grey-color'
                  >
                    {data?.paymentMethod}
                  </span>
                </div>
             </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewReceiveableCard;
