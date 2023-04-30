import React, { Dispatch, SetStateAction, useState } from "react";
import "./item-card.scss";
import { DeleteFilled } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { deleteIcon } from "../../../assets/images";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  decrementProduct,
  deleteSelectedProducts,
  incrementProduct,
} from "../../../store/products/products-slice";
const ItemCard = () => {
  const { selectedProducts } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const handleDelete = (productId: string) => {
    dispatch(deleteSelectedProducts(productId));
  };

  const handleChange = (index: number, value: any) => {};

  const handleIncrement = (index: number) => {
    if (selectedProducts[index]?.qty < selectedProducts[index].maxQty) {
      dispatch(incrementProduct(index));
    }
  };
  const handleDecrement = (index: number) => {
    if (selectedProducts[index]?.qty > 1) {
      dispatch(decrementProduct(index));
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between">
        <label className="text-xl font-semibold  w-2/4">Items</label>
        <label className="text-xl font-semibold flex justify-center w-1/4">
          Qty
        </label>
        <label className="text-xl font-semibold flex  w-1/4">Price</label>
      </div>
      <div className="h-[224px] overflow-auto _custom-scrollbar">
        {selectedProducts?.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full my-2 flex justify-between shadow-md hover:shadow-xl"
          >
            <div className=" w-2/4">
              <div className="flex flex-col">
                {/* <p className="_grey-color">{item?._id}</p> */}
                <div className="flex items-center gap-3 ">
                  <img
                    className="w-20 h-16 rounded "
                    src={item?.image}
                    alt="img"
                  />
                  <h1 className="font-semibold text-sm">{item?.name}</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/4">
              <div className="_grey-color text-center">{item?.maxQty}</div>
              <div className=" flex justify-center items-center">
                <Button
                  disabled={item?.qty === 1}
                  className="flex items-center justify-center _primary-color rounded px-4 h-[30px] text-xl"
                  onClick={() => handleDecrement(index)}
                >
                  -
                </Button>
                <InputNumber
                  className="mx-2 "
                  min={1}
                  type="number"
                  max={item?.maxQty | 1}
                  value={item?.qty}
                  onChange={(value) => handleChange(index, value)}
                />
                <Button
                  disabled={item?.qty === item.maxQty}
                  className="flex items-center justify-center _primary-color rounded px-4 h-[30px] text-lg"
                  onClick={() => handleIncrement(index)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className=" flex justify-between items-center w-1/4">
              <div>
                <p className="_grey-color">$ 103.00</p>
                <p className="shadow px-1 rounded">
                  $ {item?.qty * item?.price}
                </p>
              </div>
              <div
                className="flex items-center mr-3 cursor-pointer p-1"
                onClick={() => handleDelete(item?._id)}
              >
                <img src={deleteIcon} alt="delete" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;
