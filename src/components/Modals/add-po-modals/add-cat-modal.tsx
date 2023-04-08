import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Input } from "antd";
import { useAppDispatch } from "../../../store/store";
import { addCatogary } from "../../../store/catogaries/catogaries-slice";



const AddCategoryModal: React.FC<any> = ({ catmodalOpen, setCatModalOpen }) => {
  const dispatch = useAppDispatch()
  const onFinish = async (values: any) => {
    setCatModalOpen(false)
    await dispatch(addCatogary(values))
  };
  return (
    <div className="_modal_wrap">

      <Modal
        footer={false}
        centered
        open={catmodalOpen}
        onCancel={() => setCatModalOpen(false)}
        destroyOnClose={true}
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
            label="Category"
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
            <Input className="h-[40px]" placeholder="Enter Category Name" />
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
