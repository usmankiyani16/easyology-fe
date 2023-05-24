import { Form, Input, Button, Checkbox, Select, Row, Col } from "antd";
import { useLocation } from "react-router-dom";
import "./common-subscription.scss";
import { useState } from "react";
import CommonModal from "./common-modal/common-modal";
import Pay from "../../../common/pay/pay";
import { backButtonIcon } from "../../../../assets/icons";
import { useNavigate } from "react-router-dom";
import Submit from "../subscriptions-list/submit/submit";
const { Option } = Select;
interface CommonSubscriptionType {
  edit?: boolean;
}
const CommonSubscription: React.FC<CommonSubscriptionType> = ({ edit }) => {
  const [openCommonModal, setOpenCommonModal] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(edit || false);
  const [showWholesaleList, setShowWholesaleList] = useState(false);
  const [showMobileAppContent, setShowMobileAppContent] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [showCheckingCashingContent, setShowCheckingCashingContent] =
    useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const data = location.state;
  console.log(data, "data in view");
  const navigate = useNavigate();
  const onFinish = (values: any) => {

    if (values.buttonType==='Submit') {
    form.validateFields().then(() => {
      setIsModalOpen(true);
    });
  }
    console.log(values, "values");
    const buttonType = values.buttonType;
    console.log("buttonType:", buttonType);


  
  };
  const handleModalConfirm = () => {
    setIsModalOpen(false);
    // form.submit(); // Trigger form submission
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    // Additional logic after canceling "No" button
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
        <div className="flex gap-2 items-center">
          <img
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            src={backButtonIcon}
            alt="back"
          />
          <label className="font-semibold text-2xl">Store Information</label>
        </div>
        <div className="flex items-center justify-between mt-2">
          <label>
            Store Id: <span className="font-semibold">{data?.store?.id}</span>
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
        form={form}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Customer Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your customer name!" },
              ]}
            >
              <Input placeholder="Enter Customer Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email address!",
                },
              ]}
            >
              <Input placeholder="Enter email address" />
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
              <Input type="number" placeholder="Phone Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="State ID"
              name="stateId"
              rules={[
                { required: true, message: "Please input your state ID!" },
              ]}
            >
              <Input placeholder="Enter State ID" />
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
              <Input placeholder="Enter store name" />
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
              <Input placeholder="Store Address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="No of Users"
              name="totalUsers"
              rules={[
                {
                  required: true,
                  message: "Please input the number of users!",
                },
              ]}
            >
              <Input min={1} type="number" placeholder="Number of users" />
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
              name="monthlyCharge"
              rules={[
                {
                  required: true,
                  message: "Please select the monthly charges!",
                },
              ]}
            >
              <Input
                min={1}
                type="number"
                placeholder="Mention Monthly Charges"
              />
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
              <Select placeholder="Subscription Type">
                <Option value="monthly">Monthly</Option>
                <Option value="6months">6 Months</Option>
                <Option value="12months">12 Months</Option>
                <Option value="24months">24 Months</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Pay showButton={true} showlabel={true} />
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
              <Input min={1} type="number" placeholder="Enter sub total" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Auto Renew" name="autoRenew">
              <Checkbox value="yes">Yes </Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="buttonType">
          {/* <input type="hidden" value="" /> */}
          {edit ? (
            <>
              <Button
                onClick={() => {
                  setOpenCommonModal(true);
                  form.setFieldsValue({ buttonType: "suspended" });
                }}
                className="_primary-button"
                type="primary"
                htmlType="button"
              >
                Suspended
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  form.setFieldsValue({ buttonType: "Extend" });
                }}
              >
                Extend
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  form.setFieldsValue({ buttonType: "Save" });
                }}
              >
                Save
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  form.setFieldsValue({ buttonType: "Cancel Suscription" });
                }}
              >
                Cancel Subscription
              </Button>
            </>
          ) : (
            <>
              <Button
                className="_primary-button"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  form.setFieldsValue({ buttonType: "finalize" });
                }}
              >
                Finalize Later
              </Button>
              <Button
                className="ml-4 _primary-button"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  form.setFieldsValue({ buttonType: "Submit" });
                }}
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

      {isModalOpen && (
        <Submit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleModalConfirm={handleModalConfirm} handleModalCancel={handleModalCancel}/>
      )}
    </div>
  );
};

export default CommonSubscription;
