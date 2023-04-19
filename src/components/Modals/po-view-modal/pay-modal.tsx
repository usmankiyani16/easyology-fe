import { useState } from "react";
import "../modals.scss";

import { Modal, Form, Select, Button, Input } from "antd";

const PayModal: React.FC<any> = ({ paymentModalOpen, setPaymentModalOpen }) => {
  const [form] = Form.useForm();

  const [showCheckInput, setShowCheckInput] = useState(false);
  const [checkNumber, setCheckNumber] = useState("");

  const handlePaymentMethodChange = (value: boolean | ((prevState: boolean) => boolean)) => {
    setShowCheckInput(value);
    console.log(value, 'ali');
  };

  const handleCheckNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckNumber(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      paymentMethod: showCheckInput ? 'Check' : '',
      ...(showCheckInput && { checkNumber }),
    };
    console.log(formData); // Do whatever you want with the form data here
  };

  const renderSubmitButton = () => {
    if (showCheckInput) {
      return (
        <div>
          <Input
            placeholder="Check Number"
            className="mr-4"
            onChange={handleCheckNumberChange}
          />
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
       </div>
      );
    }
     else {
      return (
        <Button type="primary" className="mt-4" onClick={handleSubmit}>
          Submit
        </Button>
      );
    }
  };

  return (
    <div className="_modal_wrap">
      <Modal
        width="372px"
        footer={false}
        centered
        open={paymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
        destroyOnClose={true}
      >
        <Form
          form={form}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          autoComplete="off"
          className="mt-4 h-64"
        >
          <Form.Item name="payCategory">
            <Select
              className="_input ml-16 w-[700px]"
              placeholder="Payment Method"
              onChange={handlePaymentMethodChange}
            >
              <Select.Option value="Check">Check</Select.Option>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="CC">CC</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            
            {renderSubmitButton()}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PayModal;
