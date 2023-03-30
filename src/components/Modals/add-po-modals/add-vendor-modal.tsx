import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const AddVendorModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Add Vendor
      </Button>
      <Modal centered open={modalOpen} onCancel={() => setModalOpen(false)}>
        <h3 className="text-center text-2xl">Add Vendor</h3>

        <Form
          // labelCol={{ span: 4 }}
        //   wrapperCol={{ span: 14 }}
          layout="vertical"
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="_vendor_container grid grid-cols-2 gap-8">

            {/* --------------------- Grid 1 in Form------------------------ */}

            <div className="_grid1_vendor">
              <Form.Item
                label="User name"
                name="User name"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                
                ]}
              >
                <Input className="h-[40px]" placeholder="Enter User Name" />
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="Company Name"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                
                ]}
              >
                <Input className="h-[40px]" placeholder="Enter company Name" />
              </Form.Item>
            </div>


            {/* ------------------------- Grid 2 in Form --------------------------- */}

            <div className="_grid2_vendor">
              <Form.Item
                label="Email"
                name="Email"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                  {
                    type:"email" 
                  }
                 
                ]}
              >
                <Input className="h-[40px]" placeholder="ABC@gmail.com"/>
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="Mobile Number"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                 
               
                ]}
              >
                <Input className="h-[40px]" placeholder="1234-1234-1234" />
              </Form.Item>
            </div>
          </div>
          
          <Form.Item
                label="Company Address"
                name="Company Address"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                  
                ]}
              >
                <Input className="h-[40px]" placeholder="Street # 4, Clock tower  2nd floor near hens toy shop. TX"/>
              </Form.Item>


          <div className="flex justify-center">
            <Form.Item>

        {/* ----------------- Button -------------------------- */}

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
    </>
  );
};

export default AddVendorModal;
