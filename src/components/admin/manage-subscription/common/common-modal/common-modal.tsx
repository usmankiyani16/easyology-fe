import { Button, DatePicker, DatePickerProps, Form, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
interface CommonModalTypes {
  openCommonModal: boolean;
  setOpenCommonModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonModal: React.FC<CommonModalTypes> = ({
  openCommonModal,
  setOpenCommonModal,
}) => {
  const disabledDate = (current: dayjs.Dayjs | null): boolean => {
    return current ? current.isBefore(dayjs().startOf("day")) : false;
  };
  const handleCancel = () => {
    setOpenCommonModal(false);
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
        open={openCommonModal}
        onCancel={handleCancel}
      >
        <Form
          className="flex flex-col"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          // layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="When"
            name="when"
            rules={[{ required: true, message: "Required!" }]}
          >
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>

          <div className="flex justify-between">
            <Button
              onClick={() => setOpenCommonModal(false)}
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

export default CommonModal;
