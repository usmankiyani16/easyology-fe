import React, { useState } from "react";
import "../../../sass/modals.scss";


import { Button, Modal, Form, Upload, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import profileupload from "../../../assets/icons/layout/profile-upload.png";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../routes/route-constants";

const Profilemodal: React.FC<any> = ({
  profilemodalOpen,
  setProfileModalOpen,
}) => {
  const [showUpload, setShowUpload] = useState(true);

  const imageUpload = async (e: any) => {
    const file = e?.file;
    delete file?.uid;
    setShowUpload(!showUpload);
    /* if (showUpload) {
      const res = await dispatch(uploadMedia(file));
      if (res?.meta?.requestStatus == "fulfilled") {
        setProductImage(res?.payload?.data?.fileName);
      } else Toast("Something went wrong", "error");
    } */
    // setFile(e.file);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    setProfileModalOpen(false);
    navigate(ROUTE_CONSTANTS.LOGIN);
  };
  return (
    <div>
      <Modal
        width="372px"
        footer={false}
        centered
        open={profilemodalOpen}
        onCancel={() => setProfileModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <span onClick={logout} className="_modal_logout">
          Logout
        </span>{" "}
        <h3 className="_modal_header">Profile</h3>
        <Form
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          autoComplete="off"
          className="mt-4"
        >
          <Form.Item
            label={<span>Profile Picture</span>}
            name="image"
            valuePropName="image"
            className="mt-[50px]"
          >
            <Upload
              className=""
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
                  <img src={profileupload} alt="" />
                </div>
              )}
            </Upload>
          </Form.Item>

         
          <Form.Item
            label="Username"
            name="Username"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,

                message: "Required Field",
              },
              /*  {
                pattern: new RegExp("^[a-zA-Z0-9\\s]+$"),
                message: "Special characters not allowed",
              }, */
            ]}
          >
            <Input
              className="_input_username  h-[31px] "
              placeholder="Enter Username"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profilemodal;
