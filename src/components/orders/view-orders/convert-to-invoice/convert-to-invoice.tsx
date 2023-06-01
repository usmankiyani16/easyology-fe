import React from "react";
import { useLocation } from "react-router-dom";
import DashboardOrder from "../../../common/dashboard-order/dashboard-order";

const ConvertToInvoice = () => {
  const location = useLocation();
  const data = location.state
  return(
  <div>
    <DashboardOrder showOrderStatus={false} showDashboardHeader={false} showFinalizeButton={true} showOperations={true} showCards={true} data={data}/>
  </div>
  );
};

export default ConvertToInvoice;
