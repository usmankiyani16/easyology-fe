import { useState } from "react";
import { Button, DatePicker, Form, Input, Row, Col } from "antd";
import Pay from "../../common/partial-pay/payment-method/payment-method";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useAppDispatch } from "../../../store/store";
import { addExpense } from "../../../store/expenses/expenses.slice";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";

const AddExpenseForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    values.expenseDate = dayjs(values?.expenseDate).format();
    values.paymentType = values.payCategory;
    values.expenseAmount = Number(values.expenseAmount);
    if (values?.paymentType === "check") {
      values.paymentTypeDetails = { checkNumber: values.checkNumber };
      delete values.checkNumber;
    }
    delete values.payCategory;
    const res = await dispatch(addExpense(values));
    if (res?.meta?.requestStatus === "fulfilled") {
      form.resetFields();
      navigate(ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.EXPENSES);
    }
  };

  // Price Validator

  const validatePrice = (rule: any, value: string) => {
    const price = parseFloat(value);
    if (isNaN(price)) {
      return Promise.reject("Please enter a valid price");
    } else if (price <= 0) {
      return Promise.reject("Price must be greater than zero");
    } else {
      return Promise.resolve();
    }
  };

  return (
    <div className="_customer-details-wrap">
      <Form
        form={form}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="mt-4"
      >
        <div className="flex flex-col ml-8 sm:gap-4">
          <Row className="flex xs:flex-col xs:gap-1 sm:flex-row sm:gap-8">
            <Col xs={4} className="pt-2">
              <label className="xs:ml-2 sm:ml-0 whitespace-nowrap">
                Expense Date
              </label>
            </Col>

            <Col xs={10}>
              <Form.Item
                name="expenseDate"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,
                    // type: 'email',
                    message: "Required Field",
                  },
                  {
                    type: "date",
                  },
                ]}
              >
                <DatePicker
                  className="w-64 h-[40px] _white-background rounded-[10px]"
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row className="flex xs:flex-col xs:gap-1 sm:flex-row sm:gap-8">
            <Col xs={4} className="pt-2">
              <label className="xs:ml-2 sm:ml-0 whitespace-nowrap">
                Expense Description
              </label>
            </Col>

            <Col xs={18}>
              <Form.Item
                name="expenseDescription"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,
                    // type: 'email',
                    message: "Required Field",
                  },
                  {
                    type: "string",
                  },
                ]}
              >
                {/* <DemoBlock title='根据内容自动调整高度'> */}
                <TextArea
                  placeholder="Write description"
                  autoSize={{ minRows: 5, maxRows: 8 }}
                />
                {/* </DemoBlock> */}
              </Form.Item>
            </Col>
          </Row>

          <Row className="flex xs:flex-col xs:gap-1 sm:flex-row sm:gap-8">
            <Col xs={4} className="pt-2">
              <label className="xs:ml-2 sm:ml-0 whitespace-nowrap">
                Expense Amount
              </label>
            </Col>

            <Col xs={10}>
              <Form.Item
                name="expenseAmount"
                required
                tooltip="This is a required field"
                rules={[{ required: true, validator: validatePrice }]}
              >
                <Input
                  className="w-64 h-[40px] _white-background _input-border rounded-[10px]"
                  placeholder="Enter Expense Amount"
                  type="number"
                  prefix="$"
                />
              </Form.Item>
            </Col>
          </Row>

          {/*  <div className="w-[450px] flex justify-between items-center xs:flex-col sm:flex-row">
          <label className="xs:ml-2 sm:ml-0">Payment Method</label>
          <Form.Item
              name="paymentMethod"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
                {
                  type: "string",
                },
              ]}
            >
          <Input
            className="mx-2 w-64 h-[40px] _white-background"
          
          />
          </Form.Item> */}

          <Row className="flex xs:flex-col xs:gap-1 sm:flex-row sm:gap-8">
            <Col xs={4} className="pt-2">
              <label className="xs:ml-2 sm:ml-0 whitespace-nowrap">
                Payment Method
              </label>
            </Col>

            <Col xs={10}>
              <Pay showButton={true} />
            </Col>
          </Row>
        </div>
        <div className="flex justify-around">
          <Button htmlType="submit" className="_bg-primary-color _white-color">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddExpenseForm;
