import React from "react";
import cancelIcon from "../../../../../assets/icons/layout/cancel-icon.png";
import { Modal, Form, Input, Button } from "antd";

const FinalizeOrder: React.FC<any> = ({ isModalOpen, setIsModalOpen }) => {
  const handleSave = (values: any) => {
    console.log(values);
    window.location.href = './orders'
  };

  return (
    <div>
      <Modal
        width="372px"
        footer={false}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        {/* <img src={cancelIcon} alt="cancelIcon" className='flex justify-end items-end' /> */}

        <h3 className="_modal_header">Finalizing Order</h3>
        <Form
          //   wrapperCol={{ span: 14 }}
          layout="vertical"
          autoComplete="off"
          className="mt-8"
          onFinish={handleSave}
        >
          <Form.Item
            label="Add Tracking No"
            name="trackingNo"
            required
            tooltip="This is a required field"
            validateStatus="error"

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
              className="_input_username  h-[31px] "
              placeholder="Tracking No"
              type="number"
            />
          </Form.Item>
          <Form.Item
            label="Shipping Company"
            name="shippingCompany"
            required
            tooltip="This is a required field"
            validateStatus="error"
            className="mt-8"
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
              className="_input_username  h-[31px] "
              placeholder="Company name"
            />
          </Form.Item>
          <div className="flex justify-center m-auto _white-color">
            <Button
              className="w-32 _primary-button"
              type="primary"
              htmlType="submit"
            // onClick={handleClick}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FinalizeOrder;
