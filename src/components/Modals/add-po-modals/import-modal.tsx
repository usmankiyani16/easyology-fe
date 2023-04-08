import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal } from "antd";

import ExportExcel from "../../purchase-order/po-card/po-import/export-excel";
import Dummy_Add_PO from "../../purchase-order/po-card/po-import/dummy-add-po";
import BulkUpload from "../../purchase-order/po-card/po-import/bulk-upload";
// import UploadExcelTable from "../../purchase-order/po-card/po-import/import-excel";

const Importmodal: React.FC<any> = ({importModalOpen,setImportModalOpen,}) => {

  return (
    <div className="_modal_wrap">
      <Modal
      
        width="400px"
        footer={false}
        centered
        open={importModalOpen}
        onCancel={() => setImportModalOpen(false)}
        // destroyOnClose={true}
      >
        <h3 className="_modal_header text-red-500">Import PO In Bulk</h3>

        <ExportExcel excelData={Dummy_Add_PO} fileName={"Export Excel"} />

        <BulkUpload />
        {/* <UploadExcelTable /> */}

      </Modal>
    </div>
  );
};

export default Importmodal;
