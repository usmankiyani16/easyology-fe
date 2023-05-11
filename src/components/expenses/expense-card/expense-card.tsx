import { useEffect, useState } from "react";
import { Card, Button, Pagination } from "antd";

// import ordersData from "../mock-data/orders-data";
import { Link } from "react-router-dom";
import Expense from "../mock-data/expense";

const ExpenseCard = () => {
  const [applyBorder, setApplyBorder] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 880) {
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
    <div className="_order-card-wrap">
      <div className="flex flex-col gap-4 mt-3">
        {Expense?.map((data: any) => (
          <Card>
            <div className="flex w-full justify-between items-center grid 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1">
              {/* -------- Grid 1 ------------ */}
              <div className="flex flex-col justify-between">
                
                <div className="flex text-lg sm:gap-4">
                  <span className="font-medium">Month:</span>
                  <span className="_primary-color font-semibold">
                    # {data?.month}
                  </span>
                </div>
              </div>

              {/* -------- Grid 2 ------------ */}
              <div className="flex flex-col justify-center text-lg sm:gap-4">
                <div className="flex  text-lg sm:gap-2 sm:items-center md:justify-end xl:justify-start">
                  <span className="_black-color sm:whitespace-nowrap">
                    Total number of expense:
                  </span>
                  <span className="_grey-color font-semibold">
                    {data?.totalExpense}
                  </span>
                </div>
               
              </div>
              {/* -------- Grid 3 ------------ */}
              <div
                className={`flex flex-col justify-center text-lg ${data?.orderStatus === "Completed"  && "sm:gap-0"} gap-4`}
              >
                <div className="flex  text-lg sm:gap-2 sm:items-center">
                  <span className="_black-color sm:whitespace-nowrap">
                    Amount Expense:
                  </span>
                  <span className="_grey-color whitespace-nowrap">
                    {data?.totalExpenseAmount}
                  </span>
                </div>

               
              </div>

              {/* -------- Grid 4 ------------ */}

              <Link to="/all-expenses">
                <div className="flex xs:justify-center xs:mt-2 md:justify-end items-center ">
                  <Button>View</Button>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </div>
  
    </div>
  );
};

export default ExpenseCard;
