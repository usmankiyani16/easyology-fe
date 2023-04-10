import React, { useEffect, useState } from "react";
import add_category from "../../assets/icons/layout/plus_icon.png";
import add_vendor from "../../assets/icons/layout/add.png";
import { PlusOutlined } from "@ant-design/icons";
import previewproduct from "../../assets/icons/layout/preview_product.png";
import "./addpo.scss";
import { Form, Input, Button, Select, Upload } from "antd";
import AddVendorModal from "../Modals/add-po-modals/add-vendor-modal";
import AddCategoryModal from "../Modals/add-po-modals/add-cat-modal";
import PreviewModal from "../Modals/add-po-modals/preview-product-modal";
import Importmodal from "../Modals/add-po-modals/import-modal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getCatogaries } from "../../store/catogaries/catogaries-slice";
import { capitalize } from "../../utils/functions/functions";
import { uploadMedia } from "../../store/media/media-slice";
import { Toast } from "../common/toast/toast";
import { getVendors } from "../../store/vendors/vendors-slice";
import Loader from "../common/loader/loader";

const AddPO = () => {
  const dispatch = useAppDispatch();
  const { catogaries } = useAppSelector((state) => state.catogaries);
  const { vendors } = useAppSelector((state) => state.vendors);

  const { image } = useAppSelector((state) => state.media);
  const [vendormodalOpen, setVendorModalOpen] = useState(false);
  const [catmodalOpen, setCatModalOpen] = useState(false);
  const [previewmodalOpen, setPreviewModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [productImage, setProductImage] = useState<string>("");
  const [showUpload, setShowUpload] = useState(true);
  const [formData, setFormData] = useState<any[]>([]);
  const [dataForm, setDataForm] = useState<any>();


  const onFinish = (values: any) => {



    Toast("Product added");
    const newFormData = {
      'product': values.product,
      'price': values.price,
      'threshold': values.threshold,
      'imeiNumber': values.imeiNumber,
      'productDescription': values.productDescription,
      'category': values.category,
      'color': values.color,
      'image': values.image,
      'size': values.size,
      'productType': values.productType,
      'quantity': values.quantity,
      'serial': values.serial
    };

    const newObject = {
      "vendorId": values.selectVendor,
      "product": formData.concat(newFormData)
    };



    console.log(newObject);

    setFormData(formData.concat(newFormData));

    setDataForm(newObject)
  };


  // setFormData([...formData, newFormData]);


  /*  useEffect(() => {
     console.log('Updated formData:', formData);
   }, [formData]);
  */



  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const imageUpload = async (e: any) => {
    const file = e.file;
    delete file.uid;
    setShowUpload(!showUpload);
    if (showUpload) {
      const res = await dispatch(uploadMedia(file));
      if (res?.meta?.requestStatus == "fulfilled") {
        setProductImage(res?.payload?.data?.fileName);
      } else Toast("Something went wrong", "error");
    }
  };

  useEffect(() => {
    dispatch(getCatogaries());
    dispatch(getVendors());
  }, []);
  return (
    <div className="_add_po_wrap">
      <div className="_addpo_header flex justify-between items-center">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Purchase Order</h1>
        </div>
        {previewmodalOpen && <div>
          <img
            src={previewproduct}
            alt="Preview Product Icon"
            className="h-10 cursor-pointer"
            onClick={() => setPreviewModalOpen(true)}
          />
        </div>}

      </div>

      {/* Add PO Form  */}
      {vendormodalOpen &&
        <AddVendorModal
          vendormodalOpen={vendormodalOpen}
          setVendorModalOpen={setVendorModalOpen}
        />
      }
      {catmodalOpen &&
        <AddCategoryModal
          catmodalOpen={catmodalOpen}
          setCatModalOpen={setCatModalOpen}
        />
      }

      {previewmodalOpen && <PreviewModal
        previewmodalOpen={previewmodalOpen}
        setPreviewModalOpen={setPreviewModalOpen}
        newObject={dataForm}
      />
      }

      {importModalOpen &&
        <Importmodal
          importModalOpen={importModalOpen}
          setImportModalOpen={setImportModalOpen}
        />
      }

      <Form
        // labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        // style={{ maxWidth:  }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-4"
      >
        <div className="_parent_form grid lg:grid-cols-2 sm:grid-cols-1 sm:m-auto">
          {/* --------------- Grid 1 --------------------- */}

          <div className="_grid1_fields">
            <div className="flex items-center gap-3">
              <Form.Item
                label="Select Vendor"
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
                <Select className="_input" placeholder="Select Vendor">
                  {vendors?.map((vendor: any, index: number) => (
                    <Select.Option key={vendor?._id} value={vendor?._id}>
                      {capitalize(vendor?.name)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <img
                onClick={() => setVendorModalOpen(true)}
                src={add_vendor}
                className=" cursor-pointer"
                alt="Add Vendor Icon"
              />
            </div>

            <Form.Item
              label="Product Name"
              name="product"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,

                  message: "Required Field",
                },
                {
                  pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                  message: "Special characters not allowed",
                },
              ]}
            >
              <Input className="_input" placeholder="Enter Product Name" />
            </Form.Item>

            <Form.Item
              label="Product Price"
              name="price"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
              ]}
            >
              {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
              <Input className="_input" placeholder="$0.00" type="number" />
            </Form.Item>
            <Form.Item
              label="Threshold"
              name="threshold"
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
                className="_input select_input"
                placeholder="Select Thresh"
              >
                <Select.Option value="15 days">15 days</Select.Option>
                <Select.Option value="30 days">30 days</Select.Option>
                <Select.Option value="45 days">45 days</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Upload"
              valuePropName="fileList"
              className="mt-[28px]"
            >
              <Upload
                beforeUpload={() => false}
                onChange={(e) => imageUpload(e)}
                action=""
                listType="picture-card"
                multiple={false}
                maxCount={1}
                showUploadList={{
                  showPreviewIcon: false,
                }}
                accept="image/*"
              >
                {showUpload && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Image</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="IMEI Number"
              name="imeiNumber"
              rules={[
                {
                  pattern: new RegExp("^\\d{15}$"),
                  message: "Only digits (15) allowed",
                },
              ]}
            >
              <Input className="_input" placeholder="Enter Product IMEI" />
            </Form.Item>

            <Form.Item label="Product Description" name="productDescription">
              <Input
                className="_input"
                placeholder="Enter Product Description"
              />
            </Form.Item>
          </div>

          {/*----------------------- Grid 2 ---------------------------- */}

          <div className="_grid2_fields">
            <Form.Item
              label="Product Quantity"
              name="quantity"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,
                  // type: 'email',
                  message: "Required Field",
                },
              ]}
            >
              <Input
                className="_input"
                placeholder="Enter Product Quality"
                type="number"
              />
            </Form.Item>

            <div className="flex items-center gap-3">
              <Form.Item
                label="Category"
                name="category"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: true,
                    // type: 'email',
                    message: "Required Field",
                  },
                ]}
              >
                <Select
                  className="_input w-24"
                  placeholder="Add or Select Category"
                >
                  {catogaries?.map((catogary: any, index: number) => (
                    <Select.Option key={catogary?._id} value={catogary?._id}>
                      {capitalize(catogary?.name)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <img
                src={add_category}
                alt="add_cat_modal"
                className="cursor-pointer"
                onClick={() => {
                  setCatModalOpen(true);
                }}
              />
            </div>

            <Form.Item
              label="Color"
              name="color"
              rules={[
                {
                  pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                  message: "Special characters not allowed",
                },
              ]}
            >
              <Input className="_input" placeholder="Specify Color" />
            </Form.Item>
            <Form.Item
              label="Product Size"
              name="size"
              rules={[
                {
                  pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                  message: "Special characters not allowed",
                },
              ]}
            >
              <Input className="_input" placeholder="Specify Size" />
            </Form.Item>

            <Form.Item label="Product Type" name="productType">
              <Input className="_input" placeholder="Specify Product Type" />
            </Form.Item>

            <Form.Item label="Product Serial #" name="serial">
              <Input className="_input" placeholder="IMEI" />
            </Form.Item>
          </div>
        </div>

        <div className="_btn-footer flex justify-between mt-8">
          <div className="_import_btn">
            <Form.Item className="mb-0">
              <Button type="primary" onClick={() => setImportModalOpen(true)}>
                Import
              </Button>
            </Form.Item>
            <p className="_import_btn_msg">Import product category</p>
          </div>

          <div className="_submit_btn mr-16">
            <Form.Item className="mb-0">
              <Button type="primary" htmlType="submit">
                Add Product
              </Button>
            </Form.Item>
            <p className="_submit_btn_msg">
              Submit via sent email to the vendor{" "}
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddPO;
