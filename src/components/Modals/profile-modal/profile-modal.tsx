import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Upload, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import profileupload from '../../../assets/icons/layout/profile-upload.png'

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Profilemodal: React.FC<any> = ({profilemodalOpen,setProfileModalOpen,}) => {
  return (
    <div className="_modal_wrap">
      <Modal
        width='372px'
        footer={false}
        centered
        open={profilemodalOpen}
        onCancel={() => setProfileModalOpen(false)}
        destroyOnClose={true}
      >
        <span className="_modal_logout">Logout</span>{" "}
        <h3 className="_modal_header">Profile</h3>
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
              multiple={false}
              maxCount={1}
            >
              <div>
                {/* <PlusOutlined /> */}
                {/* <div style={{ marginTop: 8 }}>Upload Image</div> */}
                <img src={profileupload} alt="" />

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
            <Input
              className="_input_username  h-[31px] w-[128px] ml-[10px]"
              placeholder="Enter Username"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profilemodal;
