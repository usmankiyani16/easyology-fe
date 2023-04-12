import React, { useState } from "react";
import { Modal, Spin, Button } from "antd";
import './loader.scss'

const Loader: React.FC = () => {
  return (
    <div>
      <Modal
        open={true}
        footer={null}
        className="_loader"
        closable={false}
        maskTransitionName=""
        transitionName=""

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
    // <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
    //   <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50"></div>
    //   <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
    //     <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50"></div>
    //     <Spin size="large" />
    //   </div>
    // </div>


  );
};

export default Loader;


