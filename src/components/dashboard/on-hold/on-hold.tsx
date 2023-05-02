import { Button, Card, Input, InputNumber, Modal } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { capitalize } from "../../../utils/functions/functions";
import "./onhold.scss";
import { invoices } from '../on-hold/on-hold-invoice/mock-data/invoice-data';
import OnHoldInvoice from "./on-hold-invoice/onhold-invoice";

const OnHoldModal: React.FC<any> = ({ isModalOpen, setIsModalOpen }) => {
  const [onHoldModal, setOnHoldModal] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const OpenHoldModal = () => {
    setIsModalOpen(false);
    setOnHoldModal(true);
    
  };
  return (
    <div className="_onhold">
      <OnHoldInvoice
        onHoldModal={onHoldModal}
        setOnHoldModal={setOnHoldModal}
        setIsModalOpen= {setIsModalOpen}
      />
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
          <div className="text-center">
            <span className="_primary-color text-2xl mt-4">
              Invoice On Hold
            </span>
          </div>

          <div style={{ height: "365px", overflowY: "auto" }}>
            {invoices?.map((data: any) => (
              <Card
                className="_onhold cursor-pointer mb-4"
                onClick={OpenHoldModal}
              >
                {/* grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1  */}
                <div className="flex w-full justify-between">
                  <div className={`flex flex-col justify-between gap-2`}>
                    <div className="flex gap-4">
                      <span className="font-bold whitespace-nowrap">
                        Invoice Number:
                      </span>
                      <span className="_primary-color">
                        #{`${data.invoiceNo}`}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span className="_grey-color whitespace-nowrap">
                        Customer Type:
                      </span>
                      <span className=" _label-grey">
                        {capitalize(data.customerType)}
                      </span>
                    </div>
                    <div className="flex gap-4 ">
                      <span className="_grey-color whitespace-nowrap">
                        Conatct Details:
                      </span>
                      <span className=" ">{data.contactDetails}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-2xl self-end">
                      $ {`${data.price}`}
                    </span>

                    <div className="">
                      <span className="_grey-color  ">
                        Hold By:
                      </span>

                      <span className="w-8">{data.holdBy}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OnHoldModal;