import { Button, Form, Input, InputNumber, Modal } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { setIsOTP, signin } from "../../../../store/auth/auth-slice";

const Otp: React.FC<any> = ({ authPayload }) => {
  const { isOTP, changePassword } = useAppSelector((state) => state.auth);
  const { deviceId }: any = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    dispatch(setIsOTP(false));
  };
  const onFinish = async (values: any) => {
    let payload = {
      ...authPayload,
      otp: values?.otp,
      deviceId,
    };
    const res = await dispatch(signin(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(setIsOTP(false));
    }
  };
  return (
    <div>
      <Modal
        footer={false}
        centered
        closable={true}
        open={isOTP}
        maskClosable={false}
        onCancel={handleCancel}
        width='400px'
      >
        <Form
          className="flex flex-col"
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Enter OTP"
            name="otp"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input placeholder="Please enter OTP" />
          </Form.Item>
          <div className="self-center">
            <Button htmlType="submit" className="_primary-button">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Otp;
