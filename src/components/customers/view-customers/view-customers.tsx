import { Button, Empty } from "antd";
import CustomersDetail from "./customer-details/customers-detail";
import LastInvoices from "./last-invoices/last-invoices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";

const ViewCustomers = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const data = location.state;
  console.log(data);
  return (
    <div className="_view-wrap">
      <div>
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
      </div>

      <CustomersDetail customerData={data} />

      {data?.orders?.length ? (
        <>
          <LastInvoices invoiceData={data} />

          <div>
            <Link
              to={{
                pathname:
                  ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.VIEW_ALL_INVOICES,
              }}
              state={data}
            >
              <div className="m-auto">
                <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
                  View All Invoices
                </Button>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Recent Invoices"
        />
      )}
    </div>
  );
};

export default ViewCustomers;
