import React from "react";
import { Button } from "antd";

const ExportExcel = () => {
  const handleDownload = () => {
    const fileUrl =
      "https://easyology-templates.s3.amazonaws.com/purchase-order.xlsx";

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "purchase-order.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button
        className="w-[210px] ml-[68px] flex justify-center"
        onClick={handleDownload}
        type="primary"
      >
        Download Excel
      </Button>
    </div>
  );
};

export default ExportExcel;
