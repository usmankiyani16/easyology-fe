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
    let payload: any = {
      ...authPayload,
      deviceId,
    };

    if (values.otp) payload.otp = values.otp;
    if (values.newPassword) payload.newPassword = values.newPassword;

    const res = await dispatch(signin(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(setIsOTP(false));
    }
  };

  const [form] = Form.useForm();

  const handlePasswordConfirm = () => {
    form.validateFields(["confirmPassword"]);
  };

  /*  const handleFinish = (values: any) => {
    console.log('Form values:', values);
  }; */

  const validateConfirmPassword = (_: any, value: string) => {
    const newPassword = form.getFieldValue("newPassword");
    if (value && value !== newPassword) {
      return Promise.reject("Passwords do not match");
    }
    return Promise.resolve();
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
        width="400px"
      >
        <Form
          className="flex flex-col"
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          {changePassword ? (
            <>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password",
                  },
                ]}
              >
                <Input.Password placeholder="Enter your new password"/>
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password",
                  },
                  {
                    validator: validateConfirmPassword,
                  },
                ]}
              >
                <Input.Password onBlur={handlePasswordConfirm} placeholder='Enter password again' />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              label="Enter OTP"
              name="otp"
              rules={[{ required: true, message: "Required!" }]}
            >
              <Input placeholder="Please enter OTP" />
            </Form.Item>
          )}

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
