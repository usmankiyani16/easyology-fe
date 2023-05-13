import { Form, Input, Button, Checkbox, Select, Row, Col } from "antd";
import "./common-subscription.scss";
import { useState } from "react";
import CommonModal from "./common-modal/common-modal";
const { Option } = Select;
interface CommonSubscriptionType {
  edit?: boolean;
}
const CommonSubscription: React.FC<CommonSubscriptionType> = ({ edit }) => {
  const [openCommonModal, setOpenCommonModal] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(edit || false);
  const [showWholesaleList, setShowWholesaleList] = useState(false);
  const [showMobileAppContent, setShowMobileAppContent] = useState(false);
  const [showCheckingCashingContent, setShowCheckingCashingContent] =
    useState(false);
  const onFinish = (values: any) => {
    switch (values.buttonType) {
      case "submit":
        console.log("Submitting:", values);
        break;
      case "finalize":
        console.log("Finalizing later:", values);
        break;
      case "suspended":
        console.log("suspended", values);
        break;
      case "extend":
        console.log("extend", values);
        break;
      case "save":
        console.log("save", values);
        break;
      case "cancel":
        console.log("cancel", values);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (checkedValues: any) => {
    setShowWholesaleList(checkedValues.includes("wholesaleFeature"));
    setShowMobileAppContent(checkedValues.includes("mobileApplication"));
    setShowCheckingCashingContent(checkedValues.includes("checkingCashing"));
  };

  const handleEdit = () => {
    setEditForm(!editForm);
  };

  return (
    <div className="_add-subscription">
      <div className="flex flex-col">
        <label className="font-semibold">Store Information</label>
        <div className="flex items-center justify-between mt-2">
          <label>
            Store Id: <span className="font-semibold">5673</span>
          </label>
          {edit && <button onClick={handleEdit}>Edit</button>}
        </div>
      </div>
      <Form
        disabled={editForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Customer Name"
              name="customerName"
              rules={[
                { required: true, message: "Please input your customer name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email Address"
              name="emailAddress"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="State ID"
              name="stateID"
              rules={[
                { required: true, message: "Please input your state ID!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Store Name"
              name="storeName"
              rules={[
                { required: true, message: "Please input your store name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Store Address"
              name="storeAddress"
              rules={[
                { required: true, message: "Please input your store address!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="No of Users"
              name="noOfUsers"
              rules={[
                {
                  required: true,
                  message: "Please input the number of users!",
                },
              ]}
            >
              <Input min={1} type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item label="Store Access" name="storeAccess">
              <Checkbox.Group
                onChange={handleCheckboxChange}
                className="flex flex-col items-start"
              >
                <Checkbox value="wholesaleFeature">Wholesale Feature</Checkbox>
                {showWholesaleList && (
                  <ul className="pl-8 underline list-disc">
                    <li>Hold Invoice</li>
                    <li>Partial Payment</li>
                    <li>Ach Payment</li>
                    <li>Previous sold price on product level</li>
                  </ul>
                )}
                <Checkbox value="mobileApplication">
                  Mobile Application
                </Checkbox>
                {showMobileAppContent && (
                  <ul className="pl-8 underline list-disc">
                    <li>Mobile Feature 1</li>
                    <li>Mobile Feature 2</li>
                  </ul>
                )}
                <Checkbox value="checkingCashing">Checking Cashing</Checkbox>
                {showCheckingCashingContent && (
                  <ul className="pl-8 underline list-disc">
                    <li>Checking Cashing Feature 1</li>
                    <li>Checking Cashing Feature 2</li>
                  </ul>
                )}
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Monthly Charges"
              name="monthlyCharges"
              rules={[
                {
                  required: true,
                  message: "Please select the monthly charges!",
                },
              ]}
            >
              <Input min={1} type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Subscription Type"
              name="subscriptionType"
              rules={[
                {
                  required: true,
                  message: "Please select the subscription type!",
                },
              ]}
            >
              <Select>
                <Option value="monthly">Monthly</Option>
                <Option value="6months">6 Months</Option>
                <Option value="12months">12 Months</Option>
                <Option value="24months">24 Months</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Auto Renew" name="autoRenew">
              <Checkbox value="yes">Yes </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Sub Total"
              name="subTotal"
              rules={[
                {
                  required: true,
                  message: "Please enter the sub total charges!",
                },
              ]}
            >
              <Input min={1} type="number" />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Form.Item>
          {edit ? (
            <>
              <Button
                onClick={() => setOpenCommonModal(true)}
                className="_primary-button"
                type="primary"
                htmlType="button"
                name="buttonType"
                value="suspended"
              >
                Suspended
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                name="buttonType"
                value="extend"
              >
                Extend
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                name="buttonType"
                value="save"
              >
                Save
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                name="buttonType"
                value="cancel"
              >
                Cancel Subscription
              </Button>
            </>
          ) : (
            <>
              <Button
                className="_primary-button"
                type="primary"
                // htmlType="submit"
                name="buttonType"
                value="finalize"
              >
                Finalize Later
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                name="buttonType"
                value="submit"
              >
                Submit
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
      {openCommonModal && (
        <CommonModal
          openCommonModal={openCommonModal}
          setOpenCommonModal={setOpenCommonModal}
        />
      )}
    </div>
  );
};

export default CommonSubscription;
