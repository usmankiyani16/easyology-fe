import React, { useState } from "react";

import { Button, Modal } from "antd";
import "../onhold.scss";
import Line from "../../../../assets/images/Line.png";
// import "../../../sass/modals.scss";
// import PayModal from "./pay-modal";
import { imageBaseUrl } from "../../../../utils/constants";
import { noImg } from "../../../../assets/images";
import { backButtonIcon } from "../../../../assets/icons";
import { capitalize } from "../../../../utils/functions/functions";

// interface ExportButtonProps {
//   data: Array<Object>; // Data to be exported in Excel file
//   fileName: string; // Name of the exported file
// }

const OnHoldInvoice: React.FC<any> = ({
  onHoldModal,
  setOnHoldModal,
  setIsModalOpen,
  singleOnHoldInvoice,
}) => {
  const handleback = () => {
    setOnHoldModal(false);
    setIsModalOpen(true);
  };
  return (
    <div className="_onhold">
      {/* ----------- View Modal ------------------ */}

      <Modal
        width="471px"
        footer={false}
        centered
        open={onHoldModal}
        onCancel={() => setOnHoldModal(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <img
          onClick={handleback}
          className="h-[15px] w-[15px] cursor-pointer"
          src={backButtonIcon}
          alt="back"
        />
        <div className="flex items-center justify-between mt-6">
          <h4 className="_po_Number text-2xl">
            Invoice Number:
            <span className="_primary-color">
              {singleOnHoldInvoice?.invoiceNumber}
            </span>
          </h4>

          <Button>Release</Button>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="_company_name capitalize">
            {capitalize(singleOnHoldInvoice?.customerType ?? "not available")}
          </h4>

          <span>
            User Type :{" "}
            <span className="_primary-color">
              {" "}
              {singleOnHoldInvoice?.contactDetails ?? "Not available"}
            </span>
          </span>
        </div>
        <span className="_sheduled_date font-medium">
          Sheduled:{" "}
          <span className="text-black font-medium capitalize">
            {" "}
            {singleOnHoldInvoice?.singleOnHoldInvoice ?? "not available"}
          </span>
        </span>

        {/* --------------- Products Container -------------------- */}

        {singleOnHoldInvoice?.products?.map((data: any, index: number) => (
          <div key={index} className="mt-2" style={{ height: "200px", overflowY: "auto" }}>
            <span className="_product_id font-bold">
            </span>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-3">
                <img
                  src={data?.product?.image ? imageBaseUrl + data?.product?.image : noImg}
                  alt="Products"
                  className="w-[59px] h-[66px]"
                />
                <span className="_product_name w-[112px] h-[66px] font-semibold flex items-center ">
                  {data?.product?.name}
                </span>
              </div>
              <div>
                <span className="_product_quantity w-[112px] h-[66p] font-semibold">
                 {data?.quantity} X {data?.product?.variants?.amount}
                </span>
              </div>
              <div>
                <span className="_product_price text-[18px] font-bold _primary-color">
                  $  {data?.quantity * data?.product?.variants?.amount}
                </span>
              </div>
            </div>

            <img src={Line} alt="" />
          </div>
        ))}

        {/* <div className="_contact_details mt-4">
          <p className="flex font-bold">
            Address:
            <span className="_address_details ml-[12px]">
              Street #05, Times square, Buidling icon tower, Near Timmies.
              Dallas/Texas.
            </span>
          </p>
          <p className="_label font-bold">
            Contact: <span className="ml-[12px]">+001 48976 543</span>
          </p>
          <span className="_label font-bold">
            Payment:{" "}
            <span className="_primary-color ml-[10px]">Full Payment</span>
          </span>
          <p className="_label font-bold">
            Delivery Type: <span className=" _primary-color">Standard</span>
          </p>
        </div> */}

        {/* ----------------- Footer ------------------------------ */}

        <div className="_footer mt-6 font-bold">
          {/* <div className="flex justify-between">
            <span className="_label">Total Discount</span>
            <span>$ 1500</span>
          </div> */}
          <div className="flex justify-between font-bold">
            <span className="_label">Discount</span>
            <span>$ {singleOnHoldInvoice?.discount}</span>
          </div>
          <div className="flex justify-between">
            <span className="_label _label_total _primary-color">Total</span>
            <span className="_label_total _primary-color">$ {singleOnHoldInvoice?.totalAmount}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OnHoldInvoice;
