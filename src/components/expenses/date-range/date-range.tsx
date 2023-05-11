import { useState } from "react";

import { Button, DatePicker } from "antd";
import moment, { Moment } from "moment";
import dayjs, { Dayjs } from "dayjs";

const DateRange = () => {
  const [startMonth, setStartMonth] = useState<any>(null);
  const [endMonth, setEndMonth] = useState<any>(null);

  const handleClearSelection = () => {
    setStartMonth(null);
    setEndMonth(null);
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
            value={startMonth}
            onChange={setStartMonth}
            disabledDate={disabledStartDate}
            format="DD-MM-YYYY"
          />
        </div>
        <div>
          <label>End Month: </label>
          <DatePicker
            value={endMonth}
            onChange={setEndMonth}
            disabledDate={disabledEndDate}
            format="DD-MM-YYYY"
          />
        </div>
        <div>
          <Button
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
