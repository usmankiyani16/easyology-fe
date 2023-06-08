import { Card } from "antd";
import { useState, useEffect } from "react";
import acountReceiveableIcon from "../../assets/icons/layout/acount-receiveable.png";
import acountPayableIcon from "../../assets/icons/layout/acount-payable.png";
import monthlyReportsIcon from "../../assets/icons/layout/monthly-reports.png";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getReportsReceviveable } from "../../store/reports/reportsSlice";

const Reports = () => {
  // const dispatch = useAppDispatch();

  // const {reportsReceiveable , status} = useAppSelector((state) => state.reports);

  // console.log(reportsReceiveable, "reports");

  /* useEffect(() => {
    let queryParam = {
      page: 1,
    };
    dispatch(getReportsReceviveable(queryParam));
  }, []); */

  // const handlePagination = (value: Number) => {
  //   let payload: any = {};
  //   if (value) {
  //     payload = {
  //       page: Number(value),
  //       perPage: 8,
  //     };
  //     dispatch(getReportsReceviveable(payload));
  //   }
  // };
  // const {reports , status} =
  const [isClicked, setIsClicked] = useState(false);

  const handleCardClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-lato  text-[2rem]">Reports</h1>
      </div>
      <div className="flex xs:flex-col xs:items-center lg:flex-row sm:items-center sm:justify-around gap-4 mt-6">
        <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.ACOUNT_RECEIVEABLE}>
          <Card
            className={`_po-card w-64 border-red-500 cursor-pointer ${
              isClicked ? "_bg-primary-color" : ""
            }`}
            onClick={handleCardClick}
          >
            <div className="flex gap-6 items-center">
              <img src={acountReceiveableIcon} alt="acountReceiveableIcon" />
              <span className="_primary-color text-[16px] whitespace-nowrap">
                Acount Receiveable
              </span>
            </div>
          </Card>
        </Link>
        <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.ACOUNT_PAYABLE}>
          <Card className="_po-card w-64 border-red-500 cursor-pointer">
            <div className="flex gap-6 items-center">
              <img src={acountPayableIcon} alt="acountPayableIcon" />
              <span className="_primary-color text-[16px]">Acount Payable</span>
            </div>
          </Card>
        </Link>

        <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.MONTHLY_REPORT}>
          <Card className="_po-card w-64 border-red-500 cursor-pointer">
            <div className="flex gap-6 items-center">
              <img src={monthlyReportsIcon} alt="monthlyReportsIcon" />

              <span className="_primary-color text-[16px]">Monthly Report</span>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Reports;
