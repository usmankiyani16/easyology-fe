import React, { useState } from "react";
import "../../../../sass/modals.scss";
import uploadIcon from "../../../../assets/icons/layout/upload-icon.png";
import "./forms.scss";

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
import UploadImage from "../../../common/upload-image/upload-image";

const WholeSalerForm = ({
  selectedOption,
  setSelectedOption,
  validateMobileNumber,
  handleSelect,
  setIsModalOpen,
  setIsApiChange,
}: any) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [drivingLicence, setDrivingLicence] = useState(true);
  const [taxIdFile, setTaxIdFile] = useState(true);

 

  const onFinish = async (values: any) => {
     values.picTaxId = taxIdFile ?? '';
      values.picDl = drivingLicence ?? '';
    values.role = "wholesaler";
    const res = await dispatch(addCustomer(values));
    if (res?.meta?.requestStatus === "fulfilled") {
      form.resetFields();
      setIsApiChange(true);
      setIsModalOpen(false);
    }

    // console.log(sh)
  };

  return (
    <div>
      <Form
        form={form}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        // style={{ maxWidth:  }}
        onFinish={onFinish}
        autoComplete="off"
        // className="mt-6 mb-20"
        className={`${!selectedOption && "mb-20"}`}
      >
        {selectedOption === "WholeSaler" && (
          <>
            <div
              className={`flex justify-center flex-col
              } `}
            >
              <div>
                <div className="grid xs:grid-cols-1 md:grid-cols-2 md:gap-4">
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
                </div>

                <Form.Item
                  className=""
                  label={<span className="_po_field_label">Store Address</span>}
                  name="storeAddress"
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
                    className="_input_field xs:w-[300px] md:w-[620px] h-[40px]"
                    placeholder="Enter Store Address"
                  />
                </Form.Item>

                <div className="grid xs:grid-cols-1 md:grid-cols-2 md:gap-4">
                  <Form.Item
                    className=""
                    label={<span className="_po_field_label">Store Name</span>}
                    name="storeName"
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
                      placeholder="Enter Store Name"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="_po_field_label">Email Address</span>
                    }
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
                </div>

                <div className="grid xs:grid-cols-1 md:grid-cols-2 md:gap-4">
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
                    label={
                      <span className="_po_field_label">Tax Identificaion</span>
                    }
                    name="taxId"
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
                      placeholder="Tax Identification"
                    />
                  </Form.Item>
                </div>
                <div className="grid xs:grid-cols-1 md:grid-cols-2 md:gap-4">
                  <Form.Item
                    label={
                      <span className="_po_field_label">Driving License</span>
                    }
                    name="picDl"
                    valuePropName="drivinglicense"
                  >
                   
                    <UploadImage
                     
                     setImageValue={setDrivingLicence}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="_po_field_label">Tax ID</span>}
                    name="taxId"
                    valuePropName="taxId"
                    className=""
                  >
                    <UploadImage
                      setImageValue={setTaxIdFile}
                    />
                  </Form.Item>
                </div>
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
  );
};

export default WholeSalerForm;
