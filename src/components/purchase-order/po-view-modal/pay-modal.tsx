import {  useState } from "react";
import "../../../sass/modals.scss";


import { Modal, Form, Select, Button, Input } from "antd";

const PayModal: React.FC<any> = ({ paymentModalOpen, setPaymentModalOpen }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  function handleSelect(value: any) {
    setSelectedOption(value);
  
  }

  const onFinish = (values: any) => {
    console.log(values, "Ye values hai");
    
  };



  return (
    <div>
      <Modal
        width="372px"
        footer={false}
        centered
        open={paymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <Form
          wrapperCol={{ span: 14 }}
          layout="vertical"
          autoComplete="off"
          className="mt-4 h-64"
          onFinish={onFinish}
        >
          <Form.Item
            name="payCategory"
            required
            tooltip={
              <span className="_po_field_label  ml-[10px]">
                This is a required field
              </span>
            }
            rules={[
              {
                required: true,
                // type: 'email',
                message: <span className="ml-16">Required field</span>,
              },
            ]}
          >
            <Select
              className="_input_field ml-16 w-[700px]"
              placeholder="Payment Method"
              onChange={handleSelect}
       
            >
              <Select.Option value="Check">Check</Select.Option>
              <Select.Option value="Cash">Cash</Select.Option>
              <Select.Option value="CC">CC</Select.Option>
            </Select>
          </Form.Item>

          {selectedOption === "Check" && (
            <div>
              <Form.Item
                className="mt-12 ml-16"
                label={<span className="_po_field_label">Check Number</span>}
                name="serial"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,
                    // type: 'email',
                    message: "Required field",
                  },
                ]}
              >
                <Input
                  className="_input_field w-48"
                  placeholder="Check Number"
                />
              </Form.Item>
              <div className="flex justify-center mt-16">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-36 text-center text-lg"
                  >
                    Done
                  </Button>
                </Form.Item>
              </div>
            </div>
          )}

          {(selectedOption === "Cash" || selectedOption === "CC") && (
            <div className="flex justify-center mt-16">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-36 text-center text-lg"
                >
                  Done
                </Button>
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default PayModal;
