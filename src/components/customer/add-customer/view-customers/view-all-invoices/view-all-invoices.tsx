import { useNavigate } from "react-router-dom";
import Card from "../../../../common/card/card";
import Spinner from "../../../../common/spinner/spinner";
import { useAppSelector } from "../../../../../store/store";
import { Button, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { backButtonIcon } from "../../../../../assets/icons";





const ViewAllInvoices = () => {
  const InvoiceNumber = "Invoice Number";
  const CompanyName = "Company Name";
  const { purchaseOrders } = useAppSelector((state) => state.purchaseOrders);
  const navigate = useNavigate();
  const searchProduct = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      
      
      <div>
        <img
          onClick={() => navigate(-1)}
          className="h-[25px] w-[25px] cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
      </div>
      <div className="flex sm:justify-between sm:flex-row xs:flex-col">
        <h1 className="font-lato  mt-4 xs:text-[1.4rem] sm:text-[2rem] whitespace-nowrap">View All Invoices</h1>

        <div className="sm:self-end">
          <Input
            className="sm:w-44 h-8"
            prefix={<SearchOutlined />}
            placeholder="Search Customer"
            onChange={(event) => searchProduct(event.target.value)}
          />
        </div>
      </div>
      <div className="_cards">
        {purchaseOrders?.products?.length ? (
          <>
            <Card
              cardData={purchaseOrders?.products}
              Number={InvoiceNumber}
              Name={CompanyName}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>

      <Pagination
        //   onChange={handlePagination}
        className="flex justify-end"
        defaultCurrent={1}
        defaultPageSize={8}
        total={2}
        showSizeChanger={false}
      />

    </div>
  );
};

export default ViewAllInvoices;
