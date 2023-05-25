import { Button, DatePicker, DatePickerProps, Form, Modal } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../../store/store";
import { changeStatus } from "../../../../../store/admin/subscriptions/subscriptions-slice";
interface CommonModalTypes {
  status: string;
  setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  subscriptionId: string;
  openCommonModal: boolean;
  setOpenCommonModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommonModal: React.FC<CommonModalTypes> = ({
  status,
  setEditForm,
  subscriptionId,
  openCommonModal,
  setOpenCommonModal,
}) => {
  const dispatch = useAppDispatch();
  const disabledDate = (current: dayjs.Dayjs | null): boolean => {
    return current ? current.isBefore(dayjs().startOf("day")) : false;
  };
  const handleCancel = () => {
    setOpenCommonModal(false);
  };
  const onFinish = async (values: any) => {
    values.date = dayjs(values.date).format();
    values.subscriptionId = subscriptionId;
    values.status = status;
    const res = await dispatch(changeStatus(values));
    if (res?.meta?.requestStatus === "fulfilled") {
      setOpenCommonModal(false);
      setEditForm(true);
    }
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
            name="date"
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
