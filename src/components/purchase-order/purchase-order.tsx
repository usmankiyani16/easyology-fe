import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import POCard from "./po-card/po-card";
import AddPO from "../../assets/icons/layout/AddPO.png";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPOS } from "../../store/po/po.slice";
import Spinner from "../common/spinner/spinner";
import { Pagination } from "antd";

const PurchaseOrder = () => {
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
        <NavLink to="/add-purchase-order">
          <div>
            <img src={AddPO} alt="Add PO logo" className="h-8" />
          </div>
        </NavLink>
      </div>
      <div className="_cards">
        {purchaseOrders?.products?.length ? (
          <>
            <POCard purchaseOrders={purchaseOrders?.products} />
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
