import React, { useState } from "react";
import "../../../sass/modals.scss";

import { Button, Modal, Form, Input } from "antd";
import { useAppDispatch } from "../../../store/store";
import { addCatogary } from "../../../store/catogaries/catogaries-slice";

const AddCategoryModal: React.FC<any> = ({ catmodalOpen, setCatModalOpen }) => {
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    const res = await dispatch(addCatogary(values));
    if (res?.meta?.requestStatus === "fulfilled") {
      setCatModalOpen(false);
    }
  };
  return (
    <div>
      <Modal
        footer={false}
        centered
        open={catmodalOpen}
        onCancel={() => setCatModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
     
      >
        <h3 className="_modal_header_poView">Add Category</h3>

        <Form
          // labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // style={{ maxWidth:  }}
          onFinish={onFinish}
          autoComplete="off"
          className="mt-8"
        >
          <Form.Item
            label={<span className="_po_field_label">Category</span>}
            name="name"
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
            <Input
              className="h-[40px] _input_field"
              placeholder="Enter Category Name"
            />
          </Form.Item>

          <div className="flex justify-center">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-36 text-center text-lg"
              >
                Add
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
