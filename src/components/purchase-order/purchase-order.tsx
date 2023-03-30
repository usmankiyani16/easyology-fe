import Loader from "../common/loader/loader";
import { purchaseOrders } from "./mock-data/po-data";
import POCard from "./po-card/po-card";

const PurchaseOrder = () => {
  return (
    <div>
      {/* <Loader /> */}
      <div className="flex items-center justify-between mt-3">
        <h1>Purchase Order</h1>
        <div>icon</div>
      </div>
      <POCard purchaseOrders={purchaseOrders} />
    </div>
  );
};

export default PurchaseOrder;
