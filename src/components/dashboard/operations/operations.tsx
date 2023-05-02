import React, { useState } from "react";
import "./operations.scss";
import { Button, InputNumber } from "antd";
import CashPay from "./cash-pay/cash-pay";
import { useAppSelector } from "../../../store/store";

const Operations: React.FC<any> = ({ totalPrice }) => {
  const { selectedProducts } = useAppSelector((state) => state.products);
  const [isCashPayOpen, setIsCashPayOpen] = useState(false);
  const [number, setNumber] = useState<number>(0);
  const taxRate = 0.025; // 2.5%
  const saleTax = totalPrice * taxRate;
  const total = totalPrice + saleTax - number;
  const disableButton = !selectedProducts?.length;

  const handleChange = (value: number | undefined | null) => {
    if (Number(value) < totalPrice) {
      if ((value !== undefined || value !== null) && Number(value) >= 0) {
        setNumber(Number(value));
      }
    }
  };
  return (
    <div className="_operations flex justify-between w-full mt-10">
      <div className="flex flex-col gap-10 w-9/12">
        <div className="flex gap-5">
          <Button
            disabled={disableButton}
            className="w-32 flex items-center justify-center"
          >
            Void Invoice
          </Button>
          <Button
            disabled={disableButton}
            className="w-32 flex items-center justify-center"
          >
            No Sale
          </Button>
          <Button
            disabled={disableButton}
            className="w-32 flex items-center justify-center"
          >
            Hold Invoice
          </Button>
        </div>
        <div className="flex gap-5">
          <Button
            disabled={disableButton}
            onClick={() => setIsCashPayOpen(true)}
            className="w-32 flex items-center justify-center"
          >
            Cash Pay
          </Button>
          <Button
            disabled={disableButton}
            className="w-32 flex items-center justify-center"
          >
            Ach Pay
          </Button>
          <Button
            disabled={disableButton}
            className="w-32 flex items-center justify-center"
          >
            Credit Card
          </Button>
        </div>
      </div>
      <div className="w-3/12 pr-10 flex flex-col gap-5">
        <div className="flex ">
          <label className="w-9/12">Sub-Total </label>
          <label className="w-3/12 whitespace-nowrap">$ {totalPrice}</label>
        </div>
        <div className="flex ">
          <label className="w-9/12 whitespace-nowrap">Discount </label>
          <label className=" rounded w-3/12">
            <InputNumber
              style={{ width: "100%" }}
              className="_remove-icon shadow-lg"
              type="number"
              min={0}
              max={totalPrice | 0}
              value={number > totalPrice ? 0 : number}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex ">
          <div className="w-9/12">
            <label className="_grey-color">Sales Tax </label>
            <label>(2.5%) </label>
          </div>
          <label className="w-3/12 whitespace-nowrap">$ {saleTax.toFixed(2)}</label>
        </div>
        <div className="flex ">
          <label className="_primary-color w-9/12 ">Total </label>
          <label className="w-3/12 whitespace-nowrap">
            $ {total.toFixed(2)}
          </label>
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
