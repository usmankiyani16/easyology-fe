import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Pagination } from "antd";
import { backButtonIcon } from "../../../../assets/icons";
import exportIcon from "../../../../assets/icons/dashboard/export-Icon.png";

import AllExpenseCard from "./all-expenses-card/all-expenses-card";
import expense from "../../mock-data/expense";

import { SearchOutlined } from "@ant-design/icons";

import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ExpensePDF from "./expense-report/expense-report";
import { useLocation, useNavigate } from "react-router-dom";
import { getExpenses } from "../../../../store/expenses/expenses.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { REQUEST_STATUS } from "../../../../utils/constants";
import Spinner from "../../../common/spinner/spinner";
import dayjs from "dayjs";

const AllExpenses = () => {
  const { data, status } = useAppSelector((state) => state.expenses);
  const navigate = useNavigate();

  console.log(data, "expense ooooo");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const month = location.state;
  const monthName = dayjs()
    .month(month - 1)
    .format("MMMM");

  let totalAmount = data?.expenses?.reduce(
    (total: number, expense: { expenseAmount: number }) =>
      total + expense.expenseAmount,
    0
  );

  const handlePagination = async (value: Number) => {
    let payload: any = {};
    if (value) {
      payload = {
        month,
        page: value,
        perPage: 8,
      };
      dispatch(getExpenses(payload));
    }
  };

  useEffect(() => {
    let payload = {
      month,
      page: 1,
      perPage: 8,
    };
    dispatch(getExpenses(payload));
  }, []);

  const pdfRef = useRef(null);

  const generatePDF = () => {
    const { current }: any = pdfRef;

    if (current) {
      current.updateContainer();
      current.toPDF();
    }
  };

  const searchProduct = (value: any) => {
    console.log(value);
  };

  // Render the MonthlyExpenseReport component

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
              Expenses of <span className="_primary-color">{monthName}</span>
            </h1>
          </div>
        </div>

        <PDFDownloadLink
          document={
            <ExpensePDF
              expenses={data?.expenses}
              monthName={monthName}
              totalAmount={totalAmount}
            />
          }
          fileName={`${monthName}-Expenses.pdf`}
        >
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
        </PDFDownloadLink>
      </div>
      {status === REQUEST_STATUS.PENDING ? (
        <Spinner />
      ) : (
        <>
          <div className="_cards">
            <AllExpenseCard expenses={data?.expenses} />
          </div>

          <div className="m-auto flex justify-center gap-4 text-2xl mt-2">
            <span>Total Expenses </span>
            <span className="_primary-color"> ${totalAmount ?? ""}</span>
          </div>

          {/* <div style={{ marginTop: "20px", width: "100%", height: "1000px" }}>
            <PDFViewer style={{ width: "100%", height: "100%" }}>
              <ExpensePDF
                expenses={data?.expenses}
                monthName={monthName}
                totalAmount={totalAmount}
              />
            </PDFViewer>
          </div> */}
          {data?.expenses?.length ? (
            <div>
              <Pagination
                onChange={handlePagination}
                className="flex justify-end"
                defaultCurrent={data?.pagination?.page}
                defaultPageSize={8}
                total={data?.pagination?.totalCount}
                showSizeChanger={false}
              />
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default AllExpenses;
