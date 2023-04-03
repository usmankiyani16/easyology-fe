import React from "react";
import DailySales from "./daily-sales/daily-sales";
import WeeklySales from "./weekly-sales/weekly-sales";

const RecentInvoices = () => {
  return (
    <div>
      <div className="flex items-between gap-4">
        <DailySales />
        <WeeklySales />
      </div>
    </div>
  );
};

export default RecentInvoices;
