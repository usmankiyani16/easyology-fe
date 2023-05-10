import { useState } from "react";
import "../../../sass/modals.scss";

import { Modal, Form, Select, Button, Input } from "antd";
import { useAppDispatch } from "../../../store/store";
import { getPOS, payPO } from "../../../store/po/po.slice";
import Pay from "../../common/pay/pay";

const PayModal: React.FC<any> = ({
  paymentModalOpen,
  setPaymentModalOpen,
  poId,
  paidAmount,
  setViewModalOpen,
}) => {
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  function handleSelect(value: any) {
    setSelectedOption(value);
  }

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
        width="372px"
        footer={false}
        centered
        open={paymentModalOpen}
        onCancel={() => setPaymentModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <Pay
          onFinish={onFinish}
          handleSelect={handleSelect}
          selectedOption={selectedOption}
        />
      </Modal>
    </div>
  );
};

export default PayModal;
