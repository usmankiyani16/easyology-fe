import React from "react";
import { Button, Modal, Form, Upload, Input } from "antd";

interface SubmitData {
  isModalOpen: any;
  setIsModalOpen: any;
  handleModalCancel: any;
  handleModalConfirm: any;
}

const Submit: React.FC<SubmitData> = ({
  isModalOpen,
  setIsModalOpen,
  handleModalConfirm,
  handleModalCancel,
}) => {
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
            You are turning ON a subscription for Wall-mart and the account
            number/Credit card ending with 2044 will be charged the total of
            $250.
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
            ,
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Submit;
