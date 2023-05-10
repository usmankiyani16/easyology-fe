import { useEffect } from "react";
import { Link } from "react-router-dom";
import POCard from "../common/card-po-invoice/po-card";
import AddPO from "../../assets/icons/layout/AddPO.png";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPOS } from "../../store/po/po.slice";
import Spinner from "../common/spinner/spinner";
import { Pagination } from "antd";

const PoNumber = 'PO Number'
const VendorName = 'Vendor Name'
const PurchaseOrder:any = () => {

  const { purchaseOrders } = useAppSelector((state) => state.purchaseOrders);
  const dispatch = useAppDispatch();

  const handlePagination = async (value: Number) => {
    let queryParam: any = {};
    if (value) {
      queryParam = {
        page: value,
      };
      dispatch(getPOS(queryParam));
    }
  };
  useEffect(() => {
    let queryParam = {
      page: 1,
    };
    dispatch(getPOS(queryParam));
  }, []);

  return (
    <div>
      {/* <Loader /> */}
      <div className="flex items-center justify-between mt-3">
        <h1 className="font-lato  mt-4 text-[2rem]">Purchase Order</h1>
        <Link to="/add-purchase-order">
          <div className="mt-4">
            <img src={AddPO} alt="Add PO logo" className="h-8" />
          </div>
        </Link>
      </div>
      <div className="_cards">
        {purchaseOrders?.products?.length ? (
          <>
          <POCard cardData={purchaseOrders?.products} Number ={PoNumber} Name={VendorName}/>
          </>
        ) : (
          <Spinner />
        )}
      </div>
      {purchaseOrders?.products?.length ? (
        <Pagination
          onChange={handlePagination}
          className="flex justify-end"
          defaultCurrent={1}
          defaultPageSize={8}
          total={purchaseOrders?.pagination?.totalCount}
          showSizeChanger={false}
        />
       ) : (
         ""
       )}
    </div>
  );
};

export default PurchaseOrder;
