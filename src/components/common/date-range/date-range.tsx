import { useState } from "react";

import { Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getExpenses } from "../../../store/expenses/expenses.slice";
import { REQUEST_STATUS } from "../../../utils/constants";

const DateRange: React.FC<any> = ({ getData, status , dataLength}) => {
  const dispatch = useAppDispatch();
  const [startMonth, setStartMonth] = useState<any>(null);
  const [endMonth, setEndMonth] = useState<any>(null);
  const { data } = useAppSelector((state) => state.expenses);
  // const { orders } = useAppSelector((state) => state.orders);

  let payload: any = {
    page: 1,
    perPage: 8,
  };

  const handleStartDateChange = (dateValue: any) => {
    setStartMonth(dateValue);
    payload.startDate = dayjs(startMonth).format("YYYY-MM-DD");
    payload.endDate = dayjs(dateValue).format("YYYY-MM-DD");

    if (endMonth) getData(payload);
  };

  const handleEndDateChange = (dateValue: any) => {
    setEndMonth(dateValue);
    payload.startDate = dayjs(startMonth).format("YYYY-MM-DD");
    payload.endDate = dayjs(dateValue).format("YYYY-MM-DD");

    if (startMonth) getData(payload);
  };

  const handleClearSelection = () => {
    setStartMonth(null);
    setEndMonth(null);
    if (startMonth && endMonth) getData(payload);
  };

  // Validating Dates

  const disabledEndDate = (current: Dayjs | null) => {
    if (!startMonth || !current) {
      return false;
    }

    return current.unix() < startMonth.unix();
  };

  const disabledStartDate = (current: Dayjs | null) => {
    if (!current || !endMonth) {
      return false;
    }

    return current.unix() > endMonth.unix();
  };

  return (
    <div>
      <div className="flex xs:flex-col sm:flex-row justify-center gap-12 items-center text-lg mt-4">
        <div>
          <label>Start Month: </label>
          <DatePicker
            disabled={
              !dataLength || status === REQUEST_STATUS.PENDING
            }
            value={startMonth}
            // onChange={setStartMonth}
            onChange={(value) => handleStartDateChange(value)}
            disabledDate={disabledStartDate}
            format="DD-MM-YYYY"
            allowClear={false}
          />
        </div>
        <div>
          <label>End Month: </label>
          <DatePicker
            disabled={
              !dataLength || status === REQUEST_STATUS.PENDING
            }
            value={endMonth}
            onChange={(value) => handleEndDateChange(value)}
            disabledDate={disabledEndDate}
            format="DD-MM-YYYY"
            allowClear={false}
          />
        </div>
        <div>
          <Button
            disabled={status === REQUEST_STATUS.PENDING}
            className="_bg-primary-color _white-color cursor-pointer"
            onClick={handleClearSelection}
          >
            Clear Seletion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateRange;
