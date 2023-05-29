import { useState } from "react";
import "../../../sass/modals.scss";

import { Modal, Form, Select, Button, Input, Row, Col } from "antd";
import { useAppDispatch } from "../../../store/store";
import { getPOS, payPO } from "../../../store/po/po.slice";
import Pay from "../../common/pay/pay";

const PartialPay: React.FC<any> = ({
  paymentModalOpen,
  setPaymentModalOpen,
  poId,
  paidAmount,
  setViewModalOpen,
}) => {
  const dispatch = useAppDispatch();

  const onFinish: any = async (values: any) => {
    console.log(values, "Ye values hai");
    let payload: any = {
      poId,
      paidAmount,
      paymentTypeDetails: {},
    };
    payload.paymentType = values?.payCategory;
    if (values?.payCategory === "check") {
      payload.paymentTypeDetails.checkNumber = values?.checkNumber;
    }
    console.log("payload", payload);

    const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
    // payloaduserId = data?._id;
    // payload.storeId = data?.storeId;
    const res = await dispatch(payPO(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      setViewModalOpen(false);
      let queryParam = {
        page: 1,
      };
      dispatch(getPOS(queryParam));
    }
  };

  return (
    <div>
      <Modal
        width="400px"
        footer={false}
        centered={true}
        open={paymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
        bodyStyle={{
          height: "200px",
          display: "flex",
          // justifyContent: "",
          justifySelf: "start",
        }}
      >
        <Pay onFinish={onFinish} showButton={false} />
      </Modal>
    </div>
  );
};

export default PartialPay;
