import { useNavigate } from "react-router-dom";
import POCard from "../../../../common/card/card";
import Spinner from "../../../../common/spinner/spinner";
import { useAppSelector } from "../../../../../store/store";
import { Button } from "antd";

const InvoiceNumber = "Invoice Number";
const CompanyName = "Company Name";

const ViewAllInvoices = () => {
  const { purchaseOrders } = useAppSelector((state) => state.purchaseOrders);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-lato  mt-4 text-[2rem]">View All Invoices</h1>
        <Button onClick={() => navigate(-1)}>Go back</Button>
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
