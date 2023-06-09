import { useState, useEffect } from "react";
import { Button, Card, Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import cardData from "../../card/mock-data";
import { getReportsReceviveable } from "../../../../../store/reports/reportsSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";

const MonthCard: React.FC<any> = ({ month , cardData}) => {
  const dispatch = useAppDispatch();
  const { data , status } = useAppSelector(
    (state) => state.reports
  );

  
  const [applyBorder, setApplyBorder] = useState(false);
  const location = useLocation();
  const propData = location.state;

  // console.log(reportsReceiveable, "view receiveable");

  console.log(month, "month");

  // console.log(cardData, "Card Data");

  // const handlePagination = async (value: Number) => {
  //   let payload: any = {};
  //   if (value) {
  //     payload = {
  //       month,
  //       page: value,
  //       perPage: 8,
  //     };
  //     dispatch(getReportsReceviveable(payload));
  //   }
  // };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1100) {
        setApplyBorder(true);
      } else {
        setApplyBorder(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-4 mt-3">
        {cardData?.map((data: any) => (
          <Card key={data?.key} className="_po-card">
            <div className="flex w-full justify-between grid grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } pr-7 mr-7`}
              >
                <div className="flex text-lg gap-4">
                  <span className="font-medium whitespace-nowrap">
                    {propData?.label1} ID:
                  </span>
                  <span className="font-semibold _primary-color">
                    #{data?.id}
                  </span>
                </div>
                <div className="flex text-lg gap-2 whitespace-nowrap">
                  <span className="font-medium">{propData?.label1} Name:</span>
                  <span className="font-medium captilize _label-grey _grey-color">
                    {data?.name}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } pr-7 mr-7`}
              >
                <div className="flex text-lg gap-4">
                  <span className="font-medium whitespace-nowrap">
                    {propData?.label2} No:
                  </span>
                  <span className="font-semibold _primary-color">
                    #{data?.number}
                  </span>
                </div>
                <div className="flex text-lg gap-2 whitespace-nowrap">
                  <span className="font-medium">Amount:</span>
                  <span className="font-medium captilize _label-grey _grey-color">
                    $ {data?.amount}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-lg gap-4">
                  <span className="font-medium _label-grey">
                    Payment Method:
                  </span>
                  <span className="_grey-color">{data?.paymentMethod}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Pagination
        // onChange={handlePagination}
        className="flex justify-end"
        defaultCurrent={1}
        defaultPageSize={8}
        total={2}
        showSizeChanger={false}
      />
    </div>
  );
};

export default MonthCard;
