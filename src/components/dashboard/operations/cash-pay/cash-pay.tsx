import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import React, { useState } from "react";
import { backButtonIcon } from "../../../../assets/icons";

const CashPay: React.FC<any> = ({ total, isCashPayOpen, setCashPayOpen }) => {
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [showPartialPay, setShowPartialPay] = useState<boolean>(false);
  const [showPay, setShowPay] = useState<boolean>(false);
  const handleOk = () => {
    setCashPayOpen(false);
  };

  const handleCancel = () => {
    setCashPayOpen(false);
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    if (date) {
      setShowPay(true);
    } else {
      setShowPay(false);
    }
  };
  const onFinish = (values: any) => {
    console.log(values);
  };

  // Price Validator

  const validatePrice = (
    rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    const price = parseFloat(value);

    if (isNaN(price) || !/^[1-9]\d*(\.\d+)?$/.test(value)) {
      callback("Required valid");
    } else if (price <= 0) {
      callback("Price must be greater than zero");
    } else {
      callback();
    }
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
        <Form
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 14 }}
          layout="horizontal"
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          autoComplete="off"
        >
          {!showPartialPay ? (
            <div className="flex flex-col gap-4 h-[250px]">
              <div className="flex flex-col gap-3">
                <h1 className="flex justify-between text-xl text-semibold">
                  <span>Amount Due</span>
                  <span>$ {total.toFixed(2)}</span>
                </h1>

                <Form.Item
                  name="amountreceived"
                  required
                  tooltip="This is a required field"
                  rules={[{ required: true, validator: validatePrice }]}
                  className="mb-0"
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    onChange={(value) => setAmountReceived(value || 0)}
                    min={0}
                    placeholder="Amount received"
                    type="number"
                    prefix="$"
                  />
                </Form.Item>
              </div>
              <div className="flex justify-between">
                <Button className="w-[147px]" type="primary" htmlType="submit">
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
                  <label>$ {(total - amountReceived).toFixed(2)}</label>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 h-[250px] ">
              <div className="flex items-center gap-9">
                <img
                  onClick={() => setShowPartialPay(false)}
                  className="h-[15px] w-[15px] cursor-pointer"
                  src={backButtonIcon}
                  alt="back"
                />
                <span className="text-xl font-bold ">
                  Partial Payment Details
                </span>
              </div>
              <span className="_grey-color self-center">
                Please enter the following details.
              </span>
              <div className="flex gap-3 flex-col w-[250px] self-center">
                <Form.Item
                  label={<label className="font-bold">Amount:</label>}
                  name="amount"
                  required
                  tooltip="This is a required field"
                  rules={[{ required: true, validator: validatePrice }]}
                  className="mb-0"
                >
                  {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
                  {/* <Input className="_input" type="number" placeholder="0.00" prefix="$" /> */}

                  <div className="flex items-center justify-between gap-4">
                    <InputNumber
                      style={{ width: "100%" }}
                      min={1}
                      max={total - 1}
                      type="number"
                      placeholder="Enter amount"
                      prefix="$"
                    />
                  </div>
                </Form.Item>

                <div className="flex items-center justify-between gap-2">
                  <Form.Item
                    label={
                      <label className="font-bold whitespace-nowrap">
                        Due Date:
                      </label>
                    }
                    name="dueDate"
                    required
                    tooltip="This is a required field"
                    className="mb-0"
                  >
                    <DatePicker onChange={onChangeDate} />
                  </Form.Item>
                </div>

                {showPay && (
                  <>
                    <div className="flex justify-between">
                      <span className="w-48">
                        Total Remaining Amount on Due Date
                      </span>
                      <span>$70</span>
                    </div>

                    <Form.Item className="mb-0">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="text-center text-lg flex justify-center m-auto"
                      >
                        Pay
                      </Button>
                    </Form.Item>
                  </>
                )}
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CashPay;
