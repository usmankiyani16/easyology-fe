import { useState, useEffect } from "react";
import "./last-invoices.scss";
import { Card } from "antd";

interface LastInvoice {
  invoiceData:any
}

const LastInvoices: React.FC<LastInvoice> = ({invoiceData}) => {
  const [applyBorder, setApplyBorder] = useState(false);

  console.log(invoiceData, 'Invoice')

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
    <div className="_last-invoices-wrap flex flex-col gap-4">
      <span className="text-2xl p-1 font-semibold">Last Three Invoices</span>

      {/* {invoiceData?.orders?.length ?  */}

      {invoiceData?.orders.map((data:any) => (
        
         <Card key={1} className="mt-4">
         <div className="flex w-full justify-between items-center grid grid-cols-2 md:grid-cols-2 xs:grid-cols-1">
           <div  className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                }`}>
             <div className="flex text-lg sm:gap-4">
               <span className="font-medium">Invoice Number:</span>
               <span className="_primary-color font-semibold"> #{data?.orderNumber}</span>
             </div>
             <div className="flex text-lg gap-4 text-[14px]">
               <span className="font-medium whitespace-nowrap">
                 Contact Details:
               </span>
               <span className="_grey-color font-medium">+92338833838</span>
             </div>
           </div>
           <div className="font-semibold text-3xl flex justify-end">
             <span className="whitespace-nowrap">$ {data?.totalAmount.toFixed(2)}</span>
           </div>
         </div>
       </Card>


      ))}

     
    </div>
  );
};

export default LastInvoices;
