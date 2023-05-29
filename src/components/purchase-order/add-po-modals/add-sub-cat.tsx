import React, { useState } from "react";
import "../../../sass/modals.scss";

import { Button, Modal, Form, Input, Select, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  addCatogary,
  addSubCatogary,
  getSubCatogaries,
} from "../../../store/catogaries/catogaries-slice";
import Loader from "../../common/loader/loader";

const AddSubCategoryModal: React.FC<any> = ({
  subCatmodalOpen,
  setSubCatmodalOpen,
}) => {
  const { catogaries } = useAppSelector((state) => state.catogaries);
  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    const res = await dispatch(addSubCatogary(values));
    if (res?.meta?.requestStatus === "fulfilled") {
      setSubCatmodalOpen(false);
      dispatch(getSubCatogaries(values.categoryId));
    }
  };

  const selectProps = {
    dropdownStyle: { maxHeight: 140 },
  };

  return (
    <div>
      <Modal
        // width={450}
        // width=""
        footer={false}
        centered
        open={subCatmodalOpen}
        onCancel={() => setSubCatmodalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
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
          <Row gutter={[16,16]}>
            <Col xs={5}>
              <label>Category</label>
            </Col>
            <Col xs={18}>
              <Form.Item
                // label={<span className="_po_field_label">Category</span>}
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
                  className="_input_field "
                  placeholder="Add or Select Category"
                  {...selectProps}
                  listHeight={135}
                >
                  {catogaries?.map((catogary: any, index: number) => (
                    <Select.Option
                      key={catogary?._id}
                      value={catogary?._id}
                      className="capitalize"
                    >
                      {catogary?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16,16]}>
            <Col xs={5}>
              <label>Sub Category</label>
            </Col>

            <Col xs={18}>
              <Form.Item
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
                  className="h-[35px] _input_field"
                  placeholder="Enter Sub Category Name"
                />
              </Form.Item>
            </Col>
          </Row>

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
