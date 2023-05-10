import { purchaseOrders } from "../../../purchase-order/mock-data/po-data";
import cart from "../../../../assets/images/dashboard/Purchase-online.png";
import { Button, Card } from "antd";
import orderDetails from "../../mock-data/view-orders";

const ViewOrderCard = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-3">
        {orderDetails?.products?.map((data: any) => (
          <>
            <Card>
              <div className="flex w-full justify-between items-center grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex text-lg sm:gap-4">
                    <span className="font-medium whitespace-nowrap">
                      Product Seriol Number:
                    </span>
                    <span className="_primary-color font-semibold">
                      A1223232
                    </span>
                  </div>
                  <div className="flex text-lg sm:gap-4">
                    <img
                      className="w-20 h-16 rounded object-cover"
                      src={cart}
                      alt=""
                    />
                    <span className="font-semibold">{data?.name}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center text-lg sm:gap-4">
                  <div className="flex  text-lg sm:gap-4 sm:items-center justify-end">
                    <span className="_black-color sm:whitespace-nowrap">
                      x{data?.quantity}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end text-lg">
                  <span className="text-lg">{`$ ${data?.price}`}</span>
                </div>
                <div className="flex justify-end">
                  <span className="_primary-color text-lg">{`$ ${data?.totalPrice}`}</span>
                </div>
              </div>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
};

export default ViewOrderCard;
