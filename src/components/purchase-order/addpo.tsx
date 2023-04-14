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
import {
  getCatogaries,
  getSubCatogaries,
} from "../../store/catogaries/catogaries-slice";
import { capitalize } from "../../utils/functions/functions";
import { uploadMedia } from "../../store/media/media-slice";
import { Toast } from "../common/toast/toast";
import { getVendors } from "../../store/vendors/vendors-slice";
import Loader from "../common/loader/loader";
import AddSubCategoryModal from "../Modals/add-po-modals/add-sub-cat";

const AddPO = () => {
  const dispatch = useAppDispatch();
  const { catogaries, subCategories } = useAppSelector(
    (state) => state.catogaries
  );
  const { vendors } = useAppSelector((state) => state.vendors);
  const [venderValue, setVenderValue] = useState<any>("");

  const { image } = useAppSelector((state) => state.media);
  const [vendormodalOpen, setVendorModalOpen] = useState(false);
  const [catmodalOpen, setCatModalOpen] = useState(false);
  const [subCatmodalOpen, setSubCatModalOpen] = useState(false);
  const [previewmodalOpen, setPreviewModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [productImage, setProductImage] = useState<string>("");
  const [showUpload, setShowUpload] = useState(true);
  const [formData, setFormData] = useState<any[]>([]);
  const [dataForm, setDataForm] = useState<any>();
  const [file, setFile] = useState(null);
  const [selectedVendor, setSeletedVendor] = useState<any>();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // event.preventDefault();
    console.log("value", values);

    Toast("Product added to card successfully");
    setShowUpload(true);
    const newFormData: any = {
      name: values.product,
      price: Number(values.price),
      threshold: values.threshold,
      iemeNumber: values.imeiNumber,
      description: values.productDescription,
      categoryId: values.category,
      color: values.color,
      image: productImage,
      size: values.size,
      subCategoryId: values.subCategory,
      quantity: Number(values.quantity),
      serialNumber: values.serial,
    };

    Object.keys(newFormData).forEach((key) => {
      if (newFormData[key] === undefined) {
        delete newFormData[key];
      }
    });

    const newObject = {
      vendorId: selectedVendor?._id,
      products: formData.concat(newFormData),
    };
    form.resetFields();
    setFile(null);

    setFormData(formData.concat(newFormData));

    setDataForm(newObject);
  };

  const imageUpload = async (e: any) => {
    const file = e?.file;
    delete file?.uid;
    setShowUpload(!showUpload);
    if (showUpload) {
      const res = await dispatch(uploadMedia(file));
      if (res?.meta?.requestStatus == "fulfilled") {
        setProductImage(res?.payload?.data?.fileName);
      } else Toast("Something went wrong", "error");
    }
    // setFile(e.file);
  };

  useEffect(() => {
    dispatch(getCatogaries());
    dispatch(getVendors());
  }, []);

  // Price Validator

  const validatePrice = (
    rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    const price = parseFloat(value);

    if (isNaN(price) || !/^[1-9]\d*(\.\d+)?$/.test(value)) {
      callback("Please enter a valid positive number");
    } else if (price <= 0) {
      callback("Price must be greater than zero");
    } else {
      callback();
    }
  };

  // Quantity Validator

  const validateQuantity = (
    rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    const quantity = parseFloat(value);

    if (isNaN(quantity) || !/^[1-9]\d*(\.\d+)?$/.test(value)) {
      callback("Please enter a valid positive number");
    } else if (quantity <= 0) {
      callback("Quantity must be greater than zero");
    } else if (quantity === 0) {
      callback("Quantity cannot be 0");
    } else {
      callback();
    }
  };

  const handleOptionChange = (value: any) => {
    const vandorName = vendors?.find((data: any) => data?._id == value);
    setSeletedVendor(vandorName);
  };
  return (
    <div className="_add_po_wrap">
      <div className="_addpo_header flex justify-between items-center">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Purchase Order</h1>
        </div>
      </div>

      {/* Add PO Form  */}
      {vendormodalOpen && (
        <AddVendorModal
          vendormodalOpen={vendormodalOpen}
          setVendorModalOpen={setVendorModalOpen}
        />
      )}
      {catmodalOpen && (
        <AddCategoryModal
          catmodalOpen={catmodalOpen}
          setCatModalOpen={setCatModalOpen}
        />
      )}

      {previewmodalOpen && (
        <PreviewModal
          previewmodalOpen={previewmodalOpen}
          setPreviewModalOpen={setPreviewModalOpen}
          newObject={dataForm}
        />
      )}

      {importModalOpen && (
        <Importmodal
          importModalOpen={importModalOpen}
          setImportModalOpen={setImportModalOpen}
        />
      )}

      {subCatmodalOpen && (
        <AddSubCategoryModal
          subCatmodalOpen={subCatmodalOpen}
          setSubCatmodalOpen={setSubCatModalOpen}
        />
      )}

      <Form
        form={form}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="mt-4"
      >
        <div className="_parent_form grid lg:grid-cols-2 sm:grid-cols-1 sm:m-auto">
          {/* --------------- Grid 1 --------------------- */}

          <div className="_grid1_fields">
            <div className="flex items-center gap-3">
              <Form.Item
                label="Select Vendor"
                name="selectedVendor"
                required
                tooltip="This is a required field"
                rules={[
                  {
                    required: selectedVendor?._id ? false : true,
                    // type: 'email',
                    message: "Required Field",
                  },
                  {
                    type: "string",
                  },
                ]}
              >
                <Select
                  defaultValue={selectedVendor?._id}
                  value={selectedVendor?._id}
                  className="_input"
                  placeholder={
                    selectedVendor?._id ? selectedVendor?.name : `Select Vendor`
                  }
                  onChange={handleOptionChange}
                  disabled={
                    selectedVendor && dataForm?.products?.length ? true : false
                  }
                >
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
              rules={[{ required: true, validator: validatePrice }]}
            >
              {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
              <Input className="_input" placeholder="0.00" prefix="$" />
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
              name="image"
              valuePropName="image"
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
              rules={[{ required: true, validator: validateQuantity }]}
            >
              <Input
                type="number"
                className="_input"
                placeholder="Enter Product Quantity"
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
                  onChange={(value: any) => dispatch(getSubCatogaries(value))}
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

            <div className="flex items-center gap-3">
              <Form.Item label="Sub Category" name="subCategory">
                <Select
                  className="_input select_input"
                  placeholder="Select sub category"
                >
                  {subCategories?.sub_category?.map((data: any) => (
                    <Select.Option key={data?._id} value={data?._id}>
                      {data?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <img
                src={add_category}
                alt="add_cat_modal"
                className="cursor-pointer"
                onClick={() => {
                  setSubCatModalOpen(true);
                }}
              />
            </div>

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

          {dataForm && dataForm?.products?.length && (
            <div>
              {
                <Button
                  type="primary"
                  // htmlType="submit"
                  className="h-10 cursor-pointer"
                  onClick={() => setPreviewModalOpen(true)}
                >
                 View Product Card
                </Button>
              }
            </div>
          )}

          <div className="_submit_btn mr-16">
            <Form.Item className="mb-0">
              <Button type="primary" htmlType="submit">
                {dataForm && dataForm?.products?.length? "Add More Product": "Add Product"}
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
