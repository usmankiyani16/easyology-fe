import { useState, useEffect } from "react";
import "./last-invoices.scss";
import { Card } from "antd";

const LastInvoices = () => {
  const [applyBorder, setApplyBorder] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 880) {
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
    <div className="_last-invoices-wrap mt-6">
      <span className="text-2xl p-1 font-semibold">Last Three Invoices</span>

      <Card key={1} className="mt-4">
        <div className="flex w-full justify-between items-center grid grid-cols-2 md:grid-cols-2 xs:grid-cols-1">
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex text-lg sm:gap-4">
              <span className="font-medium">Invoice Number:</span>
              <span className="_primary-color font-semibold"> #123</span>
            </div>
            <div className="flex text-lg gap-4 text-[14px]">
              <span className="font-medium whitespace-nowrap">
                Contact Details:
              </span>
              <span className="_grey-color font-medium">+92338833838</span>
            </div>
          </div>
          <div className="font-semibold text-3xl flex justify-end">
            <span className="whitespace-nowrap">$ 199.00</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LastInvoices;
