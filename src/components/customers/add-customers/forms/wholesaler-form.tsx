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

const WholeSalerForm = ({
  selectedOption,
  setSelectedOption,
  validateMobileNumber,
  handleSelect,
}: any) => {
  const [showDrivingLicence, setshowDrivingLicence] = useState(true);
  const [showtaxIdFile, setShowTaxIdFile] = useState(true);

  const imageUpload = async (e: any, state?: any) => {
    const file = e?.file;
    delete file?.uid;
    if (state === "drivingLicense") {
      setshowDrivingLicence(!showDrivingLicence);
    } else {
      setShowTaxIdFile(!showtaxIdFile);
    }
  };

  //   const imageUpload2 = async (e: any) => {
  //     const file = e?.file;
  //     delete file?.uid;
  //     setTaxIdFile(!taxIdFile);
  //   };

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Form
        // labelCol={{ span: 4 }}
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
                    name="drivinglicense"
                    valuePropName="drivinglicense"
                  >
                    <Upload
                      className="alin"
                      beforeUpload={() => false}
                      onChange={(e) => imageUpload(e, "drivingLicense")}
                      action=""
                      listType="picture-card"
                      multiple={false}
                      maxCount={1}
                      showUploadList={{
                        showPreviewIcon: false,
                      }}
                      accept="image/*"
                    >
                      {showDrivingLicence && (
                        <div>
                          <img src={uploadIcon} alt="" />
                        </div>
                      )}
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    label={<span className="_po_field_label">Tax ID</span>}
                    name="taxId"
                    valuePropName="taxId"
                    className=""
                  >
                    <Upload
                      //   className="_input_field w-[600px] h-[70px]"
                      beforeUpload={() => false}
                      // onChange={(e) => ali(e)}
                      // onChange={(e) => handleTaxIdUpload(e)}
                      onChange={(e) => imageUpload(e, "taxId")}
                      action=""
                      listType="picture-card"
                      multiple={false}
                      maxCount={1}
                      showUploadList={{
                        showPreviewIcon: false,
                      }}
                      accept="image/*"
                    >
                      {showtaxIdFile && (
                        <div>
                          <img src={uploadIcon} alt="" />
                        </div>
                      )}
                    </Upload>
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
