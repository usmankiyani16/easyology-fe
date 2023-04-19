import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { capitalize } from "../../../utils/functions/functions";
import "./po-card.scss";
import Viewmodal from "../../Modals/po-view-modal/view-modal";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

const POCard: React.FC<any> = ({ purchaseOrders }) => {
  const [applyBorder, setApplyBorder] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

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
    <>
      <Viewmodal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        purchaseOrders = {purchaseOrders}
      />
      <div className="flex flex-col gap-4">
        {purchaseOrders?.map((data: any) => (
          <Card key={data?.key} className="_po-card">
            <div className="flex w-full justify-between grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
              <div
                className={`flex flex-col justify-between${applyBorder ? " _border-r" : ""
                  } pr-7 mr-7`}
              >
                <div className="flex text-lg gap-4">
                  <span className="font-medium">PO Number:</span>
                  <span className="font-semibold _primary-color">
                    #{data?.po_number}
                  </span>
                </div>
                <div className="flex text-lg gap-4">
                  <span className="font-medium">Vendor Name:</span>
                  <span className="font-medium _label-grey">
                    {capitalize(data?.vendor_id?.name)}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col justify-between${applyBorder ? " _border-r" : ""
                  } pr-7 mr-7`}
              >
                {data?.product?.slice(0, 3).map((prod: any, index: number) => (
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
                  <span className="font-medium _label-grey">Inv Status:</span>
                  <span className="font-semibold _primary-color">
                    {capitalize(data?.invoice_status)}
                  </span>
                </div>
                <div className="flex text-lg gap-4">
                  <span className="font-medium _label-grey">Paid Amount:</span>
                  {<span className="font-medium ">{data?.paid_amount}</span>}
                </div>
                <div className="flex text-lg gap-4">
                  <span className="font-medium _label-grey">Due Date:</span>
                  <span className="font-medium ">{dayjs(data?.due_date).tz("America/New_York").format('dddd h A z')}</span>
                </div>
              </div>
              {<div className="flex flex-col justify-self-end items-center justify-between">
                <span className="font-semibold text-3xl	 _primary-color">
                  ${data?.total_amount}
                </span>
                <Button onClick={() => setViewModalOpen(true)}>
                  View
                </Button>
              </div>}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default POCard;
