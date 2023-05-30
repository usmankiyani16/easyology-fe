
import React, { useEffect, useRef, useState } from "react";
import { Button, Pagination } from 'antd'
import { useLocation, useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../../assets/icons";
import exportIcon from "../../../../assets/icons/dashboard/export-Icon.png";
import ViewMonthlyReportCard from "./view-monthly-report-card";
import MonthlyPieChart from "../monthly-pie-chart/monthly-pie-chart";


const ViewMonthlyReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    console.log(data, 'bebe')

    console.log(data, 'sen')

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
               Month of <span className="_primary-color">{data?.month}</span>
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
      <MonthlyPieChart />
      </div>

      <div>
        {/* <ViewReceiveableCard receiveableData={data}/> */}
        <ViewMonthlyReportCard monthlydata= {data}/>
      </div>

   
      <div>
        {/* <TotalReceiveable /> */}
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
  )
}

export default ViewMonthlyReport