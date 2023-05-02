import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Modal,
  
} from "antd";
import React, { useState , useRef} from "react";
import { backButtonIcon } from "../../../../assets/icons";

const CashPay: React.FC<any> = ({ total, isCashPayOpen, setCashPayOpen }) => {
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [showOkButton, setShowOkButton] = useState(false);

  const [showPartialPay, setShowPartialPay] = useState<boolean>(false);
  const [showPay, setShowPay] = useState<boolean>(false);
  const datePickerRef = useRef();
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

  const handleOkClick = () => {
    setShowOkButton(false);
    setCashPayOpen(false);
  };

  const handleback = () => {
    setShowPartialPay(false)
    setShowPay(false)
   /*  if (datePickerRef.current) {
      datePickerRef.current.picker.input.value = '';
    } */
  }
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
            <div className="flex flex-col gap-4 h-[280px]">
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
                <Button
                  disabled={Number(amountReceived) <= 0}
                  className="w-[147px]"
                  type="primary"
                  htmlType="submit"
                  onClick={() => setShowOkButton(true)}
                >
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
                <div className="text-xl text-semibold flex gap-3 self-center flex-col">
                  <div>
                    <label>Change</label>
                    <label>$ {(total - amountReceived).toFixed(2)}</label>
                  </div>
                </div>
              )}

              {showOkButton && (

                <div className="flex justify-center">
                <Button
                  className="_bg-primary-color _white-color m-auto"
                  onClick={handleOkClick}
                >
                  OK
                </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 h-[280px] ">
              <div className="flex items-center gap-9">
                <img
                  onClick={handleback}
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
                  label={<label className="font-bold">Amount</label>}
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
                      onChange={(value) => setAmount(value || 0)}
                    />
                  </div>
                </Form.Item>

                <div className="flex items-center justify-between gap-2">
                  <Form.Item
                    label={
                      <label className="font-bold whitespace-nowrap">
                        Due Date
                      </label>
                    }
                    name="dueDate"
                    required
                    tooltip="This is a required field"
                    className="mb-0"
                  >
                    {/* ref={datePickerRef} */}
                    <DatePicker onChange={onChangeDate}  />
                  </Form.Item>
                </div>

                {showPay && (
                  <>
                    <div className="flex justify-between">
                      <span className="w-40">Total Remaining Amount</span>
                      <span className="whitespace-nowrap">$ {(total - amount).toFixed(2)}</span>
                    </div>

                    <Form.Item className="mb-0">
                      <Button
                        disabled={Number(amount) <= 0}
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
