import React, { useState } from "react";
import "./operations.scss";
import { Button, InputNumber } from "antd";
import CashPay from "./cash-pay/cash-pay";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  getInvoiceNumber,
  holdInvoice,
  voidInvoice,
} from "../../../store/order/order-slice";
import { setSelectedProductsToNull } from "../../../store/products/products-slice";

const Operations: React.FC<any> = ({
  totalPrice,
  selectCustomer,
  setSelectCustomer,
}) => {
  const dispatch = useAppDispatch();
  const { invoiceNumber } = useAppSelector((state) => state.order);
  const { selectedProducts } = useAppSelector((state) => state.products);
  const [isCashPayOpen, setIsCashPayOpen] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const taxRate = 0.025; // 2.5%
  const salesTax = totalPrice * taxRate;
  const total = totalPrice + salesTax - discount;
  const disableButton = !selectedProducts?.length;

  const handleChange = (value: number | undefined | null) => {
    if (Number(value) < totalPrice) {
      if ((value !== undefined || value !== null) && Number(value) >= 0) {
        setDiscount(Number(value));
      }
    }
  };
  const handleVoidInvoice = async () => {
    const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");
    const storeId = data?.storeId;
    let products = selectedProducts?.map((prod: any) => ({
      productId: prod?._id,
      variantId: prod?.variants?._id,
      quantity: prod?.quantity,
    }));
    let payload: any = {
      invoiceNumber,
      reason: "reason",
      storeId,
      userId: data?._id,
      customerId: selectCustomer?._id,
      subTotalAmount: totalPrice,
      discount: discount,
      salesTax,
      totalAmount: total,
      products,
    };
    const res = await dispatch(voidInvoice(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getInvoiceNumber());
      dispatch(setSelectedProductsToNull());
      setSelectCustomer(null);
    }
  };
  const handleNoSale = () => {
    dispatch(getInvoiceNumber());
    dispatch(setSelectedProductsToNull());
    setSelectCustomer(null);
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
      products,
    };
    const res = await dispatch(holdInvoice(payload));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getInvoiceNumber());
      dispatch(setSelectedProductsToNull());
      setSelectCustomer(null);
    }
  };
  return (
    <div className="_operations flex justify-between w-full mt-10">
      <div className="flex flex-col gap-10 w-9/12">
        <div className="flex gap-5">
          <Button
            onClick={handleVoidInvoice}
            disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center"
          >
            Void Invoice
          </Button>
          <Button
            onClick={handleNoSale}
            disabled={disableButton}
            className="w-32 flex items-center justify-center"
          >
            No Sale
          </Button>
          <Button
            onClick={handleHoldInvoice}
            disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center"
          >
            Hold Invoice
          </Button>
        </div>
        <div className="flex gap-5">
          <Button
            disabled={disableButton || !selectCustomer?._id}
            onClick={() => setIsCashPayOpen(true)}
            className="w-32 flex items-center justify-center"
          >
            Cash Pay
          </Button>
          <Button
            disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center"
          >
            Ach Pay
          </Button>
          <Button
            disabled={disableButton || !selectCustomer?._id}
            className="w-32 flex items-center justify-center"
          >
            Credit Card
          </Button>
        </div>
      </div>
      <div className="w-3/12 pr-10 flex flex-col gap-5">
        <div className="flex ">
          <label className="w-9/12">Sub-Total </label>
          <label className="w-3/12 whitespace-nowrap">$ {totalPrice}</label>
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
            <label>(2.5%) </label>
          </div>
          <label className="w-3/12 whitespace-nowrap">
            $ {salesTax.toFixed(2)}
          </label>
        </div>
        <div className="flex ">
          <label className="_primary-color w-9/12 ">Total </label>
          <label className="w-3/12 whitespace-nowrap">
            $ {total.toFixed(2)}
          </label>
        </div>
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
    </div>
  );
};

export default Operations;
