import React from "react";
import POCard from "./po-card";

const PurchaseOrder = () => {
  return (
    <div>
      <div className="flex items-center justify-between mt-3">
        <h1>Purchase Order</h1>
        <div>icon</div>
      </div>
      <POCard/>
    </div>
  );
};

export default PurchaseOrder;
