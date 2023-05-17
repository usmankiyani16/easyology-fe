import { Button } from "antd";
import CustomersDetail from "./customer-details/customers-detail";
import LastInvoices from "./last-invoices/last-invoices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";



const ViewCustomers = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const data = location.state;
  console.log(data)
  return (
    <div className="_view-wrap">
      <div>
        <img
          onClick={() => navigate(-1)}
          className="h-[25px] w-[25px] cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
      </div>

      <CustomersDetail />

      <LastInvoices />

      <div>
        <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.VIEW_ALL_INVOICES}>
          <div className="m-auto">
            <Button className="_bg-primary-color _white-color _hover font-medium mt-4">
              View All Invoices
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ViewCustomers;
