import React, {useState} from "react";
import { Modal, Spin, Button } from "antd";
import './loader.scss'

const Loader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 


  return (
    <div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
        className="_loader"
        closable={false}

        // closable={false}
      >
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50"></div>
          <Spin size="large" />
        </div>
      </Modal>

      {/* <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50"></div>
          <Spin size="large" />
        {</div>/} */}
    </div>
  );
};

export default Loader;


