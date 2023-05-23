import React, { Dispatch, SetStateAction, useState } from "react";
import "./item-card.scss";
import { DeleteFilled } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { deleteIcon, noImg } from "../../../../assets/images";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  changeProductPrice,
  changeProductQuantity,
  decrementProduct,
  deleteSelectedProducts,
  incrementProduct,
} from "../../../../store/products/products-slice";
import { imageBaseUrl } from "../../../../utils/constants";
const ItemCard = () => {
  const { selectedProducts } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const handleDelete = (index: number) => {
    dispatch(deleteSelectedProducts(index));
  };

  const handleChange = (index: number, value: any) => {
    let totalQuantity = selectedProducts[index]?.variants?.stock?.totalQuantity;
    if (value > 0 && selectedProducts[index]?.quantity <= totalQuantity) {
      let payload = {
        index,
        value,
      };
      dispatch(changeProductQuantity(payload));
    }
  };

  const handleIncrement = (index: number) => {
    if (
      selectedProducts[index]?.quantity <
      selectedProducts[index]?.variants?.stock?.totalQuantity
    ) {
      dispatch(incrementProduct(index));
    }
  };
  const handleDecrement = (index: number) => {
    if (selectedProducts[index]?.quantity > 1) {
      dispatch(decrementProduct(index));
    }
  };

  const handlePriceChange = (index: number, value: any) => {
    if (value > 0) {
      let payload = {
        index,
        value,
      };
      dispatch(changeProductPrice(payload));
    }
  };

  console.log(selectedProducts, 'products')
  return (
    <div className="_item-card">
      <div className="w-full flex justify-between">
        <label className="text-xl font-semibold  w-2/4">Items</label>
        <label className="text-xl font-semibold flex justify-center w-1/4">
          Qty
        </label>
        <label className="text-xl font-semibold flex  w-1/4 justify-center pr-2">
          Price
        </label>
        <label className="text-xl font-semibold flex  w-1/4 _primary-color">
          Total
        </label>
      </div>
      <div className="h-[184px] overflow-auto _custom-scrollbar">
        {selectedProducts?.map((item: any, index: number) => (
          <div
            key={index}
            className="p-2 _bg-white-color rounded w-full my-2 flex justify-between shadow-md "
          >
            <div className=" w-2/4">
              <div className="flex flex-col">
                {/* <p className="_grey-color">{item?._id}</p> */}
                <div className="flex items-center gap-3 ">
                  <img
                    className="w-20 h-16 rounded object-cover	"
                    src={item?.image ? imageBaseUrl + item?.image : noImg}
                    alt="img"
                  />
                  <h1 className="font-semibold text-sm">{item?.name}</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/4 ">
              <div className="_grey-color text-center">
                {item?.variants?.stock?.totalQuantity}
              </div>
              <div className=" flex justify-center items-center">
                <Button
                  disabled={item?.quantity === 1}
                  className="flex items-center justify-center _primary-color rounded px-4 h-[30px] text-xl"
                  onClick={() => handleDecrement(index)}
                >
                  -
                </Button>
                <InputNumber
                  className="mx-2 "
                  min={1}
                  type="number"
                  max={item?.variants?.stock?.totalQuantity}
                  value={item?.quantity}
                  onChange={(value) => handleChange(index, value)}
                />
                <Button
                  disabled={
                    item?.quantity === item?.variants?.stock?.totalQuantity
                  }
                  className="flex items-center justify-center _primary-color rounded px-4 h-[30px] text-lg"
                  onClick={() => handleIncrement(index)}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="_price flex flex-col w-1/4 justify-center items-center mt-2  ">
              <InputNumber
                onChange={(value) => handlePriceChange(index, value)}
                value={item?.variants?.amount}
                prefix="$"
              />
            </div>
            <div className=" flex justify-between items-center w-1/4 mt-2">
              <div>
                {/* <p className="_grey-color">$ 103.00</p> */}
                <p className=" font-semibold _primary-color">
                  $ {(item?.variants?.amount * item?.quantity).toFixed(2)}
                </p>
              </div>
              <div
                className="flex items-center mr-3 cursor-pointer p-1"
                onClick={() => handleDelete(index)}
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
