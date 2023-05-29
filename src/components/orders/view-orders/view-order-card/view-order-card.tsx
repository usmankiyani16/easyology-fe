import { purchaseOrders } from "../../../purchase-order/mock-data/po-data";
import cart from "../../../../assets/images/dashboard/Purchase-online.png";
import { Button, Card, InputNumber, Pagination } from "antd";
import OrderCard from "../../orders-card/orders-card";
import ViewOrdersCard from "./card";

interface ViewOrders {
  orderDetails: any;
}

const ViewOrderCard: React.FC<ViewOrders> = ({ orderDetails }) => {
  return (
    <div>
      <div>
        <ViewOrdersCard orderDetails={orderDetails} showScroll={false}/>
      </div>

      {orderDetails?.products?.length > 0 && (
        <Pagination
          //   onChange={handlePagination}
          className="flex justify-end"
          defaultCurrent={1}
          defaultPageSize={8}
          total={2}
          showSizeChanger={false}
        />
      )}
    </div>
  );
};

export default ViewOrderCard;
