import { SetStateAction, useState } from "react";
import { Select, Form, Checkbox, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const CheckboxGroup = Checkbox.Group;

const OrderStatus = ({ onChange }: any) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedValues, setSelectedValues] = useState();

  //   const onFinish = (values: any) => {
  //     console.log(values);
  //   };

  const handleFormChange = (changedValues: any, allValues: any) => {
    onChange(allValues);
  };

  const handleSelect = (value: any) => {
    setSelectedOption(value);
  };
  const handleCheckboxChange = (checkedValue: any) => {
    setSelectedValues(checkedValue);
  };

  const pickupOptions = [
    { label: "10AM - 2PM", value: "10AM - 2PM" },
    { label: "2PM - 4PM", value: "2PM - 4PM" },
    { label: "4PM - 6PM", value: "4PM - 6PM" },
  ];
  const shipOptions = [
    { label: "Store Address", value: "Store Address" },
    { label: "Add Different Address", value: "Add Different Address" },
  ];

  return (
    <div>
      <Form
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        layout="vertical"
        // style={{ maxWidth:  }}

        autoComplete="off"
        onValuesChange={handleFormChange}
      >
        <div>
          <Form.Item
            label="Order Status"
            name="customerType"
            required
            tooltip={
              <span className="_po_field_label">This is a required field</span>
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
              placeholder="Select Order type"
              onChange={handleSelect}
              style={{ width: "200px" }}
              //   prefix={SearchOutlined}
            >
              <Select.Option value="Pickup from Store">
                Pickup from Store
              </Select.Option>
              <Select.Option value="Waiting to be delivered">
                Waiting to be delivered
              </Select.Option>
              <Select.Option value="Waiting to be shipped">
                Waiting to be shipped
              </Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/*---------------------- Pickup from Store Status Checked -------------------------- */}

        {selectedOption === "Pickup from Store" && (
          <div className="flex xs:flex-col md:flex-row md:gap-4">
            {pickupOptions.map((option) => (
              <Checkbox
                key={option.value}
                checked={selectedValues === option.value}
                onChange={() => handleCheckboxChange(option.value)}
              >
                {option.label}
              </Checkbox>
            ))}{" "}
          </div>
        )}

        {/*---------------------- Delivery Status Checked -------------------------- */}

        {(selectedOption === "Waiting to be delivered" ||
          selectedOption === "Waiting to be shipped") && (
          <div className="flex xs:flex-col md:flex-row gap-4">
            {shipOptions.map((option, index) => (
              <div>
                <Checkbox
                  key={option.value}
                  checked={selectedValues === option.value}
                  onChange={() => handleCheckboxChange(option.value)}
                  /* defaultChecked={option.value === 'Store Address'} */
                  defaultChecked={index === 0}
                >
                  {option.label}
                </Checkbox>
                <br />
                <div className="w-44 mt-2">
                  {option.value === "Store Address" &&
                    selectedValues === "Store Address" && (
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Adipisci
                      </span>
                    )}

                  {/*---------------------- Add Different Address Status Checked -------------------------- */}

                  {option.value === "Add Different Address" &&
                    selectedValues === "Add Different Address" && (
                      <div>
                        <Form.Item
                          className=""
                          label={
                            <span className="_po_field_label">
                              Store Address:
                            </span>
                          }
                          name="storeAddress"
                         
                        >
                          <Input
                            className="_input_field md:w-[600px] h-[35px]"
                            placeholder="Enter Address"
                          />
                        </Form.Item>
                        <div className="xs:w-[280px] md:w-[600px] grid xs:grid-cols-2 md:grid-cols-3 gap-6">
                          <Form.Item
                            className=""
                            label={
                              <span className="_po_field_label">City:</span>
                            }
                            name="city"
                            
                          >
                            <Input
                              className="_input_field h-[35px]"
                              placeholder="City"
                            />
                          </Form.Item>
                          <Form.Item
                            label={
                              <span className="_po_field_label">State</span>
                            }
                            name="state"
                          >
                            <Select
                              className="_input_field h-[35px] md:200px"
                              placeholder="Select State"
                              //   onChange={handleSelect}

                              //   prefix={SearchOutlined}
                            >
                              <Select.Option value="USA">USA</Select.Option>
                              <Select.Option value="Waiting to be delivered">
                                North Side
                              </Select.Option>
                              <Select.Option value="Waiting to be shipped">
                                East Side
                              </Select.Option>
                            </Select>
                          </Form.Item>
                          <Form.Item
                            className=""
                            label={
                              <span className="_po_field_label">Zip Code</span>
                            }
                            name="zipcode"
                            
                          >
                            <Input
                              className="_input_field h-[35px]"
                              placeholder="Enter Zip Code"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Form>
    </div>
  );
};

export default OrderStatus;
