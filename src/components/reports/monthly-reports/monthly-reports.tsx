import { useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import DateRange from "../../common/date-range/date-range";
import MonthlyReportCard from "./monthly-report-card/monthly-report-card";
import { Pagination } from "antd";
import MonthlyPieChart from "./monthly-pie-chart/monthly-pie-chart";

const MonthlyReport = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center gap-4">
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
        <h1 className="font-lato  text-[2rem]">Monthly Report</h1>
      </div>

      <div>
        <DateRange />
      </div>

      <div>
        <MonthlyPieChart />
      </div>

      <div>
        <MonthlyReportCard />
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

export default MonthlyReport;
