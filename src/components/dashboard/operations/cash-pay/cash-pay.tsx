import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  InputNumber,
  Modal,
} from "antd";
import React, { useState } from "react";
import { backButtonIcon } from "../../../../assets/icons";

const CashPay: React.FC<any> = ({ total, isCashPayOpen, setCashPayOpen }) => {
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [showPartialPay, setShowPartialPay] = useState<boolean>(false);
  const handleOk = () => {
    setCashPayOpen(false);
  };

  const handleCancel = () => {
    setCashPayOpen(false);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <Modal
        width={360}
        footer={false}
        centered
        closable={false}
        open={isCashPayOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!showPartialPay ? (
          <div className="flex flex-col gap-4 h-[200px]">
            <div className="flex flex-col gap-3">
              <h1 className="flex justify-between text-xl text-semibold">
                <label>Total Amount</label>
                <label>$ {total.toFixed(2)}</label>
              </h1>
              <InputNumber
                style={{ width: "100%" }}
                onChange={(value) => setAmountReceived(value || 0)}
                min={0}
                placeholder="Amount received"
                type="number"
              />
            </div>
            <div className="flex justify-between">
              <Button className="w-[147px]" type="primary">
                Cash
              </Button>
              <Button
                onClick={() => setShowPartialPay(true)}
                className="w-[147px]"
                type="primary"
              >
                Partial Pay
              </Button>
            </div>
            {amountReceived >= total && (
              <div className="text-xl text-semibold flex gap-3 self-center">
                <label>Change</label>
                <label>$ {total - amountReceived}</label>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-[200px] ">
            <div className="flex items-center gap-9">
              <img
                onClick={() => setShowPartialPay(false)}
                className="h-[15px] w-[15px] cursor-pointer"
                src={backButtonIcon}
                alt="back"
              />
              <label className="text-xl font-bold ">
                Partial Payment Details
              </label>
            </div>
            <label className="_grey-color self-center">
              Please enter the following details.
            </label>
            <div className="flex gap-3 flex-col w-[210px] self-center">
              <div className="flex items-center justify-between gap-4">
                <label className="font-bold">Amount:</label>
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={total - 1}
                  type="number"
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="font-bold whitespace-nowrap">Due Date:</label>
                <DatePicker onChange={onChangeDate} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CashPay;
