import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "../common/loader/loader";
import { purchaseOrders } from "./mock-data/po-data";
import POCard from "./po-card/po-card";
import AddPO from '../../assets/icons/layout/AddPO.png'


const PurchaseOrder = () => {
  return (
    <div>
      {/* <Loader /> */}
      <div className="flex items-center justify-between mt-3">
      <h1 className="font-lato  mt-4 text-[2rem]">Purchase Order</h1>
        <NavLink to="/add-purchase-order">
        <div><img src={AddPO} alt="Add PO logo" className="h-8"/></div>

        </NavLink>
      </div>
      <POCard purchaseOrders={purchaseOrders} />
    </div>
  );
};

export default PurchaseOrder;
