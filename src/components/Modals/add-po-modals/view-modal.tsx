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

const Viewmodal: React.FC<any> = ({viewModalOpen,setViewModalOpen,}) => {
  return (
    <div className="_modal_wrap">
      <Modal
        width='372px'
        footer={false}
        centered
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        destroyOnClose={true}
      >
     
        <h3 className="_modal_header">View Modal</h3>

        <h4 className="text-red-500 mt-8 text-center">Kaam Karna hai is pr !</h4>

        <div className="grid grid-cols-3">
          <div>
            <p>Hello</p>

          </div>
          <div>
            <p>Bello</p>
            
          </div>
          <div>
            <p>Shello</p>

          </div>
        </div>
       
      </Modal>
    </div>
  );
};

export default Viewmodal;
