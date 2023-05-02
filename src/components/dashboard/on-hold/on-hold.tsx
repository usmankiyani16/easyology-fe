import { Button, Card, Input, InputNumber, Modal, Pagination } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { capitalize } from "../../../utils/functions/functions";
import "./onhold.scss";
import OnHoldInvoice from "./on-hold-invoice/onhold-invoice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getProducts } from "../../../store/products/products-slice";
import { getHoldInvoices } from "../../../store/order/order-slice";

const OnHoldModal: React.FC<any> = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useAppDispatch();
  const { holdInvoices } = useAppSelector((state) => state.order);
  const [onHoldModal, setOnHoldModal] = useState(false);
  const [singleOnHoldInvoice, setSingleOnHoldInvoice] = useState<any>();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const OpenHoldModal = (data: any) => {
    setSingleOnHoldInvoice(data);
    setIsModalOpen(false);
    setOnHoldModal(true);
  };
  const searchInvoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value?.trim();
    console.log(value);
    let queryParam: any = {};
    if (value) {
      queryParam = {
        invoiceNumber: value,
      };
      dispatch(getHoldInvoices(queryParam));
    } else {
      dispatch(getHoldInvoices(queryParam));
    }
  };
  const handlePagination = async (value: Number) => {
    let queryParam: any = {};
    if (value) {
      queryParam = {
        page: value,
      };
      dispatch(getHoldInvoices(queryParam));
    }
  };
  return (
    <div className="_onhold">
      <OnHoldInvoice
        key={singleOnHoldInvoice?._id}
        singleOnHoldInvoice={singleOnHoldInvoice}
        onHoldModal={onHoldModal}
        setOnHoldModal={setOnHoldModal}
        setIsModalOpen={setIsModalOpen}
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
              onChange={searchInvoice}
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
            {holdInvoices?.holdInvoice?.map((data: any) => (
              <Card
                className="_onhold cursor-pointer mb-4"
                onClick={() => OpenHoldModal(data)}
              >
                {/* grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1  */}
                <div className="flex w-full justify-between">
                  <div className={`flex flex-col justify-between gap-2`}>
                    <div className="flex gap-4">
                      <span className="font-bold whitespace-nowrap">
                        Invoice Number:
                      </span>
                      <span className="_primary-color">
                        #{`${data?.invoiceNumber}`}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span className="_grey-color whitespace-nowrap">
                        Customer Type:
                      </span>
                      <span className=" _label-grey">
                        {capitalize(data?.customerType ?? "Not available")}
                      </span>
                    </div>
                    <div className="flex gap-4 ">
                      <span className="_grey-color whitespace-nowrap">
                        Conatct Details:
                      </span>
                      <span className=" ">
                        {data?.contactDetails ?? "Not available"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-2xl self-end">
                      $ {`${data?.totalAmount}`}
                    </span>

                    <div className="">
                      <span className="_grey-color  ">Hold By:</span>

                      <span className="w-8">
                        {data.holdBy ?? "Not available"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {holdInvoices?.holdInvoice?.length ? (
          <Pagination
            onChange={handlePagination}
            className="flex justify-end"
            defaultCurrent={1}
            defaultPageSize={8}
            total={holdInvoices?.pagination?.totalCount}
          />
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default OnHoldModal;
