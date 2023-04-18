import React, { useState } from "react";
import "../modals.scss";

import { Button, Form, Modal, Select } from "antd";

import ExportExcel from "../../purchase-order/po-card/po-import/export-excel";
import Dummy_Add_PO from "../../purchase-order/po-card/po-import/dummy-add-po";
import BulkUpload from "../../purchase-order/po-card/po-import/bulk-upload";
import { capitalize } from "../../../utils/functions/functions";
import { useAppSelector } from "../../../store/store";
// import UploadExcelTable from "../../purchase-order/po-card/po-import/import-excel";

const Importmodal: React.FC<any> = ({ importModalOpen, setImportModalOpen, }) => {
  const { vendors } = useAppSelector((state) => state.vendors);
  const [isVendorSelected, setIsVendorSelected] = useState(false);
  const [vendorId, setvendorId] = useState()

  const handleVendorSelect = (value: any) => {
    setvendorId(value)
    setIsVendorSelected(true);
  };
  const onFinish = (values: any) => { }
  return (
    <div className="_modal_wrap">
      <Modal

        width="400px"
        footer={false}
        centered
        open={importModalOpen}
        onCancel={() => setImportModalOpen(false)}
        destroyOnClose={true}
      >
        <h3 className="_modal_header text-red-500">Import PO In Bulk</h3>
        <Form
          /*   labelCol={{ span: 114 }} */
          wrapperCol={{ span: 14 }}
          layout='vertical'
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          autoComplete="off"
          className="mt-10"
        >
          <Form.Item
            className="ml-[66px]"

            label={<span className="_po_field_label">Select Vendor</span>}
            name="selectVendor"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                // type: 'email',
                message: "Required Field",
              },
              {
                type: "string",
              },
            ]}
          >
            <Select className="_input" style={{ width: '210px' }} placeholder="Select Vendor" onSelect={handleVendorSelect}>
              {vendors?.map((vendor: any, index: number) => (
                <Select.Option key={vendor?._id} value={vendor?._id}>
                  {capitalize(vendor?.name)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

        </Form>

        {isVendorSelected && (
          <>

            <ExportExcel excelData={Dummy_Add_PO} fileName={"Export Excel"} />

            <BulkUpload setImportModalOpen={setImportModalOpen} vendorId={vendorId} />
            {/* <UploadExcelTable /> */}


          </>
        )}
      </Modal>
    </div>
  );
};

export default Importmodal;
