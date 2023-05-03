import React, { useState } from "react";
import "../../../sass/modals.scss";

import { Button, Modal, Form, Input, Select, Row , Col } from "antd";



const AddCustomer: React.FC<any> = ({isModalOpen,setIsModalOpen}) => {
  const onFinish = async (values: any) => {
        console.log(values);
  }

  return (
    <div>
      <Modal
      
        footer={false}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
          <div className="m-auto ">
        <h3 className="_modal_header_poView">Add Customer</h3>

        <Form
          // labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          autoComplete="off"
          className="mt-8"
        >

        
<div className="flex justify-center flex-col items-center">
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
              <Input className="_input_field w-[300px] h-[40px]" placeholder="Enter Product Name" />
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
              <Input className="_input_field w-[300px] h-[40px]" placeholder="Enter Product Name" />
            </Form.Item>
            <Form.Item
              className=""
              label={<span className="_po_field_label">Product Name</span>}
              name="product"
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
              <Input className="_input_field w-[300px] h-[40px]" placeholder="Enter Product Name" />
            </Form.Item>
            <Form.Item
              className=""
              label={<span className="_po_field_label">Product Name</span>}
              name="product"
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
              <Input className="_input_field w-[300px] h-[40px]" placeholder="Enter Product Name" />
            </Form.Item>

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
        </Form>

        </div>
      </Modal>
    </div>
  );
};

export default AddCustomer;
