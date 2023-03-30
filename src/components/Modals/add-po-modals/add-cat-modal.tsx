import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const AddCategoryModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Add Category
      </Button>
      <Modal centered open={modalOpen} onCancel={() => setModalOpen(false)}>
        <h3 className="text-center text-2xl">Add Category</h3>

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
              <Button type="primary" htmlType="submit" className="w-36 text-center text-lg">
                Add
              </Button>
            </Form.Item>
          </div>


        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
