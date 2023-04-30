import React, { useState, useRef } from "react";
import unchecked from "../../../assets/icons/layout/unchecked.png";
import tabler_maximize from "../../../assets/icons/layout/tabler_maximize.png";
import Laptop from "../../../assets/images/dashboard/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../../sass/modals.scss";
import { InputRef, Select } from "antd";
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
  const [remainingPrice, setRemainingPrice] = useState<number>();
  const [showInput, setShowInput] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [dueDate, setDueDate] = useState(null);

  const [selectedChoiceOption, setSelectedChoiceOption] = useState(null);

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
  };

  const handleFullyPaidChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsFullyPaidChecked(isChecked);
    setIsPartialChecked(!isChecked);

    setShowInput(false);
    setDueDate(null);
  };

  const handleFinish = async (values: any) => {
    let paidAmount;
    let payload: any = {
      vendorId,
      poducts: dataSource1,
      totalAmount: totalPrice,
    };
    if (isFullyPaidChecked) {
      paidAmount = totalPrice;
    } else {
      paidAmount = Number(values?.price);
      payload.dueDate = values?.dueDate.toISOString().substr(0, 10);
      if (payload?.totalAmount < paidAmount) {
        Toast("Total Balance is low", "error");
        return;
      }
    }
    payload.paidAmount = paidAmount;
    const res = await dispatch(addPOinBulk(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      setPreviewMaxModalOpen(false);
      dispatch(setImportModalOpen(false));
    }
  };

  const priceChange = (e: any) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && e.target.value.trim() !== '') {
      setRemainingPrice(totalPrice - value);
    } else {
      setRemainingPrice(totalPrice);
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

          <div
           className="flex flex-col text-red-500  flex self-end ml-2"
          >
            Remaining amount: {remainingPrice}
          </div>
          </div>

          {/* {<h1 className="text-right font-semibold mr-4 mt-6 text-[16px]">Total Amount: {totalPrice-paidAmount}</h1>} */}

          {/* <h1 className="text-right font-semibold mr-4 mt-6 text-[16px]">Total Amount: {totalPrice-paidAmount}</h1> */}
          <div className="_payment flex mt-4">
            <div>
              <p className="_payment_header ml-[13px]">Payment Method</p>
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
              <div className="_partial_price mt-4">
                <Form.Item
                  label="Partial Payment Price"
                  rules={[
                    { required: isPartialChecked, validator: validatePrice },
                  ]}
                  name="price"
                >
                  {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
                  <Input
                    onChange={(e) => priceChange(e)}
                    className="_input_field h-10 w-[280px]"
                    placeholder="0.00"
                    type="number"
                    prefix="$"
                  />
                </Form.Item>
              </div>
              <div className={`${!isPartialChecked && "mt-4"} flex flex-col`}>
                <Form.Item
                  label="Due Date"
                  rules={[{ required: isPartialChecked }]}
                  name="dueDate"
                >
                  <DatePicker
                    // className="sm:ml-[116px] xs:ml-4"
                    onChange={handleDateChange}
                    value={dueDate}
                  />
                </Form.Item>
              </div>
            </>
          )}

          {showInput && (
            <Form.Item label="Payment Method" name="inputField">
              <Select
                className="_input h-10 w-[50px]"
                placeholder="Payment Method"
                style={{ width: "280px" }}
                onChange={handleSelect}
              >
                <Select.Option value="Check">Check</Select.Option>
                <Select.Option value="Cash">Cash</Select.Option>
                <Select.Option value="CC">CC</Select.Option>
              </Select>
            </Form.Item>
          )}

          {selectedChoiceOption === "Check" && (
            <div>
              <Form.Item
                label={<span className="_po_field_label">Check Number</span>}
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
            </div>
          )}

          {!isPartialChecked && (
            <div
              className={`${!isPartialChecked && "mt-8"} flex flex-col ml-4`}
            >
              <Checkbox
                checked={selectedOption === "Check"}
                onChange={() => handleCheckboxChange("Check")}
              >
                By Check
              </Checkbox>

              {selectedOption === "Check" && (
                <div className="ml-4">
                  <Form.Item
                    label={
                      <span className="_po_field_label">Check Number</span>
                    }
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
                    />
                  </Form.Item>
                </div>
              )}
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


