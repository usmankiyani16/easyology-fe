import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../store/store";
import { useLocation } from "react-router-dom";
import { getExpenses } from "../../../../../store/expenses/expenses.slice";

const AllExpenseCard: React.FC<any> = ({ expense }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const month = location.state;
  const [applyBorder, setApplyBorder] = useState(false);

  useEffect(() => {
    let payload = {
      month,
      page: 1,
      perPage: 8,
    };
    dispatch(getExpenses(payload));
  }, []);

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
    <>
      <div className="flex flex-col gap-4 mt-3">
        {expense?.map((data: any) => (
          <Card key={data?.key} className="_po-card">
            <div className="flex w-full justify-between grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } lg:pr-7 lg:mr-7`}
              >
                <div className="flex flex-col items-center text-lg gap-1">
                  <span className="font-medium">Date:</span>
                  <span className="_grey-color">{data?.date}</span>
                </div>
              </div>
              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } lg:pr-7 lg:mr-7`}
              >
                <div className="flex flex-col items-center text-lg md:gap-1">
                  <span className="font-medium">Expense Description</span>
                  <span className=" _grey-color">{data?.expenseDesc}</span>
                </div>
              </div>

              <div
                className={`flex flex-col justify-between${
                  applyBorder ? " _border-r" : ""
                } lg:pr-7 lg:mr-7`}
              >
                <div className="flex flex-col items-center text-lg md:gap-1">
                  <span className="font-medium">Expense Amount:</span>
                  {
                    <span className="_grey-color">
                      $ {data?.totalExpenseAmount}
                    </span>
                  }
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col items-center text-lg md:gap-1">
                  <span className="font-medium">Payment Method:</span>
                  {
                    <span className="_primary-color">
                      $ {data?.paymentMethod}
                    </span>
                  }
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AllExpenseCard;
