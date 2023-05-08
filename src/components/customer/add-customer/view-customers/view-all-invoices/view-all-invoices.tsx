import React from "react";
import POCard from "../../../../purchase-order/po-card/po-card";
import Spinner from "../../../../common/spinner/spinner";
import { useAppSelector } from "../../../../../store/store";

const InvoiceNumber = "Invoice Number";
const CompanyName = "Company Name";

const ViewAllInvoices = () => {
  const { purchaseOrders } = useAppSelector((state) => state.purchaseOrders);
  return (
    <div>
      <div>
        <h1 className="font-lato  mt-4 text-[2rem]">View All Invoices</h1>
      </div>
      <div className="_cards">
        {purchaseOrders?.products?.length ? (
          <>
            <POCard
              cardData={purchaseOrders?.products}
              Number={InvoiceNumber}
              Name={CompanyName}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default ViewAllInvoices;
