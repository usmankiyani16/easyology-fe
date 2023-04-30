import { Card } from "antd";
import React from "react";
import { noImg } from "../../../assets/images";
import { imageBaseUrl } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addSelectedProducts } from "../../../store/products/products-slice";

const CardComponent: React.FC<any> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { selectedProducts } = useAppSelector((state) => state.products);
  const findOne = selectedProducts?.find(
    (prod: any) => prod?._id === item?._id
  );
  const image = imageBaseUrl + item?.image;
  const addToCart = () => {
    let product = {
      _id: item?._id,
      value: item?.name,
      image: item?.image ?? noImg,
      qty: 1,
      maxQty: item?.variants?.stock?.totalQuantity,
      price: item?.variants?.amount,
      options: item?.variants?.options,
    };
    dispatch(addSelectedProducts(product));
  };
  return (
    <Card style={{ width: "11.688rem", height: "16.063rem" }}>
      <img
        src={item?.image ? image : noImg}
        alt="laptop"
        className="w-[160.69px] h-[107.74px]"
      />
      <div className="flex flex-col ">
        <div className="flex justify-between mt-1">
          <div className="flex flex-col">
            <span className="_productname">{item?.name}</span>
            <span className="_productname">
              {item?.variants?.options.color}
            </span>
            <span className="_productname">{item?.variants?.options.size}</span>
            <span className="_productname">
              {item?.variants?.stock.totalQuantity}
            </span>
          </div>

          <div className="flex items-end">
            <span className="_productname _primary-color">{`$${item?.variants?.amount}`}</span>
          </div>
        </div>

        <button
          onClick={addToCart}
          disabled={item?.variants?.stock.totalQuantity === 0 || !!findOne}
          className={`${
            item?.variants?.stock.totalQuantity === 0 ||
            (!!findOne && "cursor-not-allowed _bg-light-primary-color")
          } self-center _bg-primary-color rounded  px-6 _white-color flex justify-center mt-2`}
        >
          Add to cart
        </button>
      </div>
    </Card>
  );
};

export default CardComponent;
