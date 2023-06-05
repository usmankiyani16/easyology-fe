import {useEffect} from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import DateRange from "../../common/date-range/date-range";
import Cards from "../common-cards/card/card";
import { Pagination } from "antd";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getReportsReceviveable } from "../../../store/reports/reportsSlice";


const AcountReceiveable = () => {
  const navigate = useNavigate();
 /*  const location = useLocation()
  const data = location.state */

  const dispatch = useAppDispatch();

  const {reportsReceiveable , status} = useAppSelector((state) => state.reports);

  console.log(reportsReceiveable, "reports");
  useEffect(() => {
    let queryParam = {
      page: 1,
    };
    dispatch(getReportsReceviveable(queryParam));
  }, []);

  const getData = (value:any) => {
    dispatch(getReportsReceviveable(value));
  }


  console.log(reportsReceiveable, 'reportsReceiveable')
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
        <DateRange getData={getData} status={status}/>
      </div>

      <div>
        <Cards label1="Customer" label2="Invoice" data = {reportsReceiveable?.receivableInvoices}  />
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

export default AcountReceiveable;
