import { useState } from "react";
import "../../../sass/modals.scss";
import { Form, Select, Button, Input } from "antd";

const Pay = ({ onFinish, showButton }: any) => {
  const [selectedOption, setSelectedOption] = useState(null);
  function handleSelect(value: any) {
    setSelectedOption(value);
  }
  const FormItems = (
    <>
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
          className="_input_field w-[700px]"
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
          {/* <div className="flex justify-center mt-16">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-36 text-center text-lg"
              >
                Done
              </Button>
            </Form.Item>
          </div> */}
        </div>
      )}
    </>
  );
  if (showButton === false) {
    return FormItems;
  } else {
    return (
      <div>
        <Form
          wrapperCol={{ span: 14 }}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          {FormItems}

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
  }
};

export default Pay;
