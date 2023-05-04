import React, { useState, useRef } from "react";
import unchecked from "../../../assets/icons/layout/unchecked.png";
import tabler_maximize from "../../../assets/icons/layout/tabler_maximize.png";
import Laptop from "../../../assets/images/dashboard/laptop.png";
import "../../../sass/modals.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Col, InputRef, Row, Select } from "antd";
import { Input, Space, Table, Button, Modal, Form, DatePicker } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import PreviewMax from "./preview-bulk-import";

import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { capitalize } from "../../../utils/functions/functions";
import { addPO } from "../../../store/po/po.slice";
import { values } from "@antv/util";
import { Toast } from "../../common/toast/toast";
import Payment from "./payment";
import dayjs from "dayjs";
import { setSelectedProductsToNull } from "../../../store/products/products-slice";

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
  setSeletedVendor,
  setDataForm,
}) => {
  const { vendors } = useAppSelector((state) => state.vendors);
  const [previewMaxmodalOpen, setPreviewMaxModalOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isPartialChecked, setIsPartialChecked] = useState(true);
  const [isFullyPaidChecked, setIsFullyPaidChecked] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [selectedChoiceOption, setSelectedChoiceOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState("cash");
  const [remainingPrice, setRemainingPrice] = useState<number>(0);
  const [enteredPrice, setEnteredPrice] = useState<number | undefined>();

  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const vendor = vendors.find((data: any) => {
    return data._id === newObject.vendorId;
  });

  // Getting Data when submitting form

  const myData = newObject?.products?.map(
    ({ name, quantity, amount }: any, index: any) => ({
      key: index,
      id: index + 1,
      name,
      quantity,
      price: `$${amount}`,
    })
  );

  const totalPrice = newObject?.products?.reduce(
    (accumulator: number, product: { amount: number; quantity: number }) => {
      return accumulator + product.amount * product.quantity;
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

  function handleSelect(value: any) {
    setSelectedChoiceOption(value);
  }

  const handlePartialChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsPartialChecked(isChecked);
    setIsFullyPaidChecked(!isChecked);
    setShowInput(false);
    setSelectedChoiceOption(null);
  };

  const handleFullyPaidChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsFullyPaidChecked(isChecked);
    setIsPartialChecked(!isChecked);
    form.resetFields();
  };

  const handleCheckboxChange = (option: any) => {
    setSelectedOption(option);
  };

  const priceChange = (e: any) => {
    const value = parseFloat(e.target.value);

    setEnteredPrice(value > totalPrice ? totalPrice : value);

    if (!isNaN(value) && e.target.value.trim() !== "") {
      setRemainingPrice(value);
    } else setRemainingPrice(0);
  };

  const handlePriceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const price = Number(`${enteredPrice}${e.key}`);
    const willExceedTotalPrice = price > totalPrice - remainingPrice;
    const willEqualTotalPrice = price === totalPrice - remainingPrice;
    if (willExceedTotalPrice && !willEqualTotalPrice && price !== totalPrice) {
      e.preventDefault();
    }
  };

  const handleFinish = async (values: any) => {
    let paidAmount;
    let payload: any = {
      ...newObject,
      paymentStatus:
        (isPartialChecked && "Partially Paid") ||
        (isFullyPaidChecked && "Paid"),
      paymentType: selectedChoiceOption ?? selectedOption,
      paymentDetails: {
        totalAmount: totalPrice,
      },
    };

    if (isFullyPaidChecked) {
      paidAmount = totalPrice;
    } else {
      paidAmount = Number(values?.price);
      let dueDate = values?.dueDate?.toISOString().substr(0, 10);

      payload.paymentDetails.dueDate = dayjs(dueDate).format("DD-MM-YYYY");
      if (payload.paymentDetails.totalAmount < paidAmount) {
        Toast("Total Balance is low", "error");
        return;
      }
    }
    payload.paymentDetails.paidAmount = paidAmount;
    payload.paymentDetails.remainingAmount = totalPrice - paidAmount;

    if (selectedChoiceOption === "check" && isPartialChecked) {
      payload.paymentTypeDetails = {
        checkNumber: values?.serial,
      };
    }

    if (selectedOption === "check" && isFullyPaidChecked) {
      payload.paymentTypeDetails = {
        checkNumber: values?.serial,
        routingNumber: "1231",
        accountNumber: "12313",
      };
    }

    // dispatch(addPO(payload));
    const res = await dispatch(addPO(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      setPreviewModalOpen(false);
      setSeletedVendor(null);
      setDataForm(null)
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

              {isPartialChecked && remainingPrice > 0 && (
                <div className="flex flex-col text-red-500  flex self-end ml-2">
                  Remaining amount: {(totalPrice - remainingPrice).toFixed(2)}
                </div>
              )}
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
                {/* <div className="_partial_price mt-4 flex justify-between"> */}
                <Row className="_partial_price mt-4 mb-1">
                  <Col xs={10} className="pt-2">
                    <label htmlFor="">Partial Payment Price</label>
                  </Col>
                  <Col xs={14}>
                    <Form.Item
                      // className="flex flex-col"
                      // label="Partial Payment Price"
                      rules={[
                        {
                          required: isPartialChecked,
                          validator: validatePrice,
                        },
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
                        value={enteredPrice}
                        onKeyPress={handlePriceKeyPress}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* </div> */}
                <Row className={`${!isPartialChecked && "mt-4"} mb-1`}>
                  <Col xs={10} className="pt-1">
                    <label htmlFor="">Due Date</label>
                  </Col>
                  <Col xs={14}>
                    <Form.Item
                      // label="Due Date"
                      rules={[{ required: isPartialChecked }]}
                      name="dueDate"
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        // className="sm:ml-[116px]"
                        onChange={handleDateChange}
                        value={dueDate}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                {/* <div  className={`${!isPartialChecked && "mt-4"}`}> */}

                {/* </div> */}
              </>
            )}

            {showInput && (
              <Row>
                <Col xs={10}>
                  <label htmlFor="" className="pt-2">
                    Payment Method
                  </label>
                </Col>
                <Col xs={14}>
                  <Form.Item name="inputField">
                    <Select
                      className="_input h-10 w-[50px]"
                      placeholder="Payment Method"
                      style={{ width: "280px" }}
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
                <Col xs={10} className="pt-2">
                  <label htmlFor="" className="_po_field_label">
                    Check Number
                  </label>
                </Col>
                <Col xs={14}>
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
                    <Col xs={10} className="pt-2">
                      <label htmlFor="" className="_po_field_label">
                        Check Number
                      </label>
                    </Col>
                    <Col xs={14}>
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
