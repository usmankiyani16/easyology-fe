import { useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import DateRange from "../../expenses/date-range/date-range";
import Cards from "../common-cards/card/card";
import { Pagination } from "antd";

const AcountPayable = () => {
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
        <h1 className="font-lato  text-[2rem]">Acount Payable</h1>
      </div>

      <div>
        <DateRange />
      </div>

      <div>
        <Cards label1="Vendor" label2="PO" />
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

export default AcountPayable;
