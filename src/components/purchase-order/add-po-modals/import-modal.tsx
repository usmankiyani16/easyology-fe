import React, { useState } from "react";
import "../../../sass/modals.scss";

import { Button, Form, Modal, Select } from "antd";

import ExportExcel from "../po-card/po-import/export-excel";
import Dummy_Add_PO from "../po-card/po-import/dummy-add-po";
import BulkUpload from "../po-card/po-import/bulk-upload";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setImportModalOpen } from "../../../store/po/po.slice";
// import UploadExcelTable from "../../purchase-order/po-card/po-import/import-excel";

const Importmodal: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const { importModalOpen } = useAppSelector((state) => state.purchaseOrders);
  const { vendors } = useAppSelector((state) => state.vendors);
  const [isVendorSelected, setIsVendorSelected] = useState(false);
  const [vendorId, setvendorId] = useState();

  const handleVendorSelect = (value: any) => {
    setvendorId(value);
    setIsVendorSelected(true);
  };
  const onFinish = (values: any) => {
    console.log("values ===========> ", values);
  };

  const selectProps = {
    dropdownStyle: { maxHeight: 140 },
  };

  return (
    <div>
      <Modal
        width="400px"
        footer={false}
        centered
        open={importModalOpen}
        onCancel={() => dispatch(setImportModalOpen(false))}
        destroyOnClose={true}
        className="_modal_wrap"



      >
        <h3 className="_modal_header text-red-500">Import PO In Bulk</h3>
        <Form
          /*   labelCol={{ span: 114 }} */
          wrapperCol={{ span: 14 }}
          layout="vertical"
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          autoComplete="off"
          className={`${!isVendorSelected && "h-52"} mt-10`}
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
            <Select
              className="_input"
              style={{ width: "210px" }}
              placeholder="Select Vendor"
              onSelect={handleVendorSelect}
              // {...selectProps}
              listHeight={140}
            >
              {vendors?.map((vendor: any, index: number) => (
                <Select.Option key={vendor?._id} value={vendor?._id} className="capitalize">
                  {vendor?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>

        {isVendorSelected && (
          <>
            <ExportExcel excelData={Dummy_Add_PO} fileName={"Export Excel"} />

            <BulkUpload vendorId={vendorId} />
            {/* <UploadExcelTable /> */}
          </>
        )}
      </Modal>
    </div>
  );
};

export default Importmodal;
