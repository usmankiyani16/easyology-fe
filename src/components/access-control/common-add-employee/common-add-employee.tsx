import { useState } from "react";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row } from "antd";
import "./common-add-employee.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { backButtonIcon } from "../../../assets/icons";

const CommonAddEmployee = ({ edit }: any) => {
  const [editForm, setEditForm] = useState<boolean>(edit || false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    values.hireDate = dayjs(values?.hireDate).format();
    console.log("values in add employeee", values);
    window.location.href = "/access-control";
  };

  const handleEdit = () => {
    setEditForm(!editForm);
  };

  return (
    <div className="_add-employee-wrap">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            src={backButtonIcon}
            alt="back"
          />
          <h1 className="font-lato  text-[2rem]">Add Employee</h1>
        </div>

        {edit && (
          <Button className="_primary-button" onClick={handleEdit}>
            {editForm ? "Edit" : "Cancel"}
          </Button>
        )}
      </div>

      <div className="mt-4">
        <Form
          disabled={editForm}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          initialValues={{ remember: true, autoRenew: false }}
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="_po_field_label text-lg">
                    {edit ? "Employee Name" : "First Name"}
                  </span>
                }
                name="fullName"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Please input your first name!",
                  },
                ]}
                //   initialValue={data?.user?.name}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="_po_field_label text-lg">
                    {edit ? "Username" : "Last Name"}
                  </span>
                }
                name="lastName"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Please input your last name!",
                  },
                ]}
                //   initialValue={data?.user?.email}
              >
                <Input
                  placeholder="Enter last name"
                  // value={email} // Bind the value to the email state variable
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          {!edit && (
            <Row>
              <Col span={24}>
                <Form.Item
                  label={
                    <span className="_po_field_label text-lg">
                      Email Address
                    </span>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your email!",
                    },
                  ]}
                  labelCol={{ span: 4 }} // Adjust the span value as needed
                  wrapperCol={{ span: 22 }} // Adjust the span value as needed
                  //   initialValue={data?.user?.name}
                >
                  <Input placeholder="Enter employee email" />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="_po_field_label text-lg">
                    Employee Title
                  </span>
                }
                name="employeeTitle"
                rules={[
                  {
                    required: true,
                    message: "Please input your customer name!",
                  },
                ]}
                //   initialValue={data?.user?.name}
              >
                <Input placeholder="Enter Customer Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="_po_field_label text-lg">Hire Date</span>
                }
                name="hireDate"
                rules={[
                  {
                    required: true,

                    type: "object",
                    message: "Please select the hire date!",
                  },
                ]}

                //   initialValue={data?.user?.email}
              >
                <DatePicker className="w-[100%]" />
              </Form.Item>
            </Col>
          </Row>

          {edit && (
            <Row>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="_po_field_label text-lg">
                      Terminated Date
                    </span>
                  }
                  name="terminatedDate"
                  rules={[
                    {
                      required: true,

                      type: "object",
                      message: "Please select the hire date!",
                    },
                  ]}

                  //   initialValue={data?.user?.email}
                >
                  <DatePicker className="w-[100%]" />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="_po_field_label text-lg">
                    Access Allowed
                  </span>
                }
                name="accessAllowed"
                rules={[
                  {
                    required: true,
                    message: "Please give access",
                  },
                ]}
              >
                <Checkbox.Group
                  // onChange={handleCheckboxChange}
                  className="flex flex-col items-start gap-4"
                >
                  <Checkbox value="purchaseOrder">Purchase Order</Checkbox>
                  <Checkbox value="accessControl">Access Control</Checkbox>
                  <Checkbox value="promotions">Promotions</Checkbox>
                  <Checkbox value="reports">Reports</Checkbox>
                  <Checkbox value="expenses">Expenses</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="_po_field_label text-lg">Notifications</span>
                }
                name="notifications"
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <Checkbox.Group
                  // onChange={handleCheckboxChange}
                  className="flex flex-col items-start gap-4"
                >
                  <Checkbox value="promotion">Promotion</Checkbox>
                  <Checkbox value="checkCash">Check Cash</Checkbox>
                  <Checkbox value="voidInvoice">Void Invoices</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end">
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
    </div>
  );
};

export default CommonAddEmployee;
