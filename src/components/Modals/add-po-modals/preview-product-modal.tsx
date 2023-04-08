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



interface DataType {
  key: string;
  id: string;
  // img: any;
  Productname: string;
  QTY: string;
  Price: number;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    id: "#001",
    // img: Laptop,
    Productname: "Laptop Lenovo Series 4",
    QTY: "x8",
    Price: 5000,
  },
  {
    key: "2",
    id: "#002",
    // img: Laptop,
    Productname: "Laptop Lenovo Series 4",
    QTY: "x6",
    Price: 3000,
  },
  {
    key: "3",
    id: "#003",
    // img: Laptop,
    Productname: "Ipads Lenovo Series ",
    QTY: "x3",
    Price: 12000,
  },
  {
    key: "4",
    id: "#004",
    // img: Laptop,
    Productname: "Mobile Phone Lenovo Series ",
    QTY: "x3",
    Price: 88000,
  },
];

const PreviewModal: React.FC<any> = ({previewmodalOpen,setPreviewModalOpen}) => {
  const [previewMaxmodalOpen, setPreviewMaxModalOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

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
      dataIndex: "Productname",
      key: "name",
      width: "50%",
      ...getColumnSearchProps("Productname"),
      
    },
    {
      title: "QTY",
      dataIndex: "QTY",
      key: "age",
      width: "20%",
      // ...getColumnSearchProps('age'),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "price",
      // ...getColumnSearchProps("Price"),
      // sorter: (a, b) => a.Price.length - b.Price.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  // Consoling Date

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log( dateString);
  };
  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    }

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
              Vendor Name :{" "}
              <span className="text-stone-400 font-bold ml-2">
             
                ABC Company
              </span>
            </p>
            <p className="_modal_para">
              PO Number : <span className="text-red-500 ml-4"> #456 </span>
            </p>
          </div>
          

          <Table
            columns={columns}
            dataSource={data}
            className="mt-4"
            pagination={{ defaultPageSize: 2, hideOnSinglePage: true }}
          />
          <div className="_footer flex justify-between mb-6">
            <div>
              <p className="ml-4 mb-6 text-lg">Total PO</p>
            </div>
            <div>
              <p className="text-red-500 mr-4 text-lg"> $3500</p>
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
              <Checkbox onChange={onChangeCheckBox } className="mr-24"><p>Partial</p></Checkbox>
            </div>
            <div className="flex gap-6 items-center">
       
             <Checkbox onChange={onChangeCheckBox}> <p>Fully Paid</p> </Checkbox>
            </div>
          </div>

          <div className="_partial_price mt-4">
            <Form.Item label="Partial Payment Price" name="Price">
              {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
              <Input
                className="_input h-10 w-[280px] sm:ml-10 xs:ml-0"
                placeholder="$0.00"
                type="number"
              />
            </Form.Item>
          </div>

          <Form.Item label="Due Date" name="Due Date">
            <DatePicker
              onChange={onChange}
              className=" sm:ml-[116px] xs:ml-4"
            />
          </Form.Item>

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
