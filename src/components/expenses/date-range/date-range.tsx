import { useState } from "react";

import { Button, DatePicker } from "antd";
import moment, { Moment } from "moment";

const DateRange = () => {
  const [startMonth, setStartMonth] = useState<any>(null);
  const [endMonth, setEndMonth] = useState<any>(null);

  const handleClearSelection = () => {
    setStartMonth(null);
    setEndMonth(null);
  };

  // Validating Dates

  const disabledEndDate = (current: Moment | null) => {
    if (!startMonth || !current) {
      return false;
    }

    return current.toDate().getTime() < startMonth.toDate().getTime();
  };

  const disabledStartDate = (current: Moment | null) => {
    if (!current || !endMonth) {
      return false;
    }

    return current.toDate().getTime() > endMonth.toDate().getTime();
  };

  return (
    <div>
      <div className="flex justify-center gap-12 items-center text-lg mt-4">
        <div>
          <label>Start Month: </label>
          <DatePicker
            value={startMonth}
            onChange={setStartMonth}
            disabledDate={disabledStartDate}
          />
        </div>
        <div>
          <label>End Month: </label>
          <DatePicker
            value={endMonth}
            onChange={setEndMonth}
            disabledDate={disabledEndDate}
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
