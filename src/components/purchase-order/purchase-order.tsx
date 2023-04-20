import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../common/loader/loader";
// import { purchaseOrders } from "./mock-data/po-data";
import POCard from "./po-card/po-card";
import AddPO from "../../assets/icons/layout/AddPO.png";
import Viewmodal from "../Modals/po-view-modal/view-modal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPOS } from "../../store/po/po.slice";
import Spinner from "../common/spinner/spinner";

const PurchaseOrder = () => {
  const { purchaseOrders } = useAppSelector((state) => state.purchaseOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPOS());
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
      {purchaseOrders?.length ? (
        <POCard purchaseOrders={purchaseOrders} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PurchaseOrder;
