import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Upload, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Profilemodal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Profile Modal
      </Button>
      <Modal centered open={modalOpen} onCancel={() => setModalOpen(false)}>
        <h3 className="text-center text-2xl">Profile</h3>

        <Form
          // labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="mt-4"
        >
          <Form.Item
            label="Profile Picture"
            valuePropName="fileList"
            className="mt-[50px]"
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              className="ml-4"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Username"
            name="Username"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,

                message: "Required Field",
              },
             /*  {
                pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                message: "Special characters not allowed",
              }, */
            ]}
          >
            <Input className="h-[40px]" placeholder="Enter Username" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Profilemodal;
