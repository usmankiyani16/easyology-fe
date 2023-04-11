import React, { useState, useRef } from "react";
import unchecked from "../../../assets/icons/layout/unchecked.png";
import tabler_maximize from "../../../assets/icons/layout/tabler_maximize.png";
import Laptop from "../../../assets/images/dashboard/laptop.png";
import "../modals.scss";
import { SearchOutlined } from "@ant-design/icons";
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
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { capitalize } from "../../../utils/functions/functions";
import { addPO } from "../../../store/po/po.slice";



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

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const vendor = vendors.find((data: any) => {
    return data._id === newObject.vendorId;
  });



  console.log(newObject, 'Object in Preview Modal')

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };


  // Delete Data
  const handleDeleteChange = (record: any) => {
    console.log("record", record);
    const newArray = myData?.filter((item: any) => item.id !== record?.id);
    console.log("newArray ++++++> ", newArray);

  }


  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

  });


  // Getting Data when submitting form 

  const myData = newObject?.products?.map(({ name, quantity, price }: any, index: any) => ({
    key: index,
    id: index + 1,
    name,
    quantity,
    price: `$${price}`
  }));

  const totalPrice = newObject?.products?.reduce((accumulator: number, product: { price: number; quantity: number; }) => {
    return accumulator + product.price * product.quantity;
  }, 0);


  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
    {
      dataIndex: "img",
      key: "image",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("Productname"),

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
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_: any, record: any) => (
    //     <div onClick={() => handleDeleteChange(record)}>Delete This Record</div>
    //   )
    // },
  ];

  const [isPartialChecked, setIsPartialChecked] = useState(true);
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
    newObject.poducts = newObject.products;
    let paidAmount
    if (isFullyPaidChecked) {
      paidAmount = totalPrice
    } else paidAmount = Number(values.price)
    delete newObject.products;
    let payload = {
      ...newObject,
      totalAmount: totalPrice,
      paidAmount,
      dueDate: values.dueDate.toISOString().substr(0, 10)
    }
    console.log(payload);
    dispatch(addPO(payload))

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
        destroyOnClose={true}
      >
        <h3 className="_modal_header_poView">Purchase Order Overview</h3>

        <div className="_preview_po mt-6">
          <img
            src={tabler_maximize}
            alt="tabler_maximize_icon"
            className="float-right m-2 cursor-pointer"
            onClick={() => {
              setPreviewMaxModalOpen(true);
              setPreviewModalOpen(false);
            }}
          />
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
          <div className="_footer flex justify-between mb-6">
            <div>
              <p className="ml-4 mb-6 text-lg">Total PO</p>
            </div>
            <div>
              <p className="text-red-500 mr-4 text-lg"> {"$" + totalPrice}</p>
            </div>
          </div>
        </div>

        <Form form={form} onFinish={handleFinish}>

          <div className="_footer_modal mt-4">
            <div className="_payment flex justify-between">
              <div>
                <p className="_payment_header">Payment Method</p>
              </div>
              <div className="flex items-center">
                <Checkbox checked={isPartialChecked} onChange={handlePartialChange} className="mr-24">
                  <p>Partial</p>
                </Checkbox></div>
              <div className="flex gap-6 items-center">

                <Checkbox checked={isFullyPaidChecked} onChange={handleFullyPaidChange}>
                  <p>Fully Paid</p>
                </Checkbox> </div>
            </div>
            {isPartialChecked &&
              <div className="_partial_price mt-4">
                <Form.Item label="Partial Payment Price" name="price">
                  {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
                  <Input
                    className="_input h-10 w-[280px] sm:ml-10 xs:ml-0"
                    placeholder="$0.00"
                    type="number"
                  />
                </Form.Item>
              </div>
            }

            <div className={`${!isPartialChecked && 'mt-4'}`}>
              <Form.Item label="Due Date" name="dueDate">
                <DatePicker
                  className=" sm:ml-[116px] xs:ml-4"
                />
              </Form.Item>
            </div>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>

        </Form>
      </Modal>
    </div>
  );
};

export default PreviewModal;
