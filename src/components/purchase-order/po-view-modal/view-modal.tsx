import React, { useState } from "react";

import { Button, Modal} from "antd";

import * as XLSX from "xlsx";
import { laptopImg } from "../../../assets/images";
import Line from "../../../assets/images/Line.png";
import "../../../sass/modals.scss";
import PayModal from "./pay-modal";

// interface ExportButtonProps {
//   data: Array<Object>; // Data to be exported in Excel file
//   fileName: string; // Name of the exported file
// }

const Viewmodal: React.FC<any> = ({
  viewModalOpen,
  setViewModalOpen,
  purchaseOrders,
}) => {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleExport = () => {
    const data = [
      { name: "Ali", age: 22 },
      { name: "Usman", age: 25 },
      { name: "Hasan", age: 40 },
    ];
    const fileName = "export";

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  return (
    <div className="_view_modal_wrap">
      <PayModal
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
        <h4 className="_po_Number text-xl mt-8">
          PO Number: <span className="text-red-500">#456</span>
        </h4>
        <h4 className="_company_name">Lenovo Company</h4>
        {/* <p className="_sheduled_date font-medium">
          Sheduled:{" "}
          <span className="text-black font-medium"> Friday 12 AM EST</span>
        </p> */}

        {/* --------------- Products Container -------------------- */}

        <div className="mt-2" style={{ height: "290px", overflowY: "auto" }}>
          {/* --------- Purchase Order data ka map yaha lagega -------------- */}

          <p className="_product_id font-bold">
            Product ID <span>#6784</span>
          </p>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-3">
              <img
                src={laptopImg}
                alt="Products"
                className="w-[59px] h-[66px]"
              />
              <p className="_product_name w-[112px] h-[66px] font-medium">
                Laptop Lenovo Series 4
              </p>
            </div>
            <div>
              <p className="_product_quantity w-[112px] h-[66p] font-medium">
                x2
              </p>
            </div>
            <div>
              <p className="_product_price text-[18px] font-bold">$ 599.00</p>
            </div>
          </div>

          <img src={Line} alt="" />
        </div>

        {/* //! Donot touch This commented code as it will be used in upcoming release */}

        {/*   <div className="_contact_details mt-4">
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
          <p className="_label font-bold">
            Payment:{" "}
            <span className="text-red-500 ml-[10px]">Full Payment</span>
          </p>
          <p className="_label font-bold">
            Delivery Type: <span className=" text-red-500">Standard</span>
          </p>
        </div> */}

        {/* ----------------- Footer ------------------------------ */}

        {/*    <div className="_footer mt-6 font-bold">
          <div className="flex justify-between">
            <p className="_label">Total Discount</p>
            <p>$ 1500</p>
          </div>
          <div className="flex justify-between font-bold">
            <p className="_label">Discount</p>
            <p>$ 1500</p>
          </div>
          <div className="flex justify-between">
            <p className="_label">
              Sales Tax <span>(2%)</span>
            </p>
            <p>$ 1500</p>
          </div>

          <div className="flex justify-between">
            <p className="_label _label_total">Total</p>
            <p className="_label_total">$ 1500</p>
          </div>
        </div> */}

        <div className="_footer mb-6">
          <div className="_inv_status flex justify-between items-center">
            <span className="text-[16px]">
              {" "}
              Inv Status:{" "}
              <span className="ml-2 _primary-color">Partially Paid</span>
            </span>
            <Button
              className="_bg-primary-color text-white hover:text-white"
              onClick={() => {
                setPaymentModalOpen(true);
                setViewModalOpen(false);
              }}
            >
              Pay
            </Button>
          </div>

          <div className="_total_paid">
            <span>
              {" "}
              Total Paid: <span className="ml-2 _success_color">$ 900</span>
            </span>
          </div>

          <div className="_total_remaining">
            <span>
              {" "}
              Total Remaining:{" "}
              <span className="ml-2 _primary-color">$ 300</span>
            </span>
          </div>

          <div className="_remaining_due_date">
            <span>
              {" "}
              Remaining Due Date:{" "}
              <span className="ml-2 _primary-color">$ 300</span>
            </span>
          </div>
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
