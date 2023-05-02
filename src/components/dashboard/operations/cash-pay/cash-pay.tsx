import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  InputNumber,
  Modal,
} from "antd";
import React, { useState } from "react";
import { backButtonIcon } from "../../../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  addOrder,
  getInvoiceNumber,
  holdInvoice,
} from "../../../../store/order/order-slice";
import { setSelectedProductsToNull } from "../../../../store/products/products-slice";
enum paymentStatusE {
  PAID = "Paid",
  PARTIALLY_PAID = "Partially Paid",
}
const CashPay: React.FC<any> = ({
  totalPrice,
  total,
  isCashPayOpen,
  setCashPayOpen,
  selectCustomer,
  setSelectCustomer,
  discount,
  salesTax,
}) => {
  const dispatch = useAppDispatch();
  const { invoiceNumber } = useAppSelector((state) => state.order);
  const { selectedProducts } = useAppSelector((state) => state.products);
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [showOkButton, setShowOkButton] = useState(true);
  const [showPartialPay, setShowPartialPay] = useState<boolean>(false);
  const [showPay, setShowPay] = useState<boolean>(false);
  console.log("selectCustomer", selectCustomer);

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

  const handleCashPay = async (paymentStatus: string) => {
    const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
    const storeId = data?.storeId;
    let products = selectedProducts?.map((prod: any) => ({
      productId: prod?._id,
      variantId: prod?.variants?._id,
      quantity: prod?.quantity,
      stockId: prod?.variants?.stock?._id,
    }));
    let payload: any = {
      storeId,
      userId: data?._id,
      customerId: selectCustomer?._id,
      orderNumber: invoiceNumber,
      paymentStatus,
      paymentDetails: {
        subTotalAmount: totalPrice,
        discount: discount,
        salesTax,
        totalAmount: total,
        paidAmount: total,
      },
      paymentType: "cash",
      products,
    };
    if (paymentStatusE.PARTIALLY_PAID) {
      payload.paymentDetails.paidAmount = 12;
    }
    const res = await dispatch(addOrder(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getInvoiceNumber());
      // dispatch(setSelectedProductsToNull());
      // setSelectCustomer(null);
    }
  };
  const handleOkClick = () => {
    setShowOkButton(false); // set showOkButton to false when OK button is clicked
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
                  onClick={() => handleCashPay(paymentStatusE.PAID)}
                  disabled={
                    Number(amountReceived) <= 0 ||
                    Number(amountReceived) < total
                  }
                  className="w-[147px]"
                  type="primary"
                  htmlType="submit"
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

              {amountReceived >= total && showOkButton && (
                <div className="text-xl text-semibold flex gap-3 self-center flex-col">
                  <div>
                    <label>Change</label>
                    <label>$ {(total - amountReceived).toFixed(2)}</label>
                  </div>
                  <Button
                    className="_bg-primary-color _white-color hover:_white-color"
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
                      onChange={(value) => setAmount(value || 0)}
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
                      <span className="w-48">Total Remaining Amount</span>
                      <span>$ {(total - amount).toFixed(2)}</span>
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
