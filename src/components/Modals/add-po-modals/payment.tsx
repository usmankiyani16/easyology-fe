import React, { useState, useRef } from "react";
import unchecked from "../../../assets/icons/layout/unchecked.png";
import tabler_maximize from "../../../assets/icons/layout/tabler_maximize.png";
import Laptop from "../../../assets/images/dashboard/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../modals.scss";
import type { InputRef } from "antd";
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
import PreviewMax from "./preview-max";

import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { capitalize } from "../../../utils/functions/functions";
import { addPOinBulk } from "../../../store/po/po.slice";


const Payment: React.FC<any> = ({ dataSource1, totalPrice, vendorId, setPreviewMaxModalOpen }) => {

  const [form] = Form.useForm();

  const dispatch = useAppDispatch()

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
  };
  const [isPartialChecked, setIsPartialChecked] = useState(true);
  const [isFullyPaidChecked, setIsFullyPaidChecked] = useState(false);

  const handlePartialChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsPartialChecked(isChecked);
    setIsFullyPaidChecked(!isChecked);
  };

  const handleFullyPaidChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsFullyPaidChecked(isChecked);
    setIsPartialChecked(!isChecked);
  };

  const handleFinish = async (values: any) => {
    // Handle the edited data
    // console.log('dataSource1==========', dataSource1);
    let paidAmount
    if (isFullyPaidChecked) {
      paidAmount = totalPrice
    } else paidAmount = Number(values.price)
    let payload = {
      vendorId,
      poducts: dataSource1,
      totalAmount: totalPrice,
      paidAmount,
      dueDate: values.dueDate.toISOString().substr(0, 10)
    }
    console.log('payload-------->>>', payload)
    const res = await dispatch(addPOinBulk(payload))
    if (res?.meta?.requestStatus === 'fulfilled') {
      setPreviewMaxModalOpen(false)
    }
  };





  return (
    <div>
      <Form form={form} onFinish={handleFinish}>

        <div className="_footer_modal mt-4">
          <h1 className="text-right font-semibold mr-4 mt-6 text-[16px]">Total Amount: {totalPrice}</h1>
          <div className="_payment flex">
            <div>
              <p className="_payment_header ml-[13px]">Payment Method</p>
            </div>
            <div className="flex items-center">
              <Checkbox checked={isPartialChecked} onChange={handlePartialChange} className="mr-24">
                <p>Partial</p>
              </Checkbox></div>
            <div className="flex gap-6 items-center">

              <Checkbox checked={isFullyPaidChecked} onChange={handleFullyPaidChange}>
                <p>Fully Paid</p>
              </Checkbox> </div>
          </div>
          {isPartialChecked &&
            <div className="_partial_price mt-4">
              <Form.Item className="font-semibold" rules={[{ required: isPartialChecked }]} label="Partial Payment Price" name="price">
                {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
                <Input
                  className="_input h-10 w-[280px] sm:ml-10 xs:ml-0"
                  placeholder="$0.00"
                  type="number"
                />
              </Form.Item>
            </div>
          }

          <div className={`${!isPartialChecked && 'mt-4'}`}>
            <Form.Item className="font-semibold" rules={[{ required: true }]} label="Due Date" name="dueDate">
              <DatePicker
                onChange={onChange}
                className=" sm:ml-[116px] xs:ml-4"
              />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>

      </Form >

    </div >
  )
}

export default Payment
