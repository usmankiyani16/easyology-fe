import { Card } from "antd";
import "./daily-sales.scss";

const DailySales = () => {
  return (
    <div className="_daily-sales">
      <Card>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Daily Sales</h1>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2 ">
              <label>Completed Invoices</label>
              <span className="_bg-primary-color _white-color w-32 p-4 rounded-md text-center font-semibold">
                150
              </span>
            </div>
            <div className="flex flex-col gap-2 ">
              <label>Hold Invoices</label>
              <span className="_bg-primary-color _white-color w-32 p-4 rounded-md text-center font-semibold">
                150
              </span>
            </div>
            <div className="flex flex-col gap-2 ">
              <label>Void Invoices</label>
              <span className="_bg-primary-color _white-color w-32 p-4 rounded-md text-center font-semibold">
                150
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DailySales;
