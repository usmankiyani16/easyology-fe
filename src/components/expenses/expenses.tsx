import { Button, Empty, Pagination } from "antd";
import expenseIcon from "../../assets/images/dashboard/expense.png";
import DateRange from "./date-range/date-range";
import ExpenseCard from "./expense-card/expense-card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getExpenses } from "../../store/expenses/expenses.slice";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";
import { useDispatch } from "react-redux";
import { REQUEST_STATUS } from "../../utils/constants";

const Expenses = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.expenses);

  const handlePagination = (value: Number) => {
    let payload: any = {};
    if (value) {
      payload = {
        page: Number(value),
        perPage: 8,
      };
      dispatch(getExpenses(payload));
    }
  };
  return (
    <div className="_customer-wrapper">
      <div className="flex items-center justify-between mt-3">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Expenses</h1>
        </div>

        <Link to={ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.ADD_EXPENSE}>
          <div>
            {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}
            <Button className="_bg-white-color _primary-color _border-primary-color _white-color _hover font-medium mt-4 flex justify-between items-center gap-4 cursor-pointer">
              <img
                className="flex justify-start"
                src={expenseIcon}
                alt="expenseIcon"
              />

              <span>Add Expense</span>
            </Button>
          </div>
        </Link>
      </div>

      <div className="_date-ranges">
        <DateRange />
      </div>

      <div className="_cards">
        <ExpenseCard />
      </div>

      {data?.expenses?.length && status === REQUEST_STATUS.SUCCEEDED ? (
        <div>
          <Pagination
            onChange={handlePagination}
            className="flex justify-end mt-4"
            defaultCurrent={data?.pagination?.page}
            defaultPageSize={8}
            total={data?.pagination?.totalCount}
            showSizeChanger={false}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Expenses;
