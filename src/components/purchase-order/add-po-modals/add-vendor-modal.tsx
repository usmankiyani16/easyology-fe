import React, { useState } from "react";
import "../../../sass/modals.scss";

import { Button, Modal, Form, Input } from "antd";
import { useAppDispatch } from "../../../store/store";
import { addVendor } from "../../../store/vendors/vendors-slice";

const AddVendorModal: React.FC<any> = ({
  vendormodalOpen,
  setVendorModalOpen,
}) => {
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    console.log("values", values);
    const res = await dispatch(addVendor(values));
    if (res?.meta?.requestStatus === "fulfilled") {
      setVendorModalOpen(false);
    }
  };
  const onFinishFailed = (values: any) => {
    console.log("vlaue", values);
  };

  const validateMobileNumber = (
    rule: any,
    value: string,
    callback: (arg0?: string | undefined) => void
  ) => {
    const mobileNumberRegex = /^[0-9]{10,12}$/;
    if (!mobileNumberRegex.test(value)) {
      callback("Must be number between 10 to 12 digits");
    } else callback();
  };

  return (
    <div className="_modal_wrap">
      <Modal
        footer={false}
        centered
        open={vendormodalOpen}
        onCancel={() => setVendorModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <h3 className="_modal_header_poView">Add Vendor</h3>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="_vendor_container grid grid-cols-2 gap-12 mt-8">
            {/* --------------------- Grid 1 in Form------------------------ */}

            <div className="_grid1_vendor">
              <Form.Item
                label={<span className="_po_field_label">Name</span>}
                name="name"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                ]}
              >
                <Input className="h-[40px]" placeholder="Enter User Name" />
              </Form.Item>
              <Form.Item
                label={<span className="_po_field_label">Company Name</span>}
                name="companyName"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                ]}
              >
                <Input className="h-[40px]" placeholder="Enter company Name" />
              </Form.Item>
            </div>

            {/* ------------------------- Grid 2 in Form --------------------------- */}

            <div className="_grid2_vendor">
              <Form.Item
                label={<span className="_po_field_label">Email</span>}
                name="email"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,

                    message: "Required Field",
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input className="h-[40px]" placeholder="ABC@gmail.com" />
              </Form.Item>

              <Form.Item
                label={<span className="_po_field_label">Mobile Number</span>}
                name="phoneNumber"
                required
                tooltip="This is a required field"
                rules={[{ validator: validateMobileNumber }]}
              >
                <Input
                  className="h-[40px]"
                  placeholder="1234-1234-1234"
                  maxLength={12}
                  pattern="[0-9]{10,12}"
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label={<span className="_po_field_label">Company Address</span>}
            name="companyAddress"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,

                message: "Required Field",
              },
            ]}
          >
            <Input
              className="h-[40px]"
              placeholder="Street # 4, Clock tower  2nd floor near hens toy shop. TX"
            />
          </Form.Item>

          <div className="flex justify-center">
            <Form.Item>
              {/* ----------------- Button -------------------------- */}

              <Button
                type="primary"
                htmlType="submit"
                className="w-36 text-center text-lg"
              >
                Add
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddVendorModal;
