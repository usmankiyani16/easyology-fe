import React, { useState } from "react";
import "../../../sass/modals.scss";
import "./add-customer.scss";

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

const AddCustomer: React.FC<any> = ({ isModalOpen, setIsModalOpen }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (value: any) => {
    setSelectedOption(value);
  };
  const onFinish = async (values: any) => {
    console.log(values);
  };
  const validateMobileNumber = (rule: any, value: string) => {
    const mobileNumberRegex = /^[0-9]{10,12}$/;
    return new Promise<void>((resolve, reject) => {
      if (!mobileNumberRegex.test(value)) {
        reject("Must be number between 10 to 12 digits");
      } else resolve();
    });
  };

  return (
    <div className="_modal_wrap _add-customer">
      <Modal
        footer={false}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
        width={selectedOption === "WholeSaler" ? 650 : ""}
      >
        <div className="m-auto">
          <h3 className="_modal_header_poView">Add Customer</h3>

          <Form
            // labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            // style={{ maxWidth:  }}
            onFinish={onFinish}
            autoComplete="off"
            // className="mt-6 mb-20"
            className={`mt-6 ${!selectedOption && "mb-20"}`}
          >
            <div
              className={`flex justify-center flex-col sm:items-center sm:m-auto`}
            >
              <Form.Item
                name="customerType"
                required
                tooltip={
                  <span className="_po_field_label">
                    This is a required field
                  </span>
                }
                rules={[
                  {
                    required: true,
                    // type: 'email',
                    message: <span>Required field</span>,
                  },
                ]}
              >
                <Select
                  className="_input_field"
                  placeholder="Select customer type"
                  onChange={handleSelect}
                  style={{ width: "300px" }}
                >
                  <Select.Option value="Retailer">Retailer</Select.Option>
                  <Select.Option value="WholeSaler">WholeSaler</Select.Option>
                </Select>
              </Form.Item>
            </div>

            {(selectedOption === "Retailer" ||
              selectedOption === "WholeSaler") && (
              <>
                <div
                  className={`flex justify-center flex-col ${
                    selectedOption !== "WholeSaler" && "items-center"
                  }  ${
                    selectedOption === "WholeSaler" &&
                    "grid sm:grid-cols-2 xs:grid-cols-1 m-auto gap-6"
                  }`}
                >
                  <div>
                    <Form.Item
                      className=""
                      label={
                        <span className="_po_field_label">First Name</span>
                      }
                      name="firstname"
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
                      name="lastname"
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
                      label={
                        <span className="_po_field_label">Phone Number</span>
                      }
                      name="phoneNumber"
                      required
                      tooltip="This is a required field"
                      rules={[{ validator: validateMobileNumber }]}
                    >
                      <Input
                        className="_input_field w-[300px] h-[40px]"
                        placeholder="Enter Phone Number"
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

                  <div>
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
                  </div>
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
      </Modal>
    </div>
  );
};

export default AddCustomer;
