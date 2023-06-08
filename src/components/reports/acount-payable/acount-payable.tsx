import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";
import DateRange from "../../common/date-range/date-range";
import Cards from "../common-cards/card/card";
import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getReportsPayable } from "../../../store/reports/reportsSlice";

const AcountPayable = () => {
  const dispatch = useAppDispatch();

  const { data, status } = useAppSelector((state) => state.reports);

  console.log(data, "payable");

  useEffect(() => {
    let payload = {
      page: 1,
      perPage: 8,
    };
    dispatch(getReportsPayable(payload));
  }, []);

  const getData = (value: any) => {
    dispatch(getReportsPayable(value));
  };

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
        <DateRange
          getData={getData}
          status={status}
          dataLength={data?.accountPayable?.length}
        />
      </div>

      <div>
        <Cards
          label1="Vendor"
          label2="PO"
          label3 = 'Payable'
          data={data?.accountPayable}
        />
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
