import { Form, Input, Button, Checkbox, Select } from "antd";
const { Option } = Select;

const AddSubscription = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="App">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[
            { required: true, message: "Please input your customer name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="emailAddress"
          rules={[
            { required: true, message: "Please input your email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="State ID"
          name="stateID"
          rules={[{ required: true, message: "Please input your state ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Store Address"
          name="storeAddress"
          rules={[
            { required: true, message: "Please input your store address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="No of Users"
          name="noOfUsers"
          rules={[
            { required: true, message: "Please input the number of users!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Store Access" name="storeAccess">
          <Checkbox.Group>
            <Checkbox value="wholesaleFeature">Wholesale Feature</Checkbox>
            <Checkbox value="mobileApplication">Mobile Application</Checkbox>
            <Checkbox value="checkingCashing">Checking Cashing</Checkbox>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label="Monthly Charges"
          name="monthlyCharges"
          rules={[
            { required: true, message: "Please select the monthly charges!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Subscription Type"
          name="subscriptionType"
          rules={[
            { required: true, message: "Please select the subscription type!" },
          ]}
        >
          <Select>
            <Option value="monthly">Monthly</Option>
            <Option value="6months">6 Months</Option>
            <Option value="12months">12 Months</Option>
            <Option value="24months">24 Months</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSubscription;
