import React, { useState } from "react";
import { Table, Button, Form, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import "../../../Modals/modals.scss";

const BulkUpload = () => {
  const [excelData, setExcelData] = useState([]);
  // const [profilemodalOpen, setProfileModalOpen] = useState(false);
  const [fileDeleted, setFileDeleted] = useState(false);
  const [form] = Form.useForm();

  const handleUpload = (file: Blob) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const dataFromExcel = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setExcelData(dataFromExcel);
      /* setProfileModalOpen(true); */
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleFinish = (values: any) => {
    // Handle the edited data
    console.log(values);
  };
  const handleDeleteFile = () => {
    setExcelData([]);
    setFileDeleted(true);
  };

  const columns:any =
    excelData[0] &&
    excelData[0].map((col: any, index: string) => ({
      title: col,
      dataIndex: index,
      key: index,
      render: (text: any, record: { key: string; }) => {
        return (
          <>
          <Form.Item name={index + "-" + record.key} initialValue={text}>
            <input />
          </Form.Item>
        
        </>
        
        );

        
      },
     
    }));

     columns?.push( {
      title: "col",
      dataIndex: "index",
      key: "index",

    })

  const dataSource = excelData
    .slice(1)
    .map((row, index) => ({ ...row, key: index }));
  console.log(dataSource, 'Data source hu m');

  return (
    <div>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="file"
          rules={[{ required: true, message: "Please select an Excel file." }]}
        >
          <Upload accept=".xlsx, .xls" beforeUpload={handleUpload} multiple={false} maxCount={1}>
            <Button className="className='w-[200px] ml-[68px] mt-10 m-auto" icon={<UploadOutlined />}>Select Excel File</Button>
          </Upload>
        </Form.Item>

        {/*   <Modal
        width='372px'
        footer={false}
        centered
        open={profilemodalOpen}
        onCancel={() => setProfileModalOpen(false)}
        destroyOnClose={true}
      > */}

        {fileDeleted ? null : (
          <>
            {columns && (
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ defaultPageSize: 3, hideOnSinglePage: true }}
                rowKey="key"
              />
            )}
            {/* </Modal> */}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </>
        )}
        {/* </Modal> */}
      </Form>
      
    </div>
  );
};

export default BulkUpload;
