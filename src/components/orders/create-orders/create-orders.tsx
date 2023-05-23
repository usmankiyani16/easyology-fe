import React from "react";
import DashboardOrder from "../../common/dashboard-order/dashboard-order";

const CreateOrders = () => {
  return (
    <div>
      <DashboardOrder showOrderStatus={true} showDashboardHeader={true} showOperations={false} />
    </div>
  );
};

export default CreateOrders;
