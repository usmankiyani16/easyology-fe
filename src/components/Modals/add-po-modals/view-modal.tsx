import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Upload, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { laptopImg } from "../../../assets/images";
import "../modals.scss";

const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Viewmodal: React.FC<any> = ({
  viewModalOpen,
  setViewModalOpen,
  purchaseOrders,
}) => {
  console.log(purchaseOrders, "Purchase Order hai ye");
  return (
    <div className="_modal_wrap _view_modal_wrap">
      <Modal
        width="471px"
        footer={false}
        centered
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        destroyOnClose={true}
      >
        <h4 className="_po_Number text-xl mt-8">
          PO Number: <span className="text-red-500">#456</span>
        </h4>
        <h4 className="_company_name">Lenovo Company</h4>
        <p>
          Sheduled: <span> Friday 12 AM EST</span>
        </p>

        <div className="mt-2">
          <p>
            Product ID <span>#6784</span>
          </p>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-3">
              <img
                src={laptopImg}
                alt="Products"
                className="w-[59px] h-[66px]"
              />
              <p className="w-[112px] h-[66px]">Laptop Lenovo Series 4</p>
            </div>
            <div>
              <p>x2</p>
            </div>
            <div>
              <p>$ 599.00</p>
            </div>
          </div>
        </div>

        <div className="_contact_details mt-4">
          <p>
            Address{" "}
            <span
              style={{ width: "317px", height: "44px" }}
              className="w-[317px] h-[44px]"
            >
              Street #05, Times square, Buidling icon tower, Near Timmies.
              Dallas/Texas.
            </span>
          </p>
          <p>
            Contact: <span>+001 48976 543</span>
          </p>
          <p>
            Payment: <span className="text-red-500">Full Payment</span>
          </p>
          <p>
            Delivery Type: <span className="text-red-500">Standard</span>
          </p>
        </div>

        <div className="_footer flex justify-between mt-6">
          <div className="_names">
            <p>Total Discount</p>
            <p>Discount</p>
            <p>
              Sales Tax <span>(2%)</span>
            </p>
            <p>Total</p>
          </div>

          <div className="_price">
            <p>1500</p>
            <p>1200</p>
            <p>9000</p>
            <p>2700</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Viewmodal;
