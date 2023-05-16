import { Button, Pagination } from "antd";
import expenseIcon from "../../assets/images/dashboard/expense.png";
import DateRange from "./date-range/date-range";
import ExpenseCard from "./expense-card/expense-card";
import { Link } from "react-router-dom";

const Expenses = () => {
  return (
    <div className="_customer-wrapper">
      <div className="flex items-center justify-between mt-3">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Expenses</h1>
        </div>

        <Link to="/add-expense">
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

export default Expenses;
