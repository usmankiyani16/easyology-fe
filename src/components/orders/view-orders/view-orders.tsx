import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import ViewOrderCard from "./view-order-card/view-order-card";

const ViewOrders = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
      <div className="flex justify-between sm:items-center mt-3">
        <div>
          {" "}
          <h1 className="font-lato  mt-4 text-[2rem]">Orders</h1>
        </div>

        <div className="flex justify-between items-center xs:flex-col sm:flex-row sm:gap-12">
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}

          <div>
            <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
              Convert to Invoice
            </Button>
          </div>
        </div>
      </div>

      <div>
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
