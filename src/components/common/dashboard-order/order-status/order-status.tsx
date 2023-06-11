import { useState } from "react";
import { Select, Form, Checkbox, Input, Row, Col } from "antd";

const dummyAddress: any = "House No A0-2737 Shaadbaagh town";

const OrderStatus = (props: any) => {
  const { form, handleOrderForm } = props;

  const [selectedOrderType, setSelectedOrderType] = useState(null);

  const [selectedValues, setSelectedValues] = useState("");
  const [addressValues, setAddressValues] = useState("Store Address");

  const onFinish = (values: any) => {
    const orderFormValues = {
      ...values,
      ...(values.customerType === "Pickup from Store"
        ? {
            time: selectedValues,
            address: dummyAddress,
          }
        : {
            address: values.storeAddress ?? addressValues,
          }),
    };

    handleOrderForm(orderFormValues);

    form.resetFields();
    setSelectedOrderType(null);

    // window.location.href = '/orders';
  };

  return (
    <div className="_order-wrap mt-4">
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
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
                onChange={(value) => setSelectedOrderType(value)}
                style={{ width: "200px" }}
                options={[
                  {
                    label: "Pickup from Store",
                    value: "Pickup from Store",
                  },
                  {
                    label: "Waiting to be delivered",
                    value: "Waiting to be delivered",
                  },
                  {
                    label: "Waiting to be shipped",
                    value: "Waiting to be shipped",
                  },
                ]}
              ></Select>
            </Form.Item>

            {/*---------------------- Pickup from Store Status Checked -------------------------- */}

            {selectedOrderType === "Pickup from Store" && (
              <div className="flex flex-col whitespace-nowrap">
                <Checkbox
                  checked={selectedValues === "10AM - 2PM"}
                  onChange={() => setSelectedValues("10AM - 2PM")}
                >
                  10AM - 2PM
                </Checkbox>
                <Checkbox
                  checked={selectedValues === "2PM - 4PM"}
                  onChange={() => setSelectedValues("2PM - 4PM")}
                >
                  2PM - 4PM
                </Checkbox>
                <Checkbox
                  checked={selectedValues === "4PM - 6PM"}
                  onChange={() => setSelectedValues("4PM - 6PM")}
                >
                  4PM - 6PM
                </Checkbox>
              </div>
            )}

            {/*---------------------- Delivery Status Checked -------------------------- */}

            {(selectedOrderType === "Waiting to be delivered" ||
              selectedOrderType === "Waiting to be shipped") && (
              <div className="flex xs:flex-col md:flex-row gap-4">
                <div>
                  <div className="flex gap-4 whitespace-nowrap">
                    <Checkbox
                      checked={addressValues === "Store Address"}
                      onChange={() => setAddressValues("Store Address")}
                    >
                      Store Address
                    </Checkbox>
                    <Checkbox
                      checked={addressValues === "Add Different Address"}
                      onChange={() => setAddressValues("Add Different Address")}
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
                              //   prefix={SearchOutlined}
                              options={[
                                {
                                  label: "North Side",
                                  value: "Waiting to be delivered",
                                },
                                {
                                  label: "East Side",
                                  value: "Waiting to be shipped",
                                },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item
                            className=""
                            label={
                              <span className="_po_field_label">Zip Code</span>
                            }
                            name="zipCode"
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

        {/* <div className="flex justify-center mt-16">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-36 text-center text-lg"
            >
              Save
            </Button>
          </Form.Item>
        </div> */}
      </Form>
    </div>
  );
};

export default OrderStatus;
