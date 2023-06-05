import React, { useState } from "react";
import "./operations.scss";
import { Button, InputNumber } from "antd";
import CashPay from "./cash-pay/cash-pay";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  getInvoiceNumber,
  holdInvoice,
} from "../../../../store/order/order-slice";
import { setSelectedProductsToNull } from "../../../../store/products/products-slice";
import VoidInvoice from "./void-invoice/void-invoice";
import { customerType } from "./interfaces/operations.interface";
import { Toast } from "../../../common/toast/toast";
import FinalizeOrder from "../../../orders/view-orders/convert-to-invoice/finalize-order/finalize-order";

const Operations: React.FC<any> = ({
  totalPrice,
  selectCustomer,
  setSelectCustomer,
  onSave,
  showOrderStatus,
  showFinalizeButton,
}) => {
  const dispatch = useAppDispatch();
  const { invoiceNumber } = useAppSelector((state) => state.order);
  const { selectedProducts } = useAppSelector((state) => state.products);
  const [isCashPayOpen, setIsCashPayOpen] = useState(false);
  const [isVoidOpen, setIsVoidOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const taxRate = 0.025; // 2.5%
  const salesTax =
    selectCustomer?.type == customerType.wholeseller ? 0 : totalPrice * taxRate;
  const salesTaxCount = selectCustomer?.type == customerType.retailer ? 2.5 : 0;
  const total = totalPrice + salesTax - discount;
  const disableButton = !selectedProducts?.length;

  const handleChange = (value: number | undefined | null) => {
    if (Number(value) < totalPrice) {
      if ((value !== undefined || value !== null) && Number(value) >= 0) {
        setDiscount(Number(value));
      }
    }
  };

  const handleNoSale = () => {
    Toast("Drawer opened");
    // dispatch(getInvoiceNumber());
    // dispatch(setSelectedProductsToNull());
    // setSelectCustomer(null);
  };
  const handleHoldInvoice = async () => {
    const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
    const storeId = data?.storeId;
    let products = selectedProducts?.map((prod: any) => ({
      productId: prod?._id,
      variantId: prod?.variants?._id,
      quantity: prod?.quantity,
    }));
    let payload: any = {
      storeId,
      invoiceNumber,
      userId: data?._id,
      customerId: selectCustomer?._id,
      subTotalAmount: totalPrice,
      discount: discount,
      salesTax,
      totalAmount: total,
      orderCategory: "store",
      products,
    };
    const res = await dispatch(holdInvoice(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getInvoiceNumber());
      dispatch(setSelectedProductsToNull());
      setSelectCustomer(null);
    }
  };

  // Saving Data ONCLICK

  const handleClick = () => {
    onSave();
  };

  return (
    <div className="_operations flex justify-between w-full mt-10">
      <div className="flex flex-col gap-10 w-9/12">
        <div className="flex gap-5">
          <Button
            // onClick={handleVoidInvoice}
            disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center _primary-button"
            onClick={() => setIsVoidOpen(true)}
          >
            Void Invoice
          </Button>
          <Button
            onClick={handleNoSale}
            disabled={disableButton}
            className="w-32 flex items-center justify-center _primary-button"
          >
            No Sale
          </Button>
          <Button
            onClick={handleHoldInvoice}
            disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center _primary-button"
          >
            Hold Invoice
          </Button>
        </div>
        <div className="flex gap-5">
          <Button
            disabled={disableButton || !selectCustomer?._id}
            onClick={() => setIsCashPayOpen(true)}
            className="w-32 flex items-center justify-center _primary-button"
          >
            Cash Pay
          </Button>
          <Button
            disabled={true}
            // disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center _primary-button"
          >
            Ach Pay
          </Button>
          <Button
            disabled={true}
            // disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center _primary-button"
          >
            Credit Card
          </Button>
        </div>
      </div>
      <div className="w-3/12 pr-10 flex flex-col gap-5  font-semibold">
        <div className="flex ">
          <label className="w-9/12">Sub-Total </label>
          <label className="w-3/12 whitespace-nowrap">
            $ {totalPrice.toFixed(2)}
          </label>
        </div>
        <div className="flex ">
          <label className="w-9/12 whitespace-nowrap">Discount </label>
          <label className=" rounded w-3/12">
            <InputNumber
              style={{ width: "100%" }}
              className="_remove-icon shadow-lg"
              type="number"
              min={0}
              max={totalPrice | 0}
              value={discount > totalPrice ? 0 : discount}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex ">
          <div className="w-9/12">
            <label className="_grey-color">Sales Tax </label>
            <label>{`(${salesTaxCount.toFixed(2)}%)`} </label>
          </div>
          <label className="w-3/12 whitespace-nowrap">
            $ {salesTax.toFixed(2)}
          </label>
        </div>
        {!showFinalizeButton ? (
          <div className="flex ">
            <label className="_primary-color w-9/12 ">Total </label>
            <label className="w-3/12 whitespace-nowrap">
              $ {total.toFixed(2)}
            </label>
          </div>
        ) : (
          <div>
            <div className="flex ">
              <label className="_success_color w-9/12 ">Total Paid</label>
              <label className="w-3/12 whitespace-nowrap">
                $ {total.toFixed(2)}
              </label>
            </div>

            <div className="flex ">
              <label className="_primary-color w-9/12 ">Remaining Amount</label>
              <label className="w-3/12 whitespace-nowrap">
                $ {total.toFixed(2) ?? ''}
              </label>
            </div>
          </div>
        )}

        {showOrderStatus && (
          <div className="m-auto _white-color">
            <Button
              className="w-32 _primary-button"
              type="primary"
              onClick={handleClick}
            >
              Save
            </Button>
          </div>
        )}

        {showFinalizeButton && (
          <div className="m-auto _white-color">
            <Button
              className="w-32 _primary-button"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Finalize
            </Button>
          </div>
        )}
      </div>
      {isCashPayOpen && (
        <CashPay
          selectCustomer={selectCustomer}
          setSelectCustomer={setSelectCustomer}
          salesTax={salesTax}
          discount={discount}
          totalPrice={totalPrice}
          total={total}
          isCashPayOpen={isCashPayOpen}
          setCashPayOpen={setIsCashPayOpen}
        />
      )}

      {isVoidOpen && (
        <VoidInvoice
          salesTax={salesTax}
          discount={discount}
          totalPrice={totalPrice}
          total={total}
          isVoidOpen={isVoidOpen}
          setIsVoidOpen={setIsVoidOpen}
          selectCustomer={selectCustomer}
          setSelectCustomer={setSelectCustomer}
        />
      )}

      {isModalOpen && (
        <FinalizeOrder
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Operations;
