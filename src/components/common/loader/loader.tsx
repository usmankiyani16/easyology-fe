import React from "react";
import { Modal, Spin } from "antd";

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50"></div>
      <Spin size="large" />
    </div>

  );
};

export default Loader;
