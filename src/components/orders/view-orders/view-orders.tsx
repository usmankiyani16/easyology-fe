import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { backButtonIcon } from "../../../assets/icons";

import ViewOrderCard from "./view-order-card/view-order-card";

const ViewOrders = () => {
  const navigate = useNavigate();
  const searchProduct = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <div>
        <img
          onClick={() => navigate(-1)}
          className="h-[25px] w-[25px] cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
      </div>
      <div className="flex xs:flex-col sm:flex-row sm:justify-between sm:items-center mt-3">
        <div className="flex items-center sm:gap-12 xs:justify-between">
          {" "}
          <h1 className="font-lato text-[2rem]">Orders</h1>
          <div>
            <Input
              className="w-44 h-8"
              prefix={<SearchOutlined />}
              placeholder="Search Customer"
              onChange={(event) => searchProduct(event.target.value)}
            />
          </div>
        </div>

        {/* <div className="flex justify-between items-center xs:flex-col sm:flex-row sm:gap-12"> */}
        {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}

        <div className="flex xs:justify-center">
          <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
            Convert to Invoice
          </Button>
        </div>
        {/* </div> */}
      </div>

      <div className="xs:mt-4 sm:mt-0">
        <span>Customer Name:</span>
        <span className="_grey-color"> Ali Raza</span>
      </div>
      <div className="flex w-full justify-between items-center grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
        <div>
          <span>Contact Number:</span>
          <span className="_grey-color"> +9248338383</span>
        </div>

        {/*  <div className='flex justify-between grid grid-cols-4'>
          <span></span>
          <span>QTY</span>
          <span>Price</span>
          <span>total price</span>
        </div> */}
      </div>

      <div className="_view-order">
        <ViewOrderCard />
      </div>
    </div>
  );
};

export default ViewOrders;
