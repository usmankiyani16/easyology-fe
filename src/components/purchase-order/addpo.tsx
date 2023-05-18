import React, { useEffect, useState } from "react";
import add_category from "../../assets/icons/layout/plus_icon.png";
import add_vendor from "../../assets/icons/layout/add.png";
import { PlusOutlined } from "@ant-design/icons";
import previewproduct from "../../assets/icons/layout/preview_product.png";
import "./addpo.scss";
import { Form, Input, Button, Select, Upload } from "antd";
import AddVendorModal from "./add-po-modals/add-vendor-modal";
import AddCategoryModal from "./add-po-modals/add-cat-modal";
import PreviewModal from "./add-po-modals/finalize-po";
import Importmodal from "./add-po-modals/import-modal";
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
import AddSubCategoryModal from "./add-po-modals/add-sub-cat";
import { setImportModalOpen } from "../../store/po/po.slice";
import UploadImage from "../common/upload-image/upload-image";

const AddPO = () => {
  const dispatch = useAppDispatch();
  const { catogaries, subCategories } = useAppSelector(
    (state) => state.catogaries
  );

  console.log(catogaries, "categories");
  const { importModalOpen } = useAppSelector((state) => state.purchaseOrders);
  const { vendors } = useAppSelector((state) => state.vendors);

  console.log(vendors, "venderos");
  const [venderValue, setVenderValue] = useState<any>("");

  const { image } = useAppSelector((state) => state.media);
  const [vendormodalOpen, setVendorModalOpen] = useState(false);
  const [catmodalOpen, setCatModalOpen] = useState(false);
  const [subCatmodalOpen, setSubCatModalOpen] = useState(false);
  const [previewmodalOpen, setPreviewModalOpen] = useState(false);
  // const [importModalOpen, setImportModalOpen] = useState(false);
  const [productImage, setProductImage] = useState<string>("");
  const [showUpload, setShowUpload] = useState(true);
  const [formData, setFormData] = useState<any[]>([]);
  const [dataForm, setDataForm] = useState<any>();
  const [file, setFile] = useState(null);
  const [selectedVendor, setSeletedVendor] = useState<any>();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("value", values);

    Toast("Product added to cart successfully");
    setShowUpload(true);
    const newFormData: any = {
      name: values.product,
      amount: Number(values.price),
      threshold: values.threshold,
      iemiNumber: values.imeiNumber,
      description: values.productDescription,
      categoryId: values.category,
      image: productImage,
      options: {
        color: values.color ?? "",
        size: values.size ?? "",
      },
      subCategoryId: values.subCategory,
      quantity: Number(values.quantity),
      serialNumber: values.serial,
    };
    /*  if (!values.color && !values.size) {
      delete newFormData.options;
    } */

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

  /* const validatePrice = (
    rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    const price = parseFloat(value);

    if (isNaN(price) || !/^[1-9]\d*(\.\d+)?$/.test(value)) {
      callback("Please enter positive number");
    } else if (price <= 0) {
      callback("Price must be greater than zero");
    } else {
      callback();
    }
  }; */
  const validatePrice = (rule: any, value: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const price = parseFloat(value);

      if (isNaN(price) || !/^[1-9]\d*(\.\d+)?$/.test(value)) {
        reject("Please enter a positive number");
      } else if (price <= 0) {
        reject("Price must be greater than zero");
      } else {
        resolve();
      }
    });
  };

  // Quantity Validator

  /* const validateQuantity = (
    rule: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    const quantity = parseFloat(value);

    if (isNaN(quantity) || !/^[1-9]\d*(\.\d+)?$/.test(value)) {
      callback("Please enter positive number");
    } else if (quantity <= 0) {
      callback("Quantity must be greater than zero");
    } else if (quantity === 0) {
      callback("Quantity cannot be 0");
    } else {
      callback();
    }
  }; */

  const validateQuantity = (rule: any, value: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const quantity = parseFloat(value);

      if (isNaN(quantity) || !/^[1-9]\d*(\.\d+)?$/.test(value)) {
        reject("Please enter a positive number");
      } else if (quantity <= 0) {
        reject("Quantity must be greater than zero");
      } else if (quantity === 0) {
        reject("Quantity cannot be 0");
      } else {
        resolve();
      }
    });
  };

  const handleOptionChange = (value: any) => {
    const vandorName = vendors?.find((data: any) => data?._id == value);
    setSeletedVendor(vandorName);
  };

  const selectProps = {
    dropdownStyle: { maxHeight: 140 },
  };

  return (
    <div className="_add_po_wrap">
      <div>
        <h1 className="font-lato mt-4 text-[2rem] xl:ml-12">Purchase Order</h1>
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
          setDataForm={setDataForm}
          setSeletedVendor={setSeletedVendor}
          previewmodalOpen={previewmodalOpen}
          setPreviewModalOpen={setPreviewModalOpen}
          newObject={dataForm}
        />
      )}

      {importModalOpen && <Importmodal />}

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
        // className="mt-4"
      >
        {/* grid lg:grid-cols-2 sm:grid-cols-1 sm:m-auto */}
        {/* ml-8 mr-24 */}
        {/* lg:ml-[70px] lg:mr-28" */}

        <div className="_parent_form flex xs:flex-col lg:flex-row lg:justify-around mt-4">
          {/* --------------- Grid 1 --------------------- */}

          <div className="_grid1_fields">
            <Form.Item
              label={<span className="_po_field_label">Select Vendor</span>}
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
              <div className="flex items-center gap-3">
                <>
                  <Select
                    {...selectProps}
                    // defaultValue={selectedVendor?._id}
                    value={selectedVendor?._id}
                    className="_input"
                    listHeight={135}
                    placeholder={
                      selectedVendor?._id
                        ? selectedVendor?.name
                        : `Select Vendor`
                    }
                    onChange={handleOptionChange}
                    disabled={
                      selectedVendor && dataForm?.products?.length
                        ? true
                        : false
                    }
                  >
                    {vendors?.map((vendor: any, index: number) => (
                      <Select.Option key={vendor?._id} value={vendor?._id}>
                        {capitalize(vendor?.name)}
                      </Select.Option>
                    ))}
                  </Select>

                  <img
                    onClick={() => setVendorModalOpen(true)}
                    src={add_vendor}
                    className=" cursor-pointer"
                    alt="Add Vendor Icon"
                  />
                </>
              </div>
            </Form.Item>

            <Form.Item
              label={<span className="_po_field_label">Product Name</span>}
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
              label={<span className="_po_field_label">Product Price</span>}
              name="price"
              required
              tooltip="This is a required field"
              rules={[{ required: true, validator: validatePrice }]}
            >
              {/* ^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$ */}
              <Input
                className="_input"
                type="number"
                placeholder="0.00"
                prefix="$"
              />
            </Form.Item>
            <Form.Item
              label={<span className="_po_field_label">Threshold</span>}
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
              label={<span className="_po_field_label ml-[10px]">Upload</span>}
              name="image"
              valuePropName="image"
              className="mt-[20px]"
            >
              <UploadImage
                showUpload={showUpload}
                setShowUpload={setShowUpload}
                setProductImage={setProductImage}
              />
            </Form.Item>
            {/* 
            <Form.Item
              label={<span className="_po_field_label ml-[10px]">Upload</span>}
              name="image"
              valuePropName="image"
              className="mt-[20px]"
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
            </Form.Item> */}

            <Form.Item
              label={
                <span className="_po_field_label">Product Description</span>
              }
              name="productDescription"
              required
              tooltip="This is a required field"
              rules={[
                {
                  required: true,

                  message: "Required Field",
                },
              ]}
            >
              <Input
                className="_input_field xs:w-[326px] xl:w-[523px] xl:h-[75px]"
                placeholder="Write description about product"
              />
            </Form.Item>
          </div>

          {/*----------------------- Grid 2 ---------------------------- */}

          <div className="_grid2_fields">
            <Form.Item
              label={<span className="_po_field_label">Product Quantity</span>}
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
                label={<span className="_po_field_label">Category</span>}
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
                  // {...selectProps}
                  className="_input"
                  // style={{height:'40px'}}
                  listHeight={135}
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
              label={<span className="_po_field_label  ml-[10px]">Color</span>}
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
              label={
                <span className="_po_field_label  ml-[10px]">Product Size</span>
              }
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
              <Form.Item
                label={
                  <span className="_po_field_label  ml-[10px]">
                    Sub Category
                  </span>
                }
                name="subCategory"
              >
                <Select
                  // {...selectProps}
                  className="_input"
                  listHeight={135}
                  placeholder="Select sub category"
                >
                  {subCategories?.map((data: any) => (
                    <Select.Option key={data?._id} value={data?._id}>
                      {capitalize(data?.name)}
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

            <Form.Item
              label={<span className="_po_field_label">Product Serial #</span>}
              name="serial"
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
              <Input className="_input" placeholder="Serial Number" />
            </Form.Item>

            <Form.Item
              label={
                <span className="_po_field_label ml-[10px]">IMEI Number</span>
              }
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
          </div>
        </div>

        <div className="_btn-footer flex justify-between mt-8">
          <div className="_import_btn xl:ml-12">
            <Form.Item>
              <Button
                className="sm:w-40 text-center"
                type="primary"
                onClick={() => dispatch(setImportModalOpen(true))}
              >
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
                  Finalize PO
                </Button>
              }
            </div>
          )}

          <div
            className={`_submit_btn xl:mr-[60px] ${
              dataForm && dataForm?.products?.length && "xl:mr-[75px]"
            }`}
          >
            <Form.Item>
              <Button className="text-center" type="primary" htmlType="submit">
                {dataForm && dataForm?.products?.length
                  ? "Add More Product"
                  : "Add Product"}
              </Button>
            </Form.Item>

            <p className="_submit_btn_msg w-44">
              Submit via sent email to the vendor{" "}
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddPO;
