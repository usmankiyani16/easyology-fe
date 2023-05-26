import React, { useState } from "react";
import "../../../../sass/modals.scss";

import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../../store/store";
import { addCustomer } from "../../../../store/customers/customers.slice";

const RetailerForm = ({
  selectedOption,
  setSelectedOption,
  validateMobileNumber,
  handleSelect,
  setIsModalOpen,
  setIsApiChange
}: any) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    values.role = "retailer";
    const res = await dispatch(addCustomer(values));
    if (res?.meta?.requestStatus === "fulfilled") {
      form.resetFields();
      setIsApiChange(true)
      setIsModalOpen(false)
    }
  };

  return (
    <div className="_customer-wrapper">
      <Form
        form={form}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        {selectedOption === "Retailer" && (
          <>
            <div
              className={`flex justify-center flex-col ${
                selectedOption !== "WholeSaler" && "items-center"
              } `}
            >
              <div>
                <Form.Item
                  className=""
                  label={<span className="_po_field_label">First Name</span>}
                  name="firstName"
                  required
                  tooltip="This is a required field"
                  rules={[
                    {
                      required: true,

                      message: "Required Field",
                    },
                    {
                      pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                      message: "Special characters not allowed",
                    },
                  ]}
                >
                  <Input
                    className="_input_field w-[300px] h-[40px]"
                    placeholder="Enter First Name"
                  />
                </Form.Item>

                <Form.Item
                  className=""
                  label={<span className="_po_field_label">Last Name</span>}
                  name="lastName"
                  required
                  tooltip="This is a required field"
                  rules={[
                    {
                      required: true,

                      message: "Required Field",
                    },
                    {
                      pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                      message: "Special characters not allowed",
                    },
                  ]}
                >
                  <Input
                    className="_input_field w-[300px] h-[40px]"
                    placeholder="Enter Last Name"
                  />
                </Form.Item>

                <Form.Item
                  className=""
                  label={<span className="_po_field_label">Phone Number</span>}
                  name="phoneNumber"
                  required
                  tooltip="This is a required field"
                  rules={[{ validator: validateMobileNumber }]}
                >
                  <Input
                    className="_input_field w-[300px] h-[40px]"
                    placeholder="Enter Phone Number"
                    type="number"
                  />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,

                      message: "Required Field",
                    },
                    {
                      type: "email",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    // sm:w-[320px] sm:h-[35px]
                    // className="sm:w-[379px] sm:h-[35px]"
                    className="_input_field w-[300px] h-[40px]"
                    placeholder="Enter email address"
                  />
                </Form.Item>

                <Form.Item
                  className=""
                  label={<span className="_po_field_label">Address</span>}
                  name="address"
                  required
                  tooltip="This is a required field"
                  rules={[
                    {
                      required: true,

                      message: "Required Field",
                    },
                  ]}
                >
                  <Input
                    className="_input_field w-[300px] h-[40px]"
                    placeholder="Enter Address"
                  />
                </Form.Item>
              </div>

              {/* <div>
                    {selectedOption === "WholeSaler" && (
                      <>
                        <Form.Item
                          className=""
                          label={
                            <span className="_po_field_label">Store Name</span>
                          }
                          name="storename"
                          required
                          tooltip="This is a required field"
                          rules={[
                            {
                              required: true,

                              message: "Required Field",
                            },
                            {
                              pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                              message: "Special characters not allowed",
                            },
                          ]}
                        >
                          <Input
                            className="_input_field w-[300px] h-[40px]"
                            placeholder="Enter Address"
                          />
                        </Form.Item>
                        <Form.Item
                          className=""
                          label={
                            <span className="_po_field_label ml-[10px]">
                              Tax Identification
                            </span>
                          }
                          name="taxIdentifier"
                        >
                          <Input
                            className="_input_field w-[300px] h-[40px]"
                            placeholder="Enter Tax"
                          />
                        </Form.Item>
                      </>
                    )}
                  </div> */}
            </div>
            <div className="flex justify-center">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-36 text-center text-lg"
                >
                  Add
                </Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default RetailerForm;
