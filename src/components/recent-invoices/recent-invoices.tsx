import React from "react";
import ActivityCard from "./activity-card/activity-card";
import DailySales from "./daily-sales/daily-sales";
import WeeklySales from "./weekly-sales/weekly-sales";
import { purchaseOrders } from "../purchase-order/mock-data/po-data";

const RecentInvoices = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-between gap-4">
        <DailySales />
        <WeeklySales />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-2xl">Recent Invoices</span>
        <ActivityCard purchaseOrders={purchaseOrders} />
      </div>
    </div>
  );
};

export default RecentInvoices;
