import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const AddCategoryModal: React.FC<any> = ({ catmodalOpen, setCatModalOpen }) => {
  return (
    <div className="_modal_wrap">
      
      <Modal
        footer={false}
        centered
        open={catmodalOpen}
        onCancel={() => setCatModalOpen(false)}
        destroyOnClose={true}
      >
        <h3 className="_modal_header_poView">Add Category</h3>

        <Form
          // labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="mt-8"
        >
          <Form.Item
            label="Category"
            name="Category Name"
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
            <Input className="h-[40px]" placeholder="Enter Category Name" />
          </Form.Item>

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
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
