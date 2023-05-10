import { useState } from "react";
import "../../../sass/modals.scss";
import { Form, Select, Button, Input } from "antd";


const Pay = ({ handleSelect, onFinish, selectedOption }: any) => {
  return (
    <div>
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
            <Select.Option value="check">Check</Select.Option>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="cc">CC</Select.Option>
          </Select>
        </Form.Item>

        {selectedOption === "check" && (
          <div>
            <Form.Item
              className="mt-12 ml-16"
              label={<span className="_po_field_label">Check Number</span>}
              name="checkNumber"
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
              <Input className="_input_field w-48" placeholder="Check Number" />
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

        {(selectedOption === "cash" || selectedOption === "cc") && (
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
    </div>
  );
};

export default Pay;
