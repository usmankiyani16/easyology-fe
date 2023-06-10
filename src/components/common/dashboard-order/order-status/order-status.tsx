import { useEffect, useState } from "react";
import { Select, Form, Checkbox, Input, Button, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../../routes/route-constants";


const CheckboxGroup = Checkbox.Group;

const dummyAddress: any = "House No A0-2737 Shaadbaagh town";
const OrderStatus = ({ onSubmit, showOrderStatus }: any) => {
  const navigate= useNavigate()


  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedValues, setSelectedValues] = useState("10AM - 2PM");
  const [addressValues, setAddressValues] = useState("Store Address");

  const [form] = Form.useForm();

  // const [selectedOption, setSelectedOption] = useState("cash");

  //   const onFinish = (values: any) => {
  //     console.log(values);
  //   };


  const handleSelect = (value: any) => {
    setSelectedOption(value);
  };
  const handleCheckboxChange = (checkedValue: any) => {
    setSelectedValues(checkedValue);
  };
  const handleAddressChange = (checkedValue: any) => {
    if (
      selectedOption === "Waiting to be delivered" ||
      selectedOption === "Waiting to be shipped"
    ) {
      setAddressValues(checkedValue);
      if (checkedValue === "Store Address") {
        form.setFieldsValue({
          storeAddress: dummyAddress,
          city: undefined,
          state: undefined,
          zipcode: undefined,
        });
      } else {
        form.setFieldsValue({
          storeAddress: undefined,
          city: undefined,
          state: undefined,
          zipcode: undefined,
        });
      }
    } else {
      setAddressValues("");
    }
  };

  const onFinish = (values: any) => {
    if (values.customerType === "Pickup from Store") {
      values.timeStatus = selectedValues;
    }
    if (
      values.customerType === "Waiting to be delivered" ||
      values.customerType === "Waiting to be shipped"
    ) {
      values.storeAddressCheck = addressValues;
      if (values.storeAddressCheck === "Store Address") {
        values.storeAddress = dummyAddress;
      }
      
    }
    console.log(values, "order");
   
    form.resetFields();
    setSelectedOption(null)

    navigate(ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.ORDERS)



    // window.location.href = '/orders';
    

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Form fields reset on changing selection
  // useEffect(() => {
  //   if (
  //     selectedOption === "Waiting to be shipped" ||
  //     selectedOption === "Waiting to be delivered"
  //   ) {
  //     form.resetFields();
  //   }
  // }, [selectedOption, form]);

  return (
    <div className="_order-wrap mt-4">
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Row className="flex xs:flex-col md:flex-row">
          <Col xs={3}>
            <label className="whitespace-nowrap">Order Status</label>
          </Col>

          <Col xs={3}>
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
                placeholder="Select Order type"
                onChange={handleSelect}
                style={{ width: "200px" }}
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

            {/*---------------------- Pickup from Store Status Checked -------------------------- */}

            {selectedOption === "Pickup from Store" && (
              <div className="flex flex-col whitespace-nowrap">
                <Checkbox
                  checked={selectedValues === "10AM - 2PM"}
                  onChange={() => handleCheckboxChange("10AM - 2PM")}
                  // className="ml-[8px]"
                >
                  10AM - 2PM
                </Checkbox>
                <Checkbox
                  checked={selectedValues === "2PM - 4PM"}
                  onChange={() => handleCheckboxChange("2PM - 4PM")}
                >
                  2PM - 4PM
                </Checkbox>
                <Checkbox
                  checked={selectedValues === "4PM - 6PM"}
                  onChange={() => handleCheckboxChange("4PM - 6PM")}
                >
                  4PM - 6PM
                </Checkbox>
              </div>
            )}

            {/*---------------------- Delivery Status Checked -------------------------- */}

            {(selectedOption === "Waiting to be delivered" ||
              selectedOption === "Waiting to be shipped") && (
              <div className="flex xs:flex-col md:flex-row gap-4">
                <div>
                  <div className="flex gap-4 whitespace-nowrap">
                    <Checkbox
                      checked={addressValues === "Store Address"}
                      onChange={() => handleAddressChange("Store Address")}
                    >
                      Store Address
                    </Checkbox>
                    <Checkbox
                      checked={addressValues === "Add Different Address"}
                      onChange={() =>
                        handleAddressChange("Add Different Address")
                      }
                    >
                      Add Different Address
                    </Checkbox>
                  </div>

                  <br />
                  <div className="w-44 mt-2 flex">
                    {addressValues === "Store Address" && (
                      <span>{dummyAddress}</span>
                    )}

                    {/*---------------------- Add Different Address Status Checked -------------------------- */}

                    {addressValues === "Add Different Address" && (
                      <div>
                        <Form.Item
                          className=""
                          label={
                            <span className="_po_field_label">
                              Store Address:
                            </span>
                          }
                          name="storeAddress"
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
                              type="number"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <div className="flex justify-center mt-16">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-36 text-center text-lg"
            >
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default OrderStatus;
