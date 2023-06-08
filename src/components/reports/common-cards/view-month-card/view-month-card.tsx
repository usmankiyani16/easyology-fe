import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Pagination } from "antd";
import { backButtonIcon } from "../../../../assets/icons";
import exportIcon from "../../../../assets/icons/dashboard/export-Icon.png";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
// import ExpensePDF from "../../../../components/expenses/expense-card/all-expenses/expense-report";
import { useLocation, useNavigate } from "react-router-dom";
import MonthCard from "../view-month-card/month-card/month-card";
import TotalAmount from "../view-month-card/totalAmount/total-amount";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  getReportsPayable,
  getReportsReceviveable,
} from "../../../../store/reports/reportsSlice";

const ViewMonthCard = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.reports);
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;
  const month = stateData?.data?.month;

  // ! Remaining Amount etc waali key values set krni hai abhi
  let cardData;
  if (stateData.pathname === "/acount-receiveable") {
    cardData = data?.receivableInvoices?.map((data: any) => {
      return {
        id: data?.userDetail?.userNo,
        name: data?.userDetail?.firstName + " " + data?.userDetail?.lastName,
        number: data?.poNumber,
        totalAmount: data?.totalAmount,
        payMethod: data?.payments[0]?.paymentType,
      };
    });
  }
  if (stateData.pathname === "/acount-payable") {
    cardData = data?.accountPayable?.map((data: any) => {
      return {
        id: data?.vendorId,
        name: data?.vendorDetail?.name,
        number: data?.poNumber,
        amount: data?.totalAmount,
        payMethod: data?.payments[0]?.paymentType,
      };
    });
  }
  console.log("cardDATA", cardData);
  console.log("stateData", stateData);

  useEffect(() => {
    let payload = {
      month,
      page: 1,
      perPage: 8,
    };
    dispatch(getReportsReceviveable(payload));
    dispatch(getReportsPayable(payload));
  }, [month]);
  console.log(data, "receiveable");

  const pdfRef = useRef(null);

  const generatePDF = () => {
    const { current }: any = pdfRef;

    if (current) {
      current.updateContainer();
      current.toPDF();
    }
  };
  return (
    <div>
      <div className="flex sm:flex-row xs:flex-col items-center justify-between mt-3">
        <div className="flex xs:flex-col xs:items-center sm:flex-row sm:items-center sm:gap-12 xs:justify-between">
          <div className="flex items-center gap-2">
            <img
              onClick={() => navigate(-1)}
              className="cursor-pointer"
              src={backButtonIcon}
              alt="back"
            />
            <h1 className="font-lato xs:text-[1.8rem] sm:text-[2rem] whitespace-nowrap">
              Month of <span className="_primary-color">{month}</span>
            </h1>
          </div>
        </div>

        {/*  <PDFDownloadLink
          document={
            <ExpensePDF
              expenses={data?.expenses}
              monthName={monthName}
              totalAmount={totalAmount}
            />
          }
          fileName={`Expenses.pdf`}
        > */}
        <div>
          <Button
            className="_bg-white-color _primary-color _border-primary-color _white-color _hover font-medium mt-4 flex justify-between items-center gap-4"
            onClick={generatePDF}
          >
            <img
              className="flex justify-start"
              src={exportIcon}
              alt="exportIcon"
            />
            {/* {({ loading }) => (loading ? "Loading..." : "Export Report")} */}
            Export Report
          </Button>
        </div>
        {/* </PDFDownloadLink> */}
      </div>

      <div>
        <MonthCard month={month} cardData={cardData} />
      </div>

      <div>
        <TotalAmount stateData={stateData} />
      </div>
    </div>
  );
};

export default ViewMonthCard;
