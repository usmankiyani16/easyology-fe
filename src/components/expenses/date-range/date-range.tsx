import { useState } from "react";

import { Button, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getExpenses } from "../../../store/expenses/expenses.slice";
import { REQUEST_STATUS } from "../../../utils/constants";

const DateRange = () => {
  const dispatch = useAppDispatch();
  const [startMonth, setStartMonth] = useState<any>(null);
  const [endMonth, setEndMonth] = useState<any>(null);
  const { data, status } = useAppSelector((state) => state.expenses);

  let payload: any = {
    page: 1,
    perPage: 8,
  };
  const handleDateChange = (dateValue: any) => {
    setEndMonth(dateValue);
    payload.startDate = dayjs(startMonth).format("YYYY-MM-DD");
    payload.endDate = dayjs(dateValue).format("YYYY-MM-DD");

    if (startMonth) dispatch(getExpenses(payload));
  };
  const handleClearSelection = () => {
    setStartMonth(null);
    setEndMonth(null);
    if (startMonth && endMonth) dispatch(getExpenses(payload));
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

  /*  const disabledStartDate = (current: dayjs.Dayjs | null): boolean => {
    return current ? current.isBefore(dayjs().startOf("day")) : false;
  }; */
  // const disabledEndDate = (current: dayjs.Dayjs | null): boolean => {
  //   return current ? current.isBefore(dayjs().endOf("day")) : false;
  // };
  return (
    <div>
      <div className="flex justify-center gap-12 items-center text-lg mt-4">
        <div>
          <label>Start Month: </label>
          <DatePicker
            disabled={
              !data?.expenses?.length || status === REQUEST_STATUS.PENDING
            }
            value={startMonth}
            onChange={setStartMonth}
            disabledDate={disabledStartDate}
            format="DD-MM-YYYY"
            allowClear={false}
          />
        </div>
        <div>
          <label>End Month: </label>
          <DatePicker
            disabled={
              !data?.expenses?.length || status === REQUEST_STATUS.PENDING
            }
            value={endMonth}
            onChange={(value) => handleDateChange(value)}
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
