import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { capitalize } from "../../../utils/functions/functions";
import "./card.scss";
import Viewmodal from "../view-data/view-modal";
import dayjs from "dayjs";

interface poCardTypes {
  cardData: any;
  Number: string | number;
  Name: string;
}

const POCard: React.FC<poCardTypes> = ({ cardData, Number, Name }: any) => {
  const [applyBorder, setApplyBorder] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [singlePO, setSinglePO] = useState<any>();

  console.log(cardData, "hello");

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
    <>
      {viewModalOpen && (
        <Viewmodal
          viewModalOpen={viewModalOpen}
          setViewModalOpen={setViewModalOpen}
          purchaseOrders={singlePO}
          Number={Number}
          Name={Name}
        />
      )}
      <div className="flex flex-col gap-4 mt-3">
        {cardData?.map((data: any) => (
          <Card key={data?.key} className="_po-card">
            <div className="flex w-full justify-between grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } pr-7 mr-7`}
              >
                <div className="flex text-lg gap-4">
                  <span className="font-medium">{Number}:</span>
                  <span className="font-semibold _primary-color">
                    #{data?.poNumber && data?.poNumber}
                    {data?.invoiceNo && data?.invoiceNo}
                  </span>
                </div>
                <div className="flex text-lg gap-4">
                  <span className="font-medium">{Name}:</span>
                  <span className="font-medium _label-grey">
                    {data?.vendor[0]?.name &&
                      capitalize(data?.vendor[0]?.name ?? "")}
                    {data?.vendor[0]?.companyName &&
                      capitalize(data?.vendor[0]?.companyName ?? "")}
                  </span>
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
                      {capitalize(prod?.name ?? "")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-lg gap-4">
                  <span className="font-medium _label-grey">Inv Status:</span>
                  <span
                    className={`font-semibold ${
                      data?.paymentStatus === "Partially Paid"
                        ? "_primary-color"
                        : "_success_color"
                    } `}
                  >
                    {capitalize(data?.paymentStatus ?? "")}
                  </span>
                </div>
                <div className="flex text-lg gap-4">
                  <span className="font-medium _label-grey">Paid Amount:</span>
                  {
                    <span className="font-medium ">
                      $ {data?.payments[0]?.paymentDetails?.paidAmount}
                    </span>
                  }
                </div>
                {data?.paymentStatus === "Partially Paid" && (
                  <>
                    <div className="flex text-lg gap-4">
                      <span className="font-medium _label-grey whitespace-nowrap">
                        Remaining Amount:
                      </span>
                      {
                        <span className="font-medium whitespace-nowrap">
                          $ {data?.remainingAmount}
                        </span>
                      }
                    </div>

                    <div className="flex text-lg gap-4">
                      <span className="font-medium _label-grey">Due Date:</span>
                      <span className="font-medium ">
                        {dayjs(
                          data?.payments[0]?.paymentDetails?.dueDate
                        ).format("MM/DD/YYYY")}
                      </span>
                    </div>
                  </>
                )}
              </div>
              {
                <div className="flex flex-col justify-self-end items-center justify-between">
                  <span className="font-semibold text-3xl	 _primary-color">
                    ${data?.totalAmount}
                  </span>
                  <Button
                    className="flex self-end"
                    onClick={() => {
                      setViewModalOpen(true);
                      setSinglePO(data);
                    }}
                  >
                    View
                  </Button>
                </div>
              }
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default POCard;