import React, { useEffect, useState } from "react";
import { Table, Button, Form, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import "../../../../sass/modals.scss";
import PreviewMax from "../../add-po-modals/preview-max";
import { useAppSelector } from "../../../../store/store";

const BulkUpload: React.FC<any> = ({ vendorId }) => {
  const { importModalOpen } = useAppSelector((state) => state.purchaseOrders);
  const [excelData, setExcelData] = useState<any>([]);
  // const [profilemodalOpen, setProfileModalOpen] = useState(false);
  const [fileDeleted, setFileDeleted] = useState(false);
  const [previewMaxmodalOpen, setPreviewMaxModalOpen] = useState(false);

  const [coloumn, setColoumn] = useState<any>();
  const [dataSource, setDataSource] = useState<any>();

  const [form] = Form.useForm();

  // let keys = []
  // let objectData

  // useEffect(() => {
  //   setImportModalOpen(false)
  // }, [])

  const handleUpload = (file: Blob) => {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const dataFromExcel = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const keys: any = dataFromExcel.shift(); // remove the headers
      const objectData = dataFromExcel.map((row: any) => {
        return keys.reduce(
          (
            obj: { [x: string]: any },
            key: string | number,
            index: string | number
          ) => {
            obj[key] = row[index];
            return obj;
          },
          {}
        );
      });

      setColoumn(keys);
      setDataSource(objectData);

      setExcelData(dataFromExcel);
      /* setProfileModalOpen(true); */
      setPreviewMaxModalOpen(true);
    };
    fileReader.readAsArrayBuffer(file);

    // setImportModalOpen(false)
  };

  const columns: any =
    excelData[0] &&
    excelData[0].map((col: any, index: string) => ({
      title: col,
      dataIndex: index,
      key: index,
      render: (text: any, record: { key: string }) => {
        return (
          <>
            <Form.Item name={index + "-" + record.key} initialValue={text}>
              <input />
            </Form.Item>
          </>
        );
      },
    }));

  return (
    <div>
      {previewMaxmodalOpen && (
        <PreviewMax
          previewMaxmodalOpen={previewMaxmodalOpen}
          setPreviewMaxModalOpen={setPreviewMaxModalOpen}
          dataSource={dataSource}
          keys={coloumn}
          vendorId={vendorId}
          // dataSource={dataSource} columns={coloumn}
        />
      )}

      {/* <PreviewMax dataSource={dataSource} columns={coloumn} /> */}

      <Form form={form}>
        <Form.Item
          name="file"
          rules={[{ required: true, message: "Please select an Excel file." }]}
        >
          <Upload
            accept=".xlsx, .xls"
            beforeUpload={handleUpload}
            multiple={false}
            maxCount={1}
          >
            <Button
              className="className='w-[200px] ml-[68px] mt-10 m-auto"
              icon={<UploadOutlined />}
            >
              Select Excel File
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BulkUpload;
