import { Button, Card } from "antd";
import "./po-card.scss";

const POCard = () => {
  return (
    <Card className="_po-card">
      <div className="flex w-full justify-between grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
        <div className="flex flex-col _border-r pr-7 mr-7">
          <div className="flex text-xl gap-4">
            <span className="font-medium">PO Number:</span>
            <span className="font-semibold _primary-color">#52426</span>
          </div>
          <div className="flex text-xl gap-4">
            <span className="font-medium">Vendor Name:</span>
            <span className="font-medium _label-grey">Lenovo</span>
          </div>
        </div>
        <div className="flex flex-col _border-r pr-7 mr-7">
          <div className="flex text-xl gap-4">
            <span className="font-medium">PO Number:</span>
            <span className="font-semibold _primary-color">#52426</span>
          </div>
          <div className="flex text-xl gap-4">
            <span className="font-medium">Vendor Name:</span>
            <span className="font-medium _label-grey">Lenovo</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex text-xl gap-4">
            <span className="font-medium">PO Number:</span>
            <span className="font-semibold _primary-color">#52426</span>
          </div>
          <div className="flex text-xl gap-4">
            <span className="font-medium">Vendor Name:</span>
            <span className="font-medium _label-grey">Lenovo</span>
          </div>
        </div>
        <div className="flex flex-col justify-self-end items-center justify-between">
          <span className="font-semibold _primary-color">{"45.873"}$</span>
          <Button className=""> View</Button>
        </div>
      </div>
    </Card>
  );
};

export default POCard;
