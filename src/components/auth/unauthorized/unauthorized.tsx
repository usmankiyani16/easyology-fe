import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-6xl font-bold mb-8">401</h1>
      <p className="text-lg mb-4">
        Oops! You are not authorized to access this page.
      </p>
      <Button type="primary" onClick={goBack}>
        Go back
      </Button>
    </div>
  );
};

export default Unauthorized;
