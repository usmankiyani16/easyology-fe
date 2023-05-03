import React, { useState, useRef } from "react";
import unchecked from "../../../assets/icons/layout/unchecked.png";
import tabler_maximize from "../../../assets/icons/layout/tabler_maximize.png";
import Laptop from "../../../assets/images/dashboard/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../../sass/modals.scss";
import { Col, InputRef, Row, Select } from "antd";
import {
  Input,
  Space,
  Table,
  Button,
  Modal,
  Form,
  DatePickerProps,
  DatePicker,
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import PreviewMax from "./preview-bulk-import";

import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { capitalize } from "../../../utils/functions/functions";
import { addPOinBulk, setImportModalOpen } from "../../../store/po/po.slice";
import { Toast } from "../../common/toast/toast";
import dayjs from "dayjs";

const Payment: React.FC<any> = ({
  dataSource1,
  totalPrice,
  vendorId,
  setPreviewMaxModalOpen,
}) => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const [isPartialChecked, setIsPartialChecked] = useState(true);
  const [isFullyPaidChecked, setIsFullyPaidChecked] = useState(false);
  // const [remainingPrice, setRemainingPrice] = useState<number>();
  const [showInput, setShowInput] = useState(false);
  const [remainingPrice, setRemainingPrice] = useState<number>(0);

  const [selectedOption, setSelectedOption] = useState("cash");
  const [dueDate, setDueDate] = useState(null);

  const [selectedChoiceOption, setSelectedChoiceOption] = useState(null);
  const [enteredPrice, setEnteredPrice] = useState<number | undefined>();

  function handleSelect(value: any) {
    setSelectedChoiceOption(value);
  }

  const handleCheckboxChange = (option: any) => {
    setSelectedOption(option);
    console.log(option);
  };

  const handlePartialChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsPartialChecked(isChecked);
    setIsFullyPaidChecked(!isChecked);
    form.resetFields();
  };

  const handleFullyPaidChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsFullyPaidChecked(isChecked);
    setIsPartialChecked(!isChecked);
    setShowInput(false);
    setSelectedChoiceOption(null);
    setDueDate(null);
  };

  const handleFinish = async (values: any) => {
    let paidAmount;
    let payload: any = {
      vendorId,
      products: dataSource1,
      paymentDetails: {},
      paymentType: selectedChoiceOption ?? selectedOption,
    };
    if (isFullyPaidChecked) {
      paidAmount = totalPrice;
    } else {
      paidAmount = Number(values?.price);
      let dueDate = values?.dueDate.toISOString().substr(0, 10);
      payload.paymentDetails.dueDate = dayjs(dueDate).format("MM-DD-YYYY");
      if (payload?.totalAmount < paidAmount) {
        Toast("Total Balance is low", "error");
        return;
      }
    }
    payload.paymentStatus =
      (isPartialChecked && "Partially Paid") || (isFullyPaidChecked && "Paid");
    payload.paymentDetails = {
      ...payload.paymentDetails,
      totalAmount: totalPrice,
      // discount: 0,
      // salesTax: 0,
      paidAmount,
      remainingAmount: totalPrice - paidAmount,
    };
    if (selectedChoiceOption === "check" && isPartialChecked) {
      payload.paymentTypeDetails = {
        checkNumber: values?.serial,
        routingNumber: "1231",
        accountNumber: "12313",
      };
    }

    if (selectedOption === "check" && isFullyPaidChecked) {
      payload.paymentTypeDetails = {
        checkNumber: values?.serial,
        routingNumber: "1231",
        accountNumber: "12313",
      }
    }

    console.log("payload =============> ", payload);
    const res = await dispatch(addPOinBulk(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      setPreviewMaxModalOpen(false);
      dispatch(setImportModalOpen(false));
    }
  };

  const priceChange = (e: any) => {
    const value = parseFloat(e.target.value);
    setEnteredPrice(value > totalPrice ? totalPrice : value);
    if (!isNaN(value) && e.target.value.trim() !== "") {
      setRemainingPrice(value);
    } else setRemainingPrice(0);
  };

  const handlePriceKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const price = Number(`${enteredPrice}${e.key}`);
    const willExceedTotalPrice = price > totalPrice - remainingPrice;
    const willEqualTotalPrice = price === totalPrice - remainingPrice;
    if (willExceedTotalPrice && !willEqualTotalPrice && price !== totalPrice) {
      e.preventDefault();
    }
  };

  // Price Validator

  const validatePrice = (rule: any, value: string) => {
    const price = parseFloat(value);
    if (isNaN(price)) {
      return Promise.reject("Please enter a valid quantity");
    } else if (price <= 0) {
      return Promise.reject("Quantity must be greater than zero");
    } else {
      return Promise.resolve();
    }
  };

  const handleDateChange = (date: any) => {
    // Check if a date is selected
    if (date) {
      setShowInput(true);
    } else {
      setShowInput(false);
    }
    setDueDate(date);
  };


  return (
    <div>
      <Form form={form} onFinish={handleFinish}>
        <div className="_footer_modal mt-4">
          <div className="flex justify-between">
            <h1 className=" font-semibold mr-4 text-[16px]">
              Total Amount: {totalPrice}
            </h1>

            {/*   className={`${
              !isPartialChecked && "mt-6"
            } */}

            {isPartialChecked && remainingPrice > 0 && (
              <div className="flex flex-col text-red-500  flex self-end ml-2">
                Remaining amount: {(totalPrice - remainingPrice).toFixed(2)}
              </div>
            )}
          </div>

          {/* {<h1 className="text-right font-semibold mr-4 mt-6 text-[16px]">Total Amount: {totalPrice-paidAmount}</h1>} */}

          {/* <h1 className="text-right font-semibold mr-4 mt-6 text-[16px]">Total Amount: {totalPrice-paidAmount}</h1> */}
          <div className="_payment flex gap-24 mt-4">
            <div>
              {/*  ml-[13px] */}
              <p className="_payment_header">Payment Method</p>
            </div>
            
            <div className="flex items-center">
              <Checkbox
                checked={isPartialChecked}
                onChange={handlePartialChange}
                className="mr-24"
              >
                <p>Partial</p>
              </Checkbox>
            </div>
            <div className="flex gap-6 items-center">
              <Checkbox
                checked={isFullyPaidChecked}
                onChange={handleFullyPaidChange}
              >
                <p>Fully Paid</p>
              </Checkbox>{" "}
            </div>
           
          </div>
          {isPartialChecked && (
            <>
              {/* <div className="_partial_price mt-4"> */}
              <Row className="_partial_price mt-4 mb-1">
                <Col xs={6} className="pt-2">
                  <label htmlFor="">Partial Payment Price</label>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    // label=""
                    rules={[
                      { required: isPartialChecked, validator: validatePrice },
                    ]}
                    name="price"
                  >
                    <Input
                      onChange={(e) => priceChange(e)}
                      className="_input_field h-10 w-[280px]"
                      placeholder="0.00"
                      type="number"
                      prefix="$"
                      style={{ width: "100%" }}
                      value={enteredPrice}
                      onKeyPress={handlePriceKeyPress}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* </div> */}
              {/* <div className={`${!isPartialChecked && "mt-4"} flex flex-col`}> */}
              <Row className="_partial_price mt-4 mb-1">
                <Col xs={6} className="pt-1">
                  <label htmlFor="">Due Date</label>
                </Col>
                <Col xs={10}>
                  <Form.Item
                    // label=""
                    rules={[{ required: isPartialChecked }]}
                    name="dueDate"
                  >
                    <DatePicker
                      onChange={handleDateChange}
                      value={dueDate ?? null}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* </div> */}
            </>
          )}

          {dueDate && isPartialChecked && (
            <Row>
              <Col xs={6} className="pt-3">
                <label htmlFor="">Payment Method</label>
              </Col>
              <Col xs={10}>
                <Form.Item name="inputField">
                  <Select
                    // w-[50px]
                    className="_input h-6 "
                    placeholder="Payment Method"
                    style={{ width: "100%" }}
                    onChange={handleSelect}
                  >
                    <Select.Option value="check">Check</Select.Option>
                    <Select.Option value="cash">Cash</Select.Option>
                    <Select.Option value="CC">CC</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}

          {selectedChoiceOption === "check" && isPartialChecked && (
            <Row>
              <Col xs={6}>
                <label htmlFor="" className="_po_field_label">
                  Check Number
                </label>
              </Col>
              <Col xs={10}>
                <Form.Item
                  // label={<span className="_po_field_label">Check Number</span>}
                  name="serial"
                  required
                  tooltip="This is a required field"
                  rules={[
                    {
                      required: true,
                      // type: 'email',
                      message: "Required field",
                    },
                  ]}
                >
                  <Input
                    className="_input_field w-[280px]"
                    placeholder="Check Number"
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {!isPartialChecked && (
            <div
              className={`${!isPartialChecked && "mt-8"} flex flex-col ml-4`}
            >
              <Checkbox
                checked={selectedOption === "cash"}
                onChange={() => handleCheckboxChange("cash")}
              >
                By Cash
              </Checkbox>
              <Checkbox
                checked={selectedOption === "cc"}
                onChange={() => handleCheckboxChange("cc")}
              >
                By CC
              </Checkbox>
              <Checkbox
                checked={selectedOption === "check"}
                onChange={() => handleCheckboxChange("check")}
              >
                By Check
              </Checkbox>

              {selectedOption === "check" && (
                // <div className="ml-4">
                <Row>
                  <Col xs={6} className="pt-2">
                    <label htmlFor="" className="_po_field_label">
                      Check Number
                    </label>
                  </Col>
                  <Col xs={10}>
                    <Form.Item
                      // label={
                      //   <span className="_po_field_label">Check Number</span>
                      // }
                      name="serial"
                      required
                      tooltip="This is a required field"
                      rules={[
                        {
                          required: true,
                          // type: 'email',
                          message: "Required field",
                        },
                      ]}
                    >
                      <Input
                        className="_input_field w-48"
                        placeholder="Check Number"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                // </div>
              )}
            </div>
          )}

          <br />

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Payment;
