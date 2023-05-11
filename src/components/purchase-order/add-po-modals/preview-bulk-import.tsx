import React, { useState } from "react";
import "../../../sass/modals.scss";

import { Modal, Input, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Payment from "./payment";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { uploadMedia } from "../../../store/media/media-slice";
import { Toast } from "../../common/toast/toast";
import { setImportModalOpen } from "../../../store/po/po.slice";

const PreviewMax: React.FC<any> = ({
  previewMaxmodalOpen,
  setPreviewMaxModalOpen,
  previewmodalOpen,
  setPreviewModalOpen,
  dataSource,
  vendorId,
  paidAmount,
  keys,
}) => {
  const dispatch = useAppDispatch();
  const { vendors } = useAppSelector((state) => state.vendors);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>();
  const vendorData = vendors?.find((vendor: any) => {
    if (vendor?._id == vendorId) {
      return { vendor };
    }
  });

  const imageUpload = async (e: any, index: number) => {
    if (e.target.files) {
      let file = e.target.files[0];
      const res = await dispatch(uploadMedia(file));
      if (res?.meta?.requestStatus == "fulfilled") {
        const fileName = res?.payload?.data?.fileName;
        setDataSource1((prevState: any) => {
          const newData = [...prevState];
          // const index = newData.findIndex((data: any) => data.id === id);
          newData[index].image = fileName || "";
          return newData;
        });
      } else {
        Toast("Something went wrong", "error");
      }
    }
  };

  const [dataSource1, setDataSource1] = useState(
    dataSource?.map((data: any, index: number) => ({
      id: index + 1,
      categoryName: data?.category,
      image: "",
      serialNumber: data?.serial,
      name: data?.product,
      subCategoryName: data?.productType,
      quantity: Number(data?.quantity),
      amount: Number(data?.price),
      options: {
        color: data?.color,
        size: data?.size,
      },
      description: data?.productDescription,
      threshold: data?.threshold,
      iemiNumber: data?.imeiNumber,
    }))
  );

  const totalPrice = dataSource1?.reduce(
    (accumulator: number, product: { amount: number; quantity: number }) => {
      return accumulator + Number(product.amount) * Number(product.quantity);
    },
    0
  );

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      key: "2",
      title: "Image",
      width: "200px",
      dataIndex: "image",
      render: (value: any, record: any, index: number) => {
        if (value) {
          return value;
        } else {
          return (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => imageUpload(e, index)}
            />
          );
        }
      },
    },
    {
      key: "3",
      title: "Serial #",
      dataIndex: "serial",
    },
    {
      key: "4",
      title: "Product",
      dataIndex: "name",
    },
    {
      key: "5",
      title: "Category",
      dataIndex: "categoryName",
    },
    {
      key: "6",
      title: "Type",
      dataIndex: "subCategoryName",
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
  const [showUpload, setShowUpload] = useState(true);

  const onDeleteProduct = (record: any) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this Product?",
      centered: true,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource1((pre: any) => {
          return pre?.filter(
            (product: { id: any }) => product.id !== record.id
          );
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
    <div>
      {/* ---------------- Model for Products ----------------- */}

      <Modal
        footer={false}
        centered
        open={previewMaxmodalOpen}
        onCancel={() => setPreviewMaxModalOpen(false)}
        maskClosable={false}
        destroyOnClose={true}
        width="1200px"
        className="_modal_wrap"
      >
        <h3 className="_modal_header">Product Overview</h3>
        <br />
        <div className="m-4">
          <p className="_modal_para">
            Vendor Name :
            <span className="text-stone-400 font-bold ml-2">
              {vendorData?.name}
            </span>{" "}
          </p>
          <p className="_modal_para">
            {/* PO Number : <span className="text-red-500 ml-4"> #456 </span> */}
          </p>
        </div>
        <div style={{ overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={dataSource1}
          // pagination={{ defaultPageSize: 12, hideOnSinglePage: true }}
          pagination={false}
          scroll={{ y: 200 , x: 'max-content' }}
          className="whitespace-nowrap"

        
        >
          {" "}
        </Table>
        </div>

        <Payment
          dataSource1={dataSource1}
          totalPrice={totalPrice}
          paidAmount={paidAmount}
          vendorId={vendorId}
          setPreviewMaxModalOpen={setPreviewMaxModalOpen}
        />

        {/* ---------------------------- Edit Model ----------------------------------------- */}
        <Modal
          centered
          width="1200px"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource1((pre: any): any => {
              return pre?.map((product: { id: any }) => {
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
                value={editingProduct?.name}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              <label className="_label_input" htmlFor="">
                Category
              </label>
              <Input
                value={editingProduct?.categoryName}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, categoryName: e.target.value };
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
                value={editingProduct?.subCategoryName}
                onChange={(e) => {
                  setEditingProduct((pre: any) => {
                    return { ...pre, subCategoryName: e.target.value };
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
