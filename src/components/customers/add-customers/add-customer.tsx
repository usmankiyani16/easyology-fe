import React, { useState } from "react";
import "../../../sass/modals.scss";
import "./add-customer.scss";

import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import RetailerForm from "./forms/retailer-form";
import WholeSalerForm from "./forms/wholesaler-form";

const AddCustomer: React.FC<any> = ({
  isModalOpen,
  setIsModalOpen,
  setIsApiChange,
}) => {
  const [selectedOption, setSelectedOption]: any = useState(null);

  const handleSelect = (value: any) => {
    setSelectedOption(value);
  };
  const validateMobileNumber = (rule: any, value: string) => {
    const mobileNumberRegex = /^[0-9]{10,12}$/;
    return new Promise<void>((resolve, reject) => {
      if (!mobileNumberRegex.test(value)) {
        reject("Must be number between 10 to 12 digits");
      } else resolve();
    });
  };

  return (
    <div className="_modal_wrap _add-customer">
      <Modal
        footer={false}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
        width={""}
      >
        <div className="m-auto">
          <h3 className="_modal_header_poView">Add Customer</h3>

          <div className="mt-4">
            <div className="flex justify-center flex-col sm:items-center sm:m-auto">
              <Form.Item
                name="customerType"
                required
                tooltip={
                  <span className="_po_field_label">
                    This is a required field
                  </span>
                }
                rules={[
                  {
                    required: true,
                    // type: 'email',
                    message: <span>Required field</span>,
                  },
                ]}
              >
                <Select
                  className="_input_field"
                  placeholder="Select customer type"
                  onChange={handleSelect}
                  style={{ width: "300px" }}
                >
                  <Select.Option value="Retailer">Retailer</Select.Option>
                  <Select.Option value="WholeSaler">WholeSaler</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div>
              <RetailerForm
                setIsApiChange={setIsApiChange}
                setIsModalOpen={setIsModalOpen}
                selectedOption={selectedOption}
                setSelectedOption={selectedOption}
                validateMobileNumber={validateMobileNumber}
                handleSelect={handleSelect}
              />
            </div>
            <div>
              <WholeSalerForm
                setIsApiChange={setIsApiChange}
                setIsModalOpen={setIsModalOpen}
                selectedOption={selectedOption}
                setSelectedOption={selectedOption}
                validateMobileNumber={validateMobileNumber}
                handleSelect={handleSelect}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddCustomer;
