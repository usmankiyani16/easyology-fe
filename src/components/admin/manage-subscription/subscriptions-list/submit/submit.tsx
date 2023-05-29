import React from "react";
import { Button, Modal, Form, Upload, Input } from "antd";

interface SubmitData {
  isModalOpen: any;
  setIsModalOpen: any;
  handleModalCancel: any;
  handleModalConfirm: any;

  submittedValues: any;
}

const Submit: React.FC<SubmitData> = ({
  isModalOpen,
  setIsModalOpen,
  handleModalConfirm,
  handleModalCancel,
  submittedValues,
}) => {
  console.log(submittedValues, "hollu");

  return (
    <div>
      <Modal
        width="372px"
        footer={false}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <div className="flex flex-col items-center gap-8 text-center">
          <span className=" mt-4 text-lg">
            You are turning ON a subscription for{" "}
            <span className="_success_color ml-[4px] mr-[4px] ">
              {submittedValues?.storeName}{" "}
            </span>{" "}
            with payment type
            <span className="_primary-color ml-[4px] mr-[4px] capitalize">
              {submittedValues?.paymentType}
            </span>
            {submittedValues?.paymentType === "check" ? (
              <span className="_primary-color ml-[4px] mr-[4px] ">
                ({submittedValues.checkNumber})
              </span>
            ) : (
              ""
            )}
            will be charged the total of ${" "}
            <span className="_success_color">{submittedValues?.subTotal}</span>.
            <br />
            <span> Do you want to proceed?</span>
          </span>

          <div className="flex justify-between gap-6">
            <Button key="yes" type="primary" onClick={handleModalConfirm}>
              Yes
            </Button>
            <Button key="no" onClick={handleModalCancel}>
              No
            </Button>
            
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Submit;
