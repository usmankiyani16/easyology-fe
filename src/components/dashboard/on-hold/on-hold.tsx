import { Button, Card, Input, InputNumber, Modal } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { capitalize } from "../../../utils/functions/functions";
import "./onhold.scss";

const OnHoldModal: React.FC<any> = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="_onhold">
      <Modal
        // width={360}
        footer={false}
        centered
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col gap-4 ">
          <div className="self-center mt-4">
            <Input
              className="w-44 h-8"
              prefix={<SearchOutlined />}
              placeholder="Search invoice"
            />
          </div>
          <Card className="_onhold">
            <div className="flex w-full justify-between grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 ">
              <div className={`flex flex-col justify-between gap-2 `}>
                <div className="flex gap-4">
                  <span className="font-bold whitespace-nowrap">
                    Invoice Number:
                  </span>
                  <span className="_primary-color">#{`7855`}</span>
                </div>
                <div className="flex gap-4">
                  <span className="_grey-color whitespace-nowrap">
                    Customer Type:
                  </span>
                  <span className=" _label-grey">
                    {capitalize("wholeseller")}
                  </span>
                </div>
                <div className="flex gap-4 ">
                  <span className="_grey-color whitespace-nowrap">
                    Conatct Details:
                  </span>
                  <span className=" ">0325448454</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default OnHoldModal;
