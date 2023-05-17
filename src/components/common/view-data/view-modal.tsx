import React, { useState } from "react";

import { Button, Modal } from "antd";

import * as XLSX from "xlsx";
import { laptopImg } from "../../../assets/images";
import Line from "../../../assets/images/dashboard/Line.png";
import "../../../sass/modals.scss";
import PayModal from "../../purchase-order/po-view-modal/pay-modal";
import { imageBaseUrl } from "../../../utils/constants";
import { noImg } from "../../../assets/images";

// interface ExportButtonProps {
//   data: Array<Object>; // Data to be exported in Excel file
//   fileName: string; // Name of the exported file
// }

const Viewmodal: React.FC<any> = ({
  viewModalOpen,
  setViewModalOpen,
  cardView,
  Name,
  Number
}) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  console.log(cardView , "PO Data View Modal");

  const Product_Image = cardView?.products.map(
    (product: { image: any }) => product.image
  );

  const image = imageBaseUrl + Product_Image;

  /* [
    { name: purchaseOrders?.poNumber, age: 22 },
    { name: "Usman", age: 25 },
    { name: "Hasan", age: 40 },
  ] */

  const handleExport = () => {
    const inventoryStatus = cardView?.paymentStatus;
    const partialPaid = inventoryStatus === "Partially Paid";

    const data = cardView.products?.map((product: any) => ({
      productName: product?.name,
      quantity: product?.quantity,
      price: product?.amount,
      image: product?.image ?? noImg,
      productId: cardView?._id,
      poNo: cardView?.poNumber,
      company: cardView?.vendor[0]?.companyName,
      inventoryStatus,
      totalPaid: cardView?.payments[0]?.paymentDetails?.paidAmount,
      ...(partialPaid && {
        remaining: cardView?.remainingAmount,
        dueDate: cardView?.payments[0]?.paymentDetails?.dueData,
      }),
    }));

    console.log("purchaseOrders", cardView);

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
        paidAmount={cardView?.remainingAmount}
        poId={cardView?._id}
        paymentModalOpen={paymentModalOpen}
        setPaymentModalOpen={setPaymentModalOpen}
        showButton={true}
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
          {/* <span className="text-red-500">#{cardView?.poNumber && cardView?.poNumber}</span> */}

        </h4>
        <h4 className="_company_name text-xl">
          {Name}:
          <span className="font-medium _label-grey">
       
            {/* {cardView?.vendor[0]?.companyName && cardView?.vendor[0]?.companyName}{" "} */}
            
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
                {cardView?.products[0].name}
              </span>
            </div>
            <div>
              <span className="_product_quantity w-[112px] h-[66p] font-semibold">
                {`x${cardView?.products[0].quantity}`}
              </span>
            </div>
            <div>
              <span className="_product_price text-[18px] font-bold ">{`$ ${cardView?.totalAmount} `}</span>
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
                  cardView?.paymentStatus === "Partially Paid"
                    ? "_primary-color"
                    : "_success_color"
                }   ml-2`}
              >
                {cardView?.paymentStatus}
              </span>
            </span>
            {cardView?.paymentStatus === "Partially Paid" && (
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
                  cardView?.paymentStatus === "Partially Paid"
                    ? "_success_color"
                    : "_primary-color"
                }   ml-2 `}
              >{`$ ${cardView?.payments[0]?.paymentDetails?.paidAmount} `}</span>
            </span>
          </div>

          {cardView?.paymentStatus === "Partially Paid" && (
            <>
              <div className="_total_remaining">
                <span>
                  {" "}
                  Total Remaining:{" "}
                  <span className="ml-2 _primary-color">{`$ ${cardView?.remainingAmount}`}</span>
                </span>
              </div>

              <div className="_remaining_due_date">
                <span>
                  {" "}
                  Remaining Due Date:{" "}
                  <span className="ml-2 _primary-color">
                    {` ${cardView?.payments[0]?.paymentDetails?.dueDate} `}
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
