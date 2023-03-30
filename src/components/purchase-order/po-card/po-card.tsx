import { Button, Card } from "antd";
import { capitalize } from "../../../utils/functions/functions";
import "./po-card.scss";

const POCard: React.FC<any> = ({ purchaseOrders }) => {
  return (
    <div className="flex flex-col gap-4">
      {purchaseOrders.map((data: any) => (
        <Card key={data?.key} className="_po-card">
          <div className="flex w-full justify-between grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
            <div className="flex flex-col justify-between _border-r pr-7 mr-7">
              <div className="flex text-lg gap-4">
                <span className="font-medium">PO Number:</span>
                <span className="font-semibold _primary-color">
                  #{data?.poNumber}
                </span>
              </div>
              <div className="flex text-lg gap-4">
                <span className="font-medium">Vendor Name:</span>
                <span className="font-medium _label-grey">
                  {capitalize(data?.vendor)}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between _border-r pr-7 mr-7">
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
                <span className="font-medium _label-grey">Inv Status:</span>
                <span className="font-semibold _primary-color">
                  {capitalize(data?.invoiceStatus)}
                </span>
              </div>
              <div className="flex text-lg gap-4">
                <span className="font-medium _label-grey">Paid Amount:</span>
                <span className="font-medium ">{data.amount}$</span>
              </div>
              <div className="flex text-lg gap-4">
                <span className="font-medium _label-grey">Due Date:</span>
                <span className="font-medium ">{data?.dueDate}</span>
              </div>
            </div>
            <div className="flex flex-col justify-self-end items-center justify-between">
              <span className="font-semibold text-3xl	 _primary-color">
                {data?.totalAmount}$
              </span>
              <Button className=""> View</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default POCard;
