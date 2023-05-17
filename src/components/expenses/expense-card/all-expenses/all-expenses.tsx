import React, { useEffect, useRef } from "react";
import { Button, Input, Pagination } from "antd";
import exportIcon from "../../../../assets/icons/dashboard/export-Icon.png";

import AllExpenseCard from "./all-expenses-card/all-expenses-card";
import expense from "../../mock-data/expense";

import { SearchOutlined } from "@ant-design/icons";

import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ExpensePDF from "./expense-report/expense-report";
import { useLocation } from "react-router-dom";
import { getExpenses } from "../../../../store/expenses/expenses.slice";
import { useAppDispatch } from "../../../../store/store";

const AllExpenses = () => {
  
  
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
          <h1 className="font-lato mt-4 xs:text-[1.8rem] sm:text-[2rem] whitespace-nowrap">
            Expenses of <span className="_primary-color">January</span>
          </h1>
          <div className="sm:mt-4">
            <Input
              className="w-44 h-8"
              prefix={<SearchOutlined />}
              placeholder="Search Customer"
              onChange={(event) => searchProduct(event.target.value)}
            />
          </div>
        </div>

        <PDFDownloadLink document={<ExpensePDF />} fileName="expenses.pdf">
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
      <div className="_cards">
        <AllExpenseCard expense={expense} />
      </div>

      {/* <PDFViewer style={{ width: "100%", height: "600px" }} ref={pdfRef}>
        <ExpensePDF />
      </PDFViewer> */}

      <div className="m-auto flex justify-center gap-4 text-2xl mt-2">
        <span>Total Expenses </span>
        <span className="_primary-color"> $1400</span>
      </div>
      <div>
        <Pagination
          //   onChange={handlePagination}
          className="flex justify-end"
          defaultCurrent={1}
          defaultPageSize={8}
          total={2}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AllExpenses;
