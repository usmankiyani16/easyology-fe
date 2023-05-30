import { Form, Input, Button, Checkbox, Select, Row, Col } from "antd";
import { useLocation } from "react-router-dom";
import "./common-subscription.scss";
import { useState } from "react";
import CommonModal from "./common-modal/common-modal";
import Pay from "../../../common/pay/pay";
import { backButtonIcon } from "../../../../assets/icons";
import { useNavigate } from "react-router-dom";
import Submit from "../subscriptions-list/submit/submit";
import { useAppDispatch } from "../../../../store/store";

import {
  addSubscription,
  updateSubscription,
} from "../../../../store/admin/subscriptions/subscriptions-slice";
import dayjs from "dayjs";

const { Option } = Select;
interface CommonSubscriptionType {
  edit?: boolean;
}
const CommonSubscription: React.FC<CommonSubscriptionType> = ({ edit }) => {
  const dispatch = useAppDispatch();
  const [openCommonModal, setOpenCommonModal] = useState<boolean>(false);
  const [openCommonModal2, setOpenCommonModal2] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(edit || false);
  const [showWholesaleList, setShowWholesaleList] = useState(false);
  const [showMobileAppContent, setShowMobileAppContent] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [submittedValues, setSubmittedValues] = useState<any>();
  const [showCurrentExpiry, setShowCurrentExpiry] = useState<boolean>(false);
  const [showCheckingCashingContent, setShowCheckingCashingContent] =
    useState(false);

  const [form] = Form.useForm();
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const expirtDate = dayjs(data?.endDate).format("MM-DD-YYYY");

  const onFinish = async (values: any) => {
    values.totalUsers = Number(values.totalUsers);
    values.monthlyCharge = Number(values.monthlyCharge);
    values.subscriptionType = Number(values.subscriptionType);
    values.subTotal = Number(values.subTotal);

    if (values.paymentType === "check") {
      values.paymentDetails = { checkNumber: values.checkNumber };
      delete values.checkNumber;
    }

    console.log(values, "values");
    let res: any;
    switch (values.buttonType) {
      case "submit":
        values.status = "Active";
        form.validateFields().then(() => {
          setSubmittedValues(values);
          setIsModalOpen(true);
        });
        break;
      case "finalize":
        values.status = "Call Back";
        res = await dispatch(addSubscription(values));
        if (res?.meta?.requestStatus === "fulfilled") {
          navigate(-1);
        }
        break;
      case "save":
        values.status = data?.status;
        values.subscriptionId = data?._id;
        values.storeId = data?.storeId;

        res = await dispatch(updateSubscription(values));
        if (res?.meta?.requestStatus === "fulfilled") {
          setEditForm(false);
        }
        break;
      default:
        break;
    }
  };
  const handleModalConfirm = async () => {
    const res = await dispatch(addSubscription(submittedValues));
    if (res?.meta?.requestStatus === "fulfilled") {
      setIsModalOpen(false);
      navigate(-1);
    }
    // form.submit(); // Trigger form submission
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    // Additional logic after canceling "No" button
  };

  const handleCheckboxChange = (checkedValues: any) => {
    setShowWholesaleList(checkedValues.includes("wholesale feature"));
    setShowMobileAppContent(checkedValues.includes("mobile application"));
    setShowCheckingCashingContent(checkedValues.includes("check cashing"));
  };

  const handleEdit = () => {
    setEditForm(!editForm);
  };
  const validateMobileNumber = (rule: any, value: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const mobileNumberRegex = /^[0-9]{10,12}$/;
      if (!mobileNumberRegex.test(value)) {
        reject("Mobile number must be between 10 to 12 digits");
      } else {
        resolve();
      }
    });
  };

  console.log(data, "ac");

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
          {edit && (
            <label>
              Store Id: <span className="font-semibold">{data?.storeNo}</span>
            </label>
          )}

          {edit && (
            <Button className="_primary-button" onClick={handleEdit}>
              {editForm ? "Edit" : "Cancel"}
            </Button>
          )}
        </div>
      </div>
      <Form
        disabled={editForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        initialValues={{ remember: true, autoRenew: false }}
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
              initialValue={data?.user?.name}
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
              initialValue={data?.user?.email}
            >
              <Input
                placeholder="Enter email address"
                // value={email} // Bind the value to the email state variable
                // onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ validator: validateMobileNumber }]}
              initialValue={data?.user?.phoneNumber}
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
              initialValue={data?.user?.stateId}
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
              initialValue={data?.store?.name}
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
              initialValue={data?.store?.address}
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
              initialValue={data?.totalUsers}
            >
              <Input min={1} type="number" placeholder="Number of users" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Store Access"
              name="storeAccess"
              initialValue={data?.storeAccess}
              rules={[
                {
                  required: true,
                  message: "Please give store access",
                },
              ]}
            >
              <Checkbox.Group
                onChange={handleCheckboxChange}
                className="flex flex-col items-start"
              >
                <Checkbox value="wholesale feature">Wholesale Feature</Checkbox>
                {showWholesaleList && (
                  <ul className="pl-8 underline list-disc">
                    <li>Hold Invoice</li>
                    <li>Partial Payment</li>
                    <li>Ach Payment</li>
                    <li>Previous sold price on product level</li>
                  </ul>
                )}
                <Checkbox value="mobile application">
                  Mobile Application
                </Checkbox>
                {showMobileAppContent && (
                  <ul className="pl-8 underline list-disc">
                    <li>Mobile Feature 1</li>
                    <li>Mobile Feature 2</li>
                  </ul>
                )}
                <Checkbox value="check cashing">Checking Cashing</Checkbox>
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
              initialValue={data?.monthlyCharge}
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
              initialValue={data?.subscriptionType}
            >
              <Select placeholder="Subscription Type">
                <Option value="1">Monthly</Option>
                <Option value="6">6 Months</Option>
                <Option value="12">12 Months</Option>
                <Option value="24">24 Months</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Pay
              showButton={true}
              showLabel={true}
              paymentType={data?.payments[0]?.paymentType}
              checkNumber= {data?.payments[0]?.paymentTypeDetails?.checkNumber}
            />
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
              initialValue={data?.subTotal}
            >
              <Input
                min={1}
                type="number"
                placeholder="Enter sub total"
                // value={subTotal}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Auto Renew"
              name="autoRenew"
              valuePropName="checked"
              initialValue={data?.autoRenew}
            >
              <Checkbox>Yes</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="buttonType">
          {/* <input type="hidden" value="" /> */}
          {edit ? (
            <>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button
                    onClick={() => {
                      setStatus(
                        data?.status === "Call Back" || 'Suspended' ? "Active" : "Suspended"
                      );
                      setOpenCommonModal(true);
                      form.setFieldsValue({ buttonType: "suspended" });
                      setShowCurrentExpiry(false);
                    }}
                    className="_primary-button"
                    type="primary"
                    htmlType="button"
                  >
                    {data?.status === "Call Back" || 'Suspended' ? "Active" : "Suspended"}
                  </Button>
                </Col>

                <Col>
                  <Button
                    className=" _primary-button"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      form.setFieldsValue({ buttonType: "extend" });
                      setOpenCommonModal(true);
                      setShowCurrentExpiry(true);
                    }}
                    disabled={data?.status === "Call Back" || editForm}
                  >
                    Extend
                  </Button>
                </Col>
                <Col>
                  <Button
                    className=" _primary-button"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      form.setFieldsValue({ buttonType: "save" });
                    }}
                  >
                    Save
                  </Button>
                </Col>

                <Col>
                  <Button
                    className="_primary-button text-center"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setStatus("Cancelled");
                      form.setFieldsValue({ buttonType: "cancelSuscription" });
                      setOpenCommonModal(true);
                      setShowCurrentExpiry(false);
                    }}
                    disabled={data?.status === "Call Back" || editForm}
                  >
                    Cancel Subscription
                  </Button>
                </Col>
              </Row>
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
                  form.setFieldsValue({ buttonType: "submit" });
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
          status={status}
          setEditForm={setEditForm}
          subscriptionId={data?._id}
          openCommonModal={openCommonModal}
          setOpenCommonModal={setOpenCommonModal}
          showCurrentExpiry={showCurrentExpiry}
          expiryDate={expirtDate}
        />
      )}

      {isModalOpen && (
        <Submit
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleModalConfirm={handleModalConfirm}
          handleModalCancel={handleModalCancel}
          submittedValues={submittedValues}
        />
      )}
    </div>
  );
};

export default CommonSubscription;
