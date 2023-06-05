import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { backButtonIcon } from "../../../assets/icons";
import orderDetails from "../mock-data/view-orders";
import { useLocation } from "react-router-dom";

import ViewOrderCard from "./view-order-card/view-order-card";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";

const ViewOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state
  const searchProduct = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <div className="flex xs:flex-col sm:flex-row sm:justify-between sm:items-center mt-3">
        <div className="flex items-center sm:gap-12 xs:justify-between">
          {" "}
          <div className="flex items-center gap-2">
            <img
              onClick={() => navigate(-1)}
              className="cursor-pointer"
              src={backButtonIcon}
              alt="back"
            />

            <h1 className="font-lato text-[2rem]">Orders</h1>
          </div>
          <div>
            <Input
              className="w-44 h-8"
              prefix={<SearchOutlined />}
              placeholder="Search Order"
              onChange={(event) => searchProduct(event.target.value)}
            />
          </div>
        </div>

        {data?.products?.length > 0 && (
          <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.CONVERT_TO_INVOICE} state={data}>
            <div className="flex xs:justify-center">
              <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
                Convert to Invoice
              </Button>
            </div>
          </Link>
        )}
        {/* </div> */}
      </div>

      <div className="xs:mt-4 sm:mt-0">
        <span>Customer Name:</span>
        <span className="_grey-color"> {`${data?.user?.firstName} ${data?.user?.lastName}`}</span>
      </div>
      <div className="flex w-full justify-between items-center grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
        <div>
          <span>Contact Number:</span>
          <span className="_grey-color"> {data?.user?.phoneNumber}</span>
        </div>

        {/*  <div className='flex justify-between grid grid-cols-4'>
          <span></span>
          <span>QTY</span>
          <span>Price</span>
          <span>total price</span>
        </div> */}
      </div>

      <div className="_view-order">
        <ViewOrderCard orderDetails={orderDetails} data={data} />
      </div>
    </div>
  );
};

export default ViewOrders;
