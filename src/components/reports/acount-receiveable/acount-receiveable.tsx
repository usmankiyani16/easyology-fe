import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import DateRange from "../../common/date-range/date-range";
import Cards from "../common-cards/card/card";
import { Pagination } from "antd";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getReportsReceviveable } from "../../../store/reports/reportsSlice";

const AcountReceiveable = () => {
  const navigate = useNavigate();
  const viewReceiveableRoute = ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.VIEW_ACOUNT_RECEIVEABLE
  /*  const location = useLocation()
  const data = location.state */

  const dispatch = useAppDispatch();

  const { data, status } = useAppSelector(
    (state) => state.reports
  );

  const handlePagination = (value: Number) => {
    let payload: any = {};
    if (value) {
      payload = {
        page: Number(value),
        perPage: 8,
      };
      dispatch(getReportsReceviveable(payload));
    }
  };
  useEffect(() => {
    let payload = {
      page: 1,
      perPage: 8,
    };
    dispatch(getReportsReceviveable(payload));
  }, []);

  const getData = (value: any) => {
    dispatch(getReportsReceviveable(value));
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
        <h1 className="font-lato  text-[2rem]">Acount Receiveable</h1>
      </div>

      <div>
        <DateRange
          getData={getData}
          status={status}
          dataLength={data?.receivableInvoices?.length}
        />
      </div>

      <div>
        <Cards
          label1="Customer"
          label2="Invoice"
          label3= "Receiveable"
          data={data?.receivableInvoices}
          status={status}
          viewRoute={viewReceiveableRoute}
        />
      </div>

      <Pagination
        onChange={handlePagination}
        className="flex justify-end"
        defaultCurrent={1}
        defaultPageSize={8}
        total={2}
        showSizeChanger={false}
      />
    </div>
  );
};

export default AcountReceiveable;
