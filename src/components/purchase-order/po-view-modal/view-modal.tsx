import React, { useState } from "react";

import { Button, Modal } from "antd";

import * as XLSX from "xlsx";
import { laptopImg } from "../../../assets/images";
import Line from "../../../assets/images/Line.png";
import "../../../sass/modals.scss";
import PayModal from "./pay-modal";
import { imageBaseUrl } from "../../../utils/constants";
import { noImg } from "../../../assets/images";

// interface ExportButtonProps {
//   data: Array<Object>; // Data to be exported in Excel file
//   fileName: string; // Name of the exported file
// }

const Viewmodal: React.FC<any> = ({
  viewModalOpen,
  setViewModalOpen,
  purchaseOrders,
  Name,
  Number
}) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  console.log(purchaseOrders, "PO Data View Modal");

  const Product_Image = purchaseOrders?.products.map(
    (product: { image: any }) => product.image
  );

  const image = imageBaseUrl + Product_Image;

  /* [
    { name: purchaseOrders?.poNumber, age: 22 },
    { name: "Usman", age: 25 },
    { name: "Hasan", age: 40 },
  ] */

  const handleExport = () => {
    const inventoryStatus = purchaseOrders?.paymentStatus;
    const partialPaid = inventoryStatus === "Partially Paid";

    const data = purchaseOrders.products?.map((product: any) => ({
      productName: product?.name,
      quantity: product?.quantity,
      price: product?.amount,
      image: product?.image ?? noImg,
      productId: purchaseOrders?._id,
      poNo: purchaseOrders?.poNumber,
      company: purchaseOrders?.vendor[0]?.companyName,
      inventoryStatus,
      totalPaid: purchaseOrders?.payments[0]?.paymentDetails?.paidAmount,
      ...(partialPaid && {
        remaining: purchaseOrders?.remainingAmount,
        dueDate: purchaseOrders?.payments[0]?.paymentDetails?.dueData,
      }),
    }));

    console.log("purchaseOrders", purchaseOrders);

    const fileName = "export";

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  return (
    <div className="_view_modal_wrap">
      <PayModal
        setViewModalOpen={setViewModalOpen}
        paidAmount={purchaseOrders?.remainingAmount}
        poId={purchaseOrders?._id}
        paymentModalOpen={paymentModalOpen}
        setPaymentModalOpen={setPaymentModalOpen}
      />
      {/* ----------- View Modal ------------------ */}

      <Modal
        width="471px"
        footer={false}
        centered
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        destroyOnClose={true}
        className="_modal_wrap"
      >
        <h4 className="_po_Number mt-8 text-2xl">
          {Number}:
          <span className="text-red-500">#{purchaseOrders?.poNumber}</span>
        </h4>
        <h4 className="_company_name text-xl">
          {Name}:
          <span className="font-medium _label-grey">
       
            {purchaseOrders?.vendor[0]?.companyName}{" "}
          </span>
        </h4>
        {/* <p className="_sheduled_date font-medium">
          Sheduled:{" "}
          <span className="text-black font-medium"> Friday 12 AM EST</span>
        </p> */}

        {/* --------------- Products Container -------------------- */}

        <div className="mt-2" style={{ height: "305px", overflowY: "auto" }}>
          {/* --------- Purchase Order data ka map yaha lagega -------------- */}

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-3">
              <img
                src={Product_Image[0] ? image : noImg}
                alt="Products"
                className="w-[59px] h-[66px]"
              />
              <span className="_product_name w-[160px] h-[66px] font-semibold flex items-center">
                {purchaseOrders?.products[0].name}
              </span>
            </div>
            <div>
              <span className="_product_quantity w-[112px] h-[66p] font-semibold">
                {`x${purchaseOrders?.products[0].quantity}`}
              </span>
            </div>
            <div>
              <span className="_product_price text-[18px] font-bold ">{`$ ${purchaseOrders?.totalAmount} `}</span>
            </div>
          </div>

          <img src={Line} alt="" />
        </div>

        <div className="_footer mb-6">
          <div className="_inv_status flex justify-between items-center">
            <span className="text-[16px]">
              {" "}
              Inv Status:{" "}
              <span
                className={`${
                  purchaseOrders?.paymentStatus === "Partially Paid"
                    ? "_primary-color"
                    : "_success_color"
                }   ml-2`}
              >
                {purchaseOrders?.paymentStatus}
              </span>
            </span>
            {purchaseOrders?.paymentStatus === "Partially Paid" && (
              <Button
                className="_bg-primary-color text-white hover:text-white _hover"
                onClick={() => {
                  // setViewModalOpen(false);
                  setPaymentModalOpen(true);
                }}
              >
                Pay
              </Button>
            )}
          </div>

          <div className="_total_paid">
            <span>
              {" "}
              Total Paid:{" "}
              <span
                className={`${
                  purchaseOrders?.paymentStatus === "Partially Paid"
                    ? "_success_color"
                    : "_primary-color"
                }   ml-2 `}
              >{`$ ${purchaseOrders?.payments[0]?.paymentDetails?.paidAmount} `}</span>
            </span>
          </div>

          {purchaseOrders?.paymentStatus === "Partially Paid" && (
            <>
              <div className="_total_remaining">
                <span>
                  {" "}
                  Total Remaining:{" "}
                  <span className="ml-2 _primary-color">{`$ ${purchaseOrders?.remainingAmount}`}</span>
                </span>
              </div>

              <div className="_remaining_due_date">
                <span>
                  {" "}
                  Remaining Due Date:{" "}
                  <span className="ml-2 _primary-color">
                    {` ${purchaseOrders?.payments[0]?.paymentDetails?.dueDate} `}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Button onClick={handleExport} className="">
            Export Excel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Viewmodal;
