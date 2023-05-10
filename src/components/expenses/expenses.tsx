import { Button, DatePicker, Pagination } from "antd";
import expenseIcon from "../../assets/images/dashboard/expense.png";

const Expenses = () => {
  return (
    <div className="_customer-wrapper">
      <div className="flex items-center justify-between mt-3">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Expenses</h1>
        </div>

        <div>
          {/* <img src={AddPO} alt="Add PO logo" className="h-8" /> */}
          <Button className="_bg-white-color _primary-color _border-primary-color _white-color _hover font-medium mt-4 flex justify-between items-center gap-4">
            <img
              className="flex justify-start"
              src={expenseIcon}
              alt="expenseIcon"
            />

            <span> Add Expense</span>
          </Button>
        </div>
      </div>

      <div className="_date-ranges mt-4">
        <div className="flex justify-around text-lg">
          <div>
            <label >Start Month: </label>
            <DatePicker />
          </div>
          <div>
            <label>End Month: </label>
            <DatePicker />
          </div>
          <div>
            <Button className="_bg-primary-color _white-color">
              Clear Seletion
            </Button>
          </div>
        </div>
      </div>

      <div className="_cards">{/* <CustomerCard /> */}</div>

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
