import React from "react";

const TotalAmount = () => {
  return (
    <div className="flex justify-around text-xl mt-4">
      <div>
        <span>Total Amount Receiveable </span>
        <span className="_primary-color">$ 450</span>
      </div>
      <div>
        <span>Total no of invoices</span>
        <span className="_primary-color"> 6</span>
      </div>
    </div>
  );
};

export default TotalAmount;
