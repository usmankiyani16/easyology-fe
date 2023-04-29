import React, { useState, useRef } from "react";
import unchecked from "../../../assets/icons/layout/unchecked.png";
import tabler_maximize from "../../../assets/icons/layout/tabler_maximize.png";
import Laptop from "../../../assets/images/dashboard/laptop.png";
import "../../../sass/modals.scss";
import { SearchOutlined } from "@ant-design/icons";
import { InputRef, Select } from "antd";
import { Input, Space, Table, Button, Modal, Form, DatePicker } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import PreviewMax from "./preview-max";

import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { capitalize } from "../../../utils/functions/functions";
import { addPO } from "../../../store/po/po.slice";
import { values } from "@antv/util";
import { Toast } from "../../common/toast/toast";
import Payment from "./payment";

interface DataType {
  key: string;
  id: string;
  // img: any;
  Productname: string;
  QTY: string;
  Price: number;
}

type DataIndex = keyof DataType;

const PreviewModal: React.FC<any> = ({
  previewmodalOpen,
  setPreviewModalOpen,
  newObject,
}) => {
  const { vendors } = useAppSelector((state) => state.vendors);
  const [previewMaxmodalOpen, setPreviewMaxModalOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const vendor = vendors.find((data: any) => {
    return data._id === newObject.vendorId;
  });

  // Getting Data when submitting form

  const myData = newObject?.products?.map(
    ({ name, quantity, price }: any, index: any) => ({
      key: index,
      id: index + 1,
      name,
      quantity,
      price: `$${price}`,
    })
  );

  const totalPrice = newObject?.products?.reduce(
    (accumulator: number, product: { price: number; quantity: number }) => {
      return accumulator + product.price * product.quantity;
    },
    0
  );


  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
    {
      dataIndex: "img",
      key: "image",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "age",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sortDirections: ["descend", "ascend"],
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_: any, record: any) => (
    //     <div onClick={() => handleDeleteChange(record)}>Delete This Record</div>
    //   )
    // },
  ];

  const [isPartialChecked, setIsPartialChecked] = useState(true);
  const [isFullyPaidChecked, setIsFullyPaidChecked] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [selectedChoiceOption, setSelectedChoiceOption] = useState(null);

  function handleSelect(value: any) {
    setSelectedChoiceOption(value);
  }



  const [remainingPrice, setRemainingPrice] = useState<number>();

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

  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (option: any) => {
    setSelectedOption(option);
    console.log(option);
  };

  const priceChange = (e: any) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && e.target.value.trim() !== '') {
      setRemainingPrice(totalPrice - value);
    } else {
      setRemainingPrice(totalPrice);
    }
  };

  const handleFinish = async (values: any) => {
    newObject.poducts = newObject.products;
    delete newObject.products;
    let paidAmount;
    let payload: any = {
      ...newObject,
      totalAmount: totalPrice,
    };
    if (isFullyPaidChecked) {
      paidAmount = totalPrice;
    } else {
      paidAmount = Number(values?.price);
      payload.dueDate = values?.dueDate?.toISOString().substr(0, 10);
      if (payload.totalAmount < paidAmount) {
        Toast("Total Balance is low", "error");
        return;
      }
    }
    payload.paidAmount = paidAmount;
    console.log('payload--', payload)
    // const res = await dispatch(addPO(payload));
    // if (res?.meta?.requestStatus === "fulfilled") {
    //   setPreviewModalOpen(false);
    // }
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

  return (
    <div>
      <PreviewMax
        previewMaxmodalOpen={previewMaxmodalOpen}
        setPreviewMaxModalOpen={setPreviewMaxModalOpen}
        previewmodalOpen={previewmodalOpen}
        setPreviewModalOpen={setPreviewModalOpen}
      />

      <Modal
        footer={false}
        centered
        open={previewmodalOpen}
        onCancel={() => setPreviewModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <h3 className="_modal_header_poView">Purchase Order Overview</h3>

        <div className="_preview_po mt-6">
          <div className="m-4">
            <p className="_modal_para">
              Vendor Name:{" "}
              <span className="text-stone-400 font-bold ml-2">
                {capitalize(vendor?.name)}
              </span>
            </p>
            {/* <p className="_modal_para">
              PO Number : <span className="text-red-500 ml-4"> #456 </span>
            </p> */}
          </div>

          <Table
            columns={columns}
            dataSource={myData}
            className="mt-4"
            pagination={false}
            scroll={{ y: 120 }}
          />
          <div className="_footer flex justify-between mb-6">
            <div>
              <p className="ml-4 mb-6 text-lg">Total PO</p>
            </div>
            <div>
              <p className="text-red-500 mr-4 text-lg"> {"$" + totalPrice}</p>
            </div>
          </div>
        </div>

        {/* <Payment /> */}

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
            <div className="_payment flex justify-between">
              <div>
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
              <div className="flex items-center">
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
                      className="_input_field h-10 w-[280px] sm:ml-10 xs:ml-0"
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
                      className="sm:ml-[116px] xs:ml-4"
                      onChange={handleDateChange}
                      value={dueDate}
                    />
                  </Form.Item>
                </div>

              
              </>
            )}

{/* {showInput && (
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
          )} */}

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
              <Button type="primary" htmlType="submit" className="mt-4">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PreviewModal;
