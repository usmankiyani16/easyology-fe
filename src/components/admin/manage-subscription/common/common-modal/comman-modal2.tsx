import { Button, DatePicker, DatePickerProps, Form, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
interface CommonModalTypes {
  openCommonModal2: boolean;
  setOpenCommonModal2: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonModal2: React.FC<CommonModalTypes> = ({
  openCommonModal2,
  setOpenCommonModal2,
}) => {
  const disabledDate = (current: dayjs.Dayjs | null): boolean => {
    return current ? current.isBefore(dayjs().startOf("day")) : false;
  };
  const handleCancel = () => {
    setOpenCommonModal2(false);
  };
  const onFinish = (values: any) => {
    console.log("values", values);
  };
  return (
    <div>
      <Modal
        width={360}
        footer={false}
        // centered
        closable={false}
        open={openCommonModal2}
        onCancel={handleCancel}
      >
        <Form
          className="flex flex-col"
          name="basic"
        //   labelCol={{ span:  }}
          wrapperCol={{ span: 16 }}
          // layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Current expiration date:"
            name="currentExpiryDate"
            rules={[{ required: true, message: "Required!" }]}
          >
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            label="New expiration date"
            name="newExpiryDate"
            rules={[{ required: true, message: "Required!" }]}
          >
            <DatePicker disabledDate={disabledDate} className="ml-4" />
          </Form.Item>

          <div className="flex justify-between">
            <Button
              onClick={() => setOpenCommonModal2(false)}
              type="default"
              htmlType="button"
              name="buttonType"
            >
              Cancel
            </Button>
            <Button
              className="_primary-button"
              type="primary"
              htmlType="submit"
              name="buttonType"
              value="suspended"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CommonModal2;
