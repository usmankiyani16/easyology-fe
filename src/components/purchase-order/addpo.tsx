import React, { useState } from "react";
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


const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const AddPO = () => {
  const [vendormodalOpen, setVendorModalOpen] = useState(false);
  const [catmodalOpen, setCatModalOpen] = useState(false);
  const [previewmodalOpen, setPreviewModalOpen] = useState(false);
  const [importModalOpen , setImportModalOpen] = useState(false);
  return (
    <div className="_add_po_wrap">
      <div className="_addpo_header flex justify-between items-center">
        <div>
          <h1 className="font-lato  mt-4 text-[2rem]">Purchase Order</h1>
        </div>
        <div>
          <img src={previewproduct} alt="Preview Product Icon" className="h-10 cursor-pointer" onClick={() => setPreviewModalOpen(true)}/>
        </div>
      </div>

      {/* Add PO Form  */}
      <AddVendorModal vendormodalOpen={vendormodalOpen} setVendorModalOpen={setVendorModalOpen} />
      <AddCategoryModal catmodalOpen={catmodalOpen} setCatModalOpen={setCatModalOpen}/>
      <PreviewModal previewmodalOpen={previewmodalOpen} setPreviewModalOpen={setPreviewModalOpen}/>
      <Importmodal importModalOpen={importModalOpen} setImportModalOpen={setImportModalOpen}  />
      

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
            <Form.Item
              label="Product Name"
              name="Product Name"
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
              name="  Price"
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
              <Input className="_input" placeholder="$0.00" type="number"/>
            </Form.Item>
            <Form.Item
              label="Threshold"
              name="Select Threshold"
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
              <Upload action="/upload.do" listType="picture-card"  multiple={false}
              maxCount={1}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Product IMEI Number"
              name="IMEI Number"
              rules={[
                {
                  pattern: new RegExp("^\\d{15}$"),
                  message: "Only digits (15) allowed",
                },
              ]}
            >
              <Input className="_input" placeholder="Enter Product IMEI" />
            </Form.Item>

            <Form.Item label="Product Description" name="Product Description">
              <Input
                className="_input"
                placeholder="Enter Product Description"
              />
            </Form.Item>
          </div>

          {/*----------------------- Grid 2 ---------------------------- */}

          <div className="_grid2_fields">
            <Form.Item
              label="Product Quality"
              name="Product Quality"
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

            <div className="flex items-center">

            <Form.Item
              label="Category"
              name="Product Category"
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



              <Select className="_input w-24" placeholder="Add or Select Category">
                <Select.Option value="Laptops">Laptops</Select.Option>
                <Select.Option value="Mobile Phones">
                  Mobile Phones
                </Select.Option>
                <Select.Option value="Ipads">Ipads</Select.Option>
              </Select>
            </Form.Item>
         
            <img src={add_category} alt="add_cat_modal" className="cursor-pointer" onClick={() => {setCatModalOpen(true)}}/>
            </div>
     
            


            <Form.Item
              label="Color"
              name="Product Color"
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
              name="Pruduct Size"
              rules={[
                {
                  pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                  message: "Special characters not allowed",
                },
              ]}
            >
              <Input className="_input" placeholder="Specify Size" />
            </Form.Item>

            <Form.Item label="Product Type" name="Pruduct Type">
              <Input className="_input" placeholder="Specify Product Type" />
            </Form.Item>

            <Form.Item label="Product Serial #" name="Pruduct Serial #">
              <Input className="_input" placeholder="IMEI" />
            </Form.Item>

           
            <div>
           

            <Form.Item
              label="Select Vendor"
              name="Select Vendor"
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
                <Select.Option value="Ali Raza">Ali Raza</Select.Option>
                <Select.Option value="Hasan">Hasan</Select.Option>
                <Select.Option value="Ahmed">Ahmed</Select.Option>
              </Select>
            </Form.Item>
     
       
            
            <img onClick={() => setVendorModalOpen(true)} src={add_vendor} className="_img_align cursor-pointer" alt="Add Vendor Icon" />
            </div>
          
            </div>
          </div>
        

        <div className="_btn-footer flex justify-between mt-8">
          <div className="_import_btn">
            <Form.Item className="mb-0">
              <Button type="primary" onClick={() => setImportModalOpen(true)}>Import</Button>
              
            </Form.Item>
            <p className="_import_btn_msg">Import product category</p>
          </div>

          <div className="_submit_btn mr-16">
            <Form.Item className="mb-0">
              <Button type="primary" htmlType="submit">
                Add Product
              </Button>
             
            </Form.Item>
            <p className="_submit_btn_msg">Submit via sent email to the vendor </p>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddPO;
