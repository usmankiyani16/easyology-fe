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
    (prod: any) => prod?.variants?._id === item?.variants?._id
  );

  const image = imageBaseUrl + item?.image;
  const addToCart = () => {
    let product: any = { ...item, quantity: 1 };
    dispatch(addSelectedProducts(product));
  };
  return (
    <Card style={{ width: "11.688rem", height: "16.063rem" }}>
      <img
        src={item?.image ? image : noImg}
        alt="laptop"
        className="w-[160.69px] h-[107.74px] object-cover"
      />
      <div className="flex flex-col ">
        {/*  <div className="flex justify-between mt-2 h-[80px]">
          <div className="flex flex-col">
            <span className="_productname">{item?.name}</span>
            <span className="_productname">
              {item?.variants?.options?.color}
            </span>
            <span className="_productname">
              {item?.variants?.options?.size}
            </span>
            <span className="_productname">
              {item?.variants?.stock?.totalQuantity}
            </span>
          </div>

          <div className="flex items-end">
            <span className="_productname _primary-color">{`$${item?.variants?.amount}`}</span>
          </div>
        </div>
 */}

        <div className="flex flex-col h-[80px] mt-2">
          <span className="_productname">{item?.name}</span>
          <span className="_productname">{item?.variants?.options?.color}</span>
          <span className="_productname">{item?.variants?.options?.size}</span>

          {/* ${ (!item?.variants?.stock?.totalQuantity || !item?.variants?.options?.color || !item?.variants?.options?.size) && "h-[60px]"}  */}

          <div className={`flex justify-between `}>
            <span className="_productname">
              {item?.variants?.stock?.totalQuantity}
            </span>

            <div className="flex items-end">
              <span className="_productname _primary-color flex items-end">{`$${item?.variants?.amount}`}</span>
            </div>
          </div>
        </div>
        <button
          onClick={addToCart}
          disabled={item?.variants?.stock?.totalQuantity === 0 || !!findOne}
          className={`${
            (item?.variants?.stock?.totalQuantity === 0 || !!findOne) &&
            "cursor-not-allowed _bg-light-primary-color"
          } self-center _bg-primary-color rounded  px-6 _white-color flex justify-center mt-2`}
        >
          Add to cart
        </button>
      </div>
    </Card>
  );
};

export default CardComponent;
