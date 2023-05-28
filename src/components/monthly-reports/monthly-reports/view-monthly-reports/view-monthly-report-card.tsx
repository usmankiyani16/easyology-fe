import { useEffect, useState } from "react";
import { Card } from "antd";
import MonthlyReportData from "../mock-data/monthly-report";

const ViewMonthlyReportCard: React.FC<any> = ({ monthlydata }) => {
  const [applyBorder, setApplyBorder] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1100) {
        setApplyBorder(true);
      } else {
        setApplyBorder(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-4">
        {/* {monthlydata?.map((data: any) => ( */}
        <Card className="_po-card">
          <div className="flex w-full justify-between grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
            <div
              className={`flex flex-col justify-between${
                applyBorder ? " _border-r" : ""
              } pr-7 mr-7`}
            >
              <div className="flex text-lg gap-4">
                <span className="font-medium whitespace-nowrap">
                  Invoice Number:
                </span>
                <span className="font-semibold _primary-color">
                  #{monthlydata?.invoiceNumber}
                </span>
              </div>
            </div>
            <div
              className={`flex flex-col justify-between${
                applyBorder ? " _border-r" : ""
              } pr-7 mr-7`}
            >
              <div className="flex text-lg gap-4">
                <span className="font-medium whitespace-nowrap">
                  Total sale of invoice:
                </span>
                <span className="font-semibold _primary-color">
                  #{monthlydata?.totalSale}
                </span>
              </div>
              <div className="flex text-lg gap-2 whitespace-nowrap">
                <span className="font-medium">Total cost in the invoice:</span>
                <span className="font-medium captilize _label-grey _grey-color">
                  $ {monthlydata?.totalCostInvoice}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex text-lg gap-4">
                <span className="font-medium _label-grey">
                  Total profit in thie invoice:
                </span>
                <span className="_grey-color">{monthlydata?.totalProfit}</span>
              </div>
            </div>
          </div>
        </Card>
        {/* ))} */}
      </div>
    </div>
  );
};

export default ViewMonthlyReportCard;
