import React from "react";
import DashboardOrder from "../../../common/dashboard-order/dashboard-order";

const ConvertToInvoice = () => {
  return(
  <div>
    <DashboardOrder showOrderStatus={false} showDashboardHeader={false} showFinalizeButton={true}/>
  </div>
  );
};

export default ConvertToInvoice;
