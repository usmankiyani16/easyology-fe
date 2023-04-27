import React, { useState } from "react";
import "./operations.scss";
import { Button, InputNumber } from "antd";
import CashPay from "./cash-pay/cash-pay";

const Operations: React.FC<any> = ({ totalPrice }) => {
  const [isCashPayOpen, setIsCashPayOpen] = useState(false);
  const [number, setNumber] = useState<number>(0);
  const taxRate = 0.025; // 2.5%
  const saleTax = totalPrice * taxRate;
  const total = totalPrice + saleTax - number;

  const handleChange = (value: number | undefined | null) => {
    if ((value !== undefined || value !== null) && Number(value) >= 0) {
      setNumber(Number(value));
    }
  };
  return (
    <div className="_operations flex justify-between w-full mt-10">
      <div className="flex flex-col gap-10 w-9/12">
        <div className="flex gap-5">
          <Button className="w-32 flex items-center justify-center">
            Void Invoice
          </Button>
          <Button className="w-32 flex items-center justify-center">
            No Sale
          </Button>
          <Button className="w-32 flex items-center justify-center">
            Hold Invoice
          </Button>
        </div>
        <div className="flex gap-5">
          <Button
            onClick={() => setIsCashPayOpen(true)}
            className="w-32 flex items-center justify-center"
          >
            Cash Pay
          </Button>
          <Button className="w-32 flex items-center justify-center">
            Ach Pay
          </Button>
          <Button className="w-32 flex items-center justify-center">
            Credit Card
          </Button>
        </div>
      </div>
      <div className="w-3/12 pr-5 flex flex-col gap-5">
        <div className="flex justify-between">
          <label>Sub-Total </label>
          <label>$ {totalPrice}</label>
        </div>
        <div className="flex justify-between">
          <label>Discount </label>
          <label className=" rounded ">
            <InputNumber
              type="number"
              min={0}
              max={totalPrice | 0}
              value={number}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex justify-between">
          <div>
            <label className="_grey-color">Sales Tax </label>
            <label>(2.5%) </label>
          </div>
          <label>$ {saleTax.toFixed(2)}</label>
        </div>
        <div className="flex justify-between">
          <label className="_primary-color">Total </label>
          <label>$ {total.toFixed(2)}</label>
        </div>
      </div>
      {isCashPayOpen && (
        <CashPay
          total={total}
          isCashPayOpen={isCashPayOpen}
          setCashPayOpen={setIsCashPayOpen}
        />
      )}
    </div>
  );
};

export default Operations;
