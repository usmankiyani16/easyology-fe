import { useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import DateRange from "../../expenses/date-range/date-range";
import AcountReceiveableCard from "./acount-receiveable-card/acount-receiveable-card";
import TotalReceiveable from "./total-receiveable/total-receiveable";
import { Pagination } from "antd";

const AcountReceiveable = () => {
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
        <h1 className="font-lato  text-[2rem]">Acount Receiveable</h1>
      </div>

      <div>
        <DateRange />
      </div>

      <div>
        <AcountReceiveableCard label1='Customer' label2='Invoice' />
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
