import React, { useState } from "react";
import tabler_minimize from "../../../assets/icons/layout/tabler_minimize.png";
import "../modals.scss";

import { Button, Modal, Form, Upload, Input, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Payment from "./payment";

const PreviewMax: React.FC<any> = ({
  previewMaxmodalOpen,
  setPreviewMaxModalOpen,
  previewmodalOpen,
  setPreviewModalOpen,
  dataSource,
  keys,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>();

  console.log(dataSource, "nikkamma dataSource");
  // console.log(columns , 'nikkamma coloumn')

  // const [data, setData] = useState(dataSource)

  const [editdataSource, setEditDataSource] = useState();

  // const [dataSource, setDataSource] = useState([
  //   {
  //     id: "#001",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  // hello
  //   {
  //     id: "#002",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#003",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#004",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },

  //   {
  //     id: "#005",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#006",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#007",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#008",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#009",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#010",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#011",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#012",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  //   {
  //     id: "#013",
  //     image: "None",
  //     serial_No: "234",
  //     product: "Lenovo",
  //     category: "Electronics",
  //     type: "Laptop",
  //     color: "Grey",
  //     qty: "x2",
  //     price: "4400",
  //   },
  // ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Image",
      dataIndex: "image",
    },
    {
      key: "3",
      title: "Serial #",
      dataIndex: "serial",
    },
    {
      key: "4",
      title: "Product",
      dataIndex: "product",
    },
    {
      key: "5",
      title: "Category",
      dataIndex: "category",
    },
    {
      key: "6",
      title: "Type",
      dataIndex: "productType",
    },
    {
      key: "7",
      title: "Color",
      dataIndex: "color",
    },
    {
      key: "8",
      title: "QTY",
      dataIndex: "quantity",
    },

    {
      key: "9",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "10",
      title: "Actions",
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditProduct(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteProduct(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  console.log(keys, "Coloumns agye");

  // Getting Data when uploading Bulk
  // Threshold and productDesc etc agr bhejna hai to to map s leliya hai

  const myData = dataSource?.map(
    (
      {
        product,
        quantity,
        price,
        productDescription,
        threshold,
        color,
        category,
        productType,
        serial,
      }: any,
      index: any
    ) => ({
      key: index,
      id: index + 1,
      product,
      quantity,
      price,
      productDescription,
      threshold,
      color,
      category,
      productType,
      serial,
      image: "none",
    })
  );

  const onDeleteProduct = (record: any) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Product?",
      centered: true,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setEditDataSource((pre) => {
          return pre.filter((product: { id: any }) => product.id !== record.id);
        });
      },
    });
  };
  const onEditProduct = (record: React.SetStateAction<any>) => {
    setIsEditing(true);

    setEditingProduct({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div className="_modal_wrap">
      {/* ---------------- Model for Products ----------------- */}

      <Modal
        footer={false}
        
        centered
        open={previewMaxmodalOpen}
        onCancel={() => setPreviewMaxModalOpen(false)}
        maskClosable={false}
        destroyOnClose={true}
        width="1200px"
      >
        <h3 className="_modal_header">Product Overview</h3>
        <br />
        <div className="m-4">
          <p className="_modal_para">
            Vendor Name :
            <span className="text-stone-400 font-bold ml-2">ABC Company</span>{" "}
          </p>
          <p className="_modal_para">
            PO Number : <span className="text-red-500 ml-4"> #456 </span>
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={myData}
          // pagination={{ defaultPageSize: 12, hideOnSinglePage: true }}
          pagination={false}
          scroll={{ y: 200 }}
        >
          {" "}
        </Table>

        <Payment />
        
        {/* ---------------------------- Edit Model ----------------------------------------- */}
        <Modal
          centered
          width="1200px"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setEditDataSource((pre: { id: any }[]): any => {
              return pre.map((product: { id: any }) => {
                if (product.id === editingProduct.id) {
                  return editingProduct;
                } else {
                  return product;
                }
              });
            });
            resetEditing();
          }}
          destroyOnClose={true}
        >
          <h3 className="_modal_header">Edit Product</h3>

          <div className="grid grid-cols-2 gap-16 mt-6">
            <div>
              <label className="_label_input" htmlFor="">
                Seriol No
              </label>
              <Input
                value={editingProduct?.serial}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, serial: e.target.value };
                  });
                }}
              />

              <label className="_label_input" htmlFor="">
                Product
              </label>
              <Input
                value={editingProduct?.product}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, product: e.target.value };
                  });
                }}
              />
              <label className="_label_input" htmlFor="">
                Category
              </label>
              <Input
                value={editingProduct?.category}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, category: e.target.value };
                  });
                }}
              />
              <label className="_label_input" htmlFor="">
                Color
              </label>
              <Input
                value={editingProduct?.color}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, color: e.target.value };
                  });
                }}
              />
            </div>

            <div>
              <label className="_label_input" htmlFor="">
                Type
              </label>
              <Input
                value={editingProduct?.productType}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, productType: e.target.value };
                  });
                }}
              />{" "}
              <label className="_label_input" htmlFor="">
                QTY
              </label>
              <Input
                value={editingProduct?.quantity}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, quantity: e.target.value };
                  });
                }}
              />{" "}
              <label className="_label_input" htmlFor="">
                Price
              </label>
              <Input
                value={editingProduct?.price}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, price: e.target.value };
                  });
                }}
              />
            </div>
          </div>
        </Modal>
      </Modal>
    </div>
  );
};

export default PreviewMax;
