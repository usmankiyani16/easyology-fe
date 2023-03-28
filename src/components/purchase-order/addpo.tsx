import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./addpo.scss";
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const AddPO = () => {
  return (
    <div>
      <h1 className="mt-4 text-[2rem]">Purchase Order</h1>

      <Form
        // labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        // style={{ maxWidth:  }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-4"
      >
        <div className="_parent_form grid lg:grid-cols-2 sm:grid-cols-1 sm:m-auto">
          {/* --------------- Grid 1 --------------------- */}

          <div className="_grid1_fields">
            <Form.Item
              label="Product Name"
              name="Product Name"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,

                  message: "Required Field",
                },
                {
                  type: "string",
                },
              ]}
            >
              <Input className="_input" placeholder="Enter Product Name" />
            </Form.Item>

            <Form.Item
              label="Product Price"
              name="  Price"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
              ]}
            >
              <Input className="_input" placeholder="Enter Product Price" />
            </Form.Item>
            <Form.Item
              label="Thresh"
              name="Select Thresh"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
                {
                  type: "string",
                },
              ]}
            >
              <Select className="_input select_input" placeholder="Select Thresh">
                <Select.Option value="15 days">15 days</Select.Option>
                <Select.Option value="30 days">30 days</Select.Option>
                <Select.Option value="45 days">45 days</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Upload"
              valuePropName="fileList"
              className="mt-[50px] ant-col-30"

            >
              <Upload
                action="/upload.do"
                listType="picture-card"

              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Product IMEI Number"
              name="IMEI Number"
              required
              tooltip="This is a required field"
              rules={[
                {
                  // type: 'number'
                },
              ]}
            >
              <Input className="_input" placeholder="Enter Product IMEI" />
            </Form.Item>

            <Form.Item
              label="Product Description"
              name="Product Description"
              required
              tooltip="This is a required field"
              rules={[
                {
                  // type: 'number'
                },
              ]}
            >
              <Input
                className="_input"
                placeholder="Enter Product Description"
              />
            </Form.Item>


          </div>

          {/*----------------- Grid 2 ---------------------------- */}

          <div className="_grid2_fields">
            <Form.Item
              label="Product Quality"
              name="Product Quality"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
              ]}
            >
              <Input className="_input" placeholder="Enter Product Quality" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="Product Category"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
              ]}
            >
              <Select className="_input" placeholder="Add or Select Category">
                <Select.Option value="Laptops">Laptops</Select.Option>
                <Select.Option value="Mobile Phones">
                  Mobile Phones
                </Select.Option>
                <Select.Option value="Ipads">Ipads</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Color"
              name="Product Color"
              required
              tooltip="This is a required field"
              rules={[
                {
                  // type: 'number'
                },
              ]}
            >
              <Input className="_input" placeholder="Specify Color" />
            </Form.Item>
            <Form.Item
              label="Product Size"
              name="Pruduct Size"
              required
              tooltip="This is a required field"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input className="_input" placeholder="Specify Size" />
            </Form.Item>

            {/* *!-------------------- Yaha s karna hai aaagy kaaaam ------------------------- */}

            <Form.Item
              label="Product Type"
              name="Pruduct Type"
              required
              tooltip="This is a required field"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input className="_input" placeholder="Specify Product Type" />
            </Form.Item>

            <Form.Item
              label="Product Serial #"
              name="Pruduct Serial #"
              required
              tooltip="This is a required field"
              rules={[
                {
                  type: "string",
                },
              ]}
            >
              <Input className="_input" placeholder="IMEI" />
            </Form.Item>

            <Form.Item
              label="Select Vendor"
              name="Select Vendor"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
                {
                  type: "string",
                },
              ]}
            >
              <Select className="_input" placeholder="Select Thresh">
                <Select.Option value="Ali Raza">Ali Raza</Select.Option>
                <Select.Option value="Hasan">Hasan</Select.Option>
                <Select.Option value="Ahmed">Ahmed</Select.Option>
              </Select>
            </Form.Item>


          </div>



        </div>

        <div className="_btn-footer flex justify-between mt-8">

          <div className="_import_btn">
            <Form.Item

            >
              <Button type="primary">
                Import
              </Button>
            </Form.Item>

          </div>



          <div className="_submit_btn mr-16">
            <Form.Item

            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </div>

        </div>
      </Form>
    </div>
  );
};

export default AddPO;
