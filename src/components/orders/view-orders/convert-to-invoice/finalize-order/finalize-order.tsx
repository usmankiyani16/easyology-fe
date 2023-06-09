import React from "react";
import cancelIcon from "../../../../../assets/icons/layout/cancel-icon.png";
import { Modal, Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../../../routes/route-constants";
const FinalizeOrder: React.FC<any> = ({
  isModalOpen,
  setIsModalOpen,
  data,
}) => {
  const navigate = useNavigate();
  const handleSave = (values: any) => {
    console.log(values);
    navigate(ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.ORDERS);
  };

  console.log("Finalize Data", data);

  return (
    <div>
      <Modal
        width="372px"
        footer={false}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        {/* <img src={cancelIcon} alt="cancelIcon" className='flex justify-end items-end' /> */}

        <h3 className="_modal_header">Finalizing Order</h3>
        <Form
          //   wrapperCol={{ span: 14 }}
          layout="vertical"
          autoComplete="off"
          className="mt-8"
          onFinish={handleSave}
        >
          <Form.Item
            label={
              (data?.orderStatus === "Waiting to be delivered" &&
                "ETA Of Delivery") ||
              ((data?.orderStatus === "Waiting to be shipped" ||
                data?.orderStatus === "Completed") &&
                "Add Tracking No") ||
              (data?.orderStatus === "Pickup from store" &&
                "Name Of Pickup Person")
            }
            name="trackingNo"
            required
            tooltip="This is a required field"
            validateStatus="error"
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
              className="_input_username h-[31px]"
              placeholder="Tracking No"
              type={
                data?.orderStatus === "Waiting to be shipped" ||
                data?.orderStatus === "Completed" ? "number"
                  : 'string'
              }
            />
          </Form.Item>

          {data?.orderStatus !== "Pickup from store" && (
            <Form.Item
              label={
                (data?.orderStatus === "Waiting to be delivered" &&
                  "Delivered By") ||
                ((data?.orderStatus === "Waiting to be shipped" ||
                  data?.orderStatus === "Completed") &&
                  "Shipping Company")
              }
              name="shippingCompany"
              required
              tooltip="This is a required field"
              validateStatus="error"
              className="mt-8"
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
                placeholder="Company name"
                
              />
            </Form.Item>
          )}
          <div className="flex justify-center m-auto _white-color">
            <Button
              className="w-32 _primary-button"
              type="primary"
              htmlType="submit"
              // onClick={handleClick}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FinalizeOrder;
