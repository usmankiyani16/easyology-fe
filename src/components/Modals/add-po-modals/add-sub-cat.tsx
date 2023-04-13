import React, { useState } from "react";
import "../modals.scss";

import { Button, Modal, Form, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addCatogary, addSubCatogary } from "../../../store/catogaries/catogaries-slice";
import Loader from "../../common/loader/loader";
import { capitalize } from "../../../utils/functions/functions";



const AddSubCategoryModal: React.FC<any> = ({ subCatmodalOpen, setSubCatmodalOpen, }) => {
  const { catogaries } = useAppSelector(state => state.catogaries)
  const dispatch = useAppDispatch()
  const onFinish = async (values: any) => {
    console.log('..c.c', values)
    const res = await dispatch(addSubCatogary(values))
    if (res?.meta?.requestStatus === "fulfilled") {
      setSubCatmodalOpen(false)
    }
  };

  return (
    <div className="_modal_wrap">

      <Modal
        width={600}
        footer={false}
        centered
        open={subCatmodalOpen}
        onCancel={() => setSubCatmodalOpen(false)}
        destroyOnClose={true}
      >
        <h3 className="_modal_header_poView">Add Sub Category</h3>

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
            name="categoryId"
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
              className="_input w-24 ml-7"
              placeholder="Add or Select Category"
            >

              {catogaries?.map((catogary: any, index: number) => (
                <Select.Option key={catogary?._id} value={catogary?._id}>
                  {capitalize(catogary?.name)}
                </Select.Option>
              ))}

            </Select>
          </Form.Item>
          <Form.Item
            label="Sub Category"
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
            <Input className="h-[35px]" placeholder="Enter Category Name" />
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

export default AddSubCategoryModal;
