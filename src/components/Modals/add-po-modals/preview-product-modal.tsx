import React, { useState, useRef } from "react";
import unchecked from "../../../assets/icons/layout/unchecked.png";
import tabler_maximize from "../../../assets/icons/layout/tabler_maximize.png";
import Laptop from "../../../assets/images/dashboard/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../modals.scss";

import type { InputRef } from "antd";
import {
  Input,
  Space,
  Table,
  Button,
  Modal,
  Form,
  DatePickerProps,
  DatePicker,
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import PreviewMax from "./preview-max";

import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppSelector } from "../../../store/store";
import { capitalize } from "../../../utils/functions/functions";
import Payment from "./payment";



interface DataType {
  key: string;
  id: string;
  // img: any;
  Productname: string;
  QTY: string;
  Price: number;
}

type DataIndex = keyof DataType;








const PreviewModal: React.FC<any> = ({ previewmodalOpen, setPreviewModalOpen, newObject }) => {
  const { vendors } = useAppSelector(state => state.vendors)
  const [previewMaxmodalOpen, setPreviewMaxModalOpen] = useState(false);

 

  const [form] = Form.useForm();



  const vendor = vendors.find((data: any) => {
    return data._id === newObject.vendorId;
  });



  console.log(newObject, 'Object in Preview Modal')





 


  // Getting Data when submitting form 

  const myData = newObject?.product?.map(({ product, quantity, price }: any, index: any) => ({
    key: index,
    id: index + 1,
    product,
    quantity,
    price: `$${price}`
  }));

  const totalPrice = newObject?.product?.reduce((accumulator: number, product: { price: number; quantity: number; }) => {
    return accumulator + product.price * product.quantity;
  }, 0);


  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
  /*   {
      dataIndex: "img",
      key: "image",
    }, */
    {
      title: "Product Name",
      dataIndex: "product",
      key: "name",
      width: "30%",

    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "age",
      width: "20%",

    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sortDirections: ["descend", "ascend"],
    },
    {
      key: "10",
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                // onEditProduct(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                // onDeleteProduct(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  // Consoling Date

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
  };
  const [isPartialChecked, setIsPartialChecked] = useState(false);
  const [isFullyPaidChecked, setIsFullyPaidChecked] = useState(false);

  const handlePartialChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsPartialChecked(isChecked);
    setIsFullyPaidChecked(!isChecked);
  };

  const handleFullyPaidChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setIsFullyPaidChecked(isChecked);
    setIsPartialChecked(!isChecked);
  };

  const handleFinish = (values: any) => {
    // Handle the edited data
    console.log(values);
  };

  return (
    <div className="_modal_wrap">
      <PreviewMax
        previewMaxmodalOpen={previewMaxmodalOpen}
        setPreviewMaxModalOpen={setPreviewMaxModalOpen}
        previewmodalOpen={previewmodalOpen}
        setPreviewModalOpen={setPreviewModalOpen}
      />

      <Modal
        footer={false}
        centered
        open={previewmodalOpen}
        onCancel={() => setPreviewModalOpen(false)}
        maskClosable={false} 
        // onCancel={true}
        destroyOnClose={true}
      >
        <h3 className="_modal_header_poView">Purchase Order Overview</h3>

        <div className="_preview_po mt-6">
          <br />

          <div className="m-4">
            <p className="_modal_para">
              Vendor Name:{" "}
              <span className="text-stone-400 font-bold ml-2">
                {capitalize(vendor?.name)}
              </span>
            </p>
            {/* <p className="_modal_para">
              PO Number : <span className="text-red-500 ml-4"> #456 </span>
            </p> */}
          </div>


          <Table
            columns={columns}
            dataSource={myData}
            className="mt-4"
          
            pagination={false}
            scroll={{ y: 120 }}
          />
          <div className="_footer flex justify-between mt-4 ">
            <div>
              <p className="ml-4 mb-4 text-[16px]">Total PO</p>
            </div>
            <div>
              <p className="text-red-500 mr-4 text-[16px]"> {"$" + totalPrice}</p>
            </div>
          </div>
        </div>

        <Payment />

      
      </Modal>
    </div>
  );
};

export default PreviewModal;
