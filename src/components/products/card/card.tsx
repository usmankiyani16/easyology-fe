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
  console.log(item, "productssss");

  const image = imageBaseUrl + item?.image;
  const addToCart = () => {
    let product: any = { ...item, quantity: 1 };
    dispatch(addSelectedProducts(product));
  };
  return (

    // <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
    <Card style={{ width: "14.688rem", height: "19.063rem" }}>
      <img
        src={item?.image ? image : noImg}
        alt="laptop"
        className="w-[190.69px] h-[107.74px] object-cover"
      />
      <div className="flex flex-col ">
        <div className="flex flex-col h-[120px] mt-2">
          <span className="_productname">
            Name <span className="_success_color">{item?.name}</span>
          </span> 
          <span className="_productname">
            {item?.variants?.options?.color && "Color"}{" "}
            <span className="_success_color">{item?.variants?.options?.color}</span>{" "}
          </span>
          <span className="_productname">
            {item?.variants?.options?.size && "Size"}{" "}
            <span className="_success_color">
              {item?.variants?.options?.size}
            </span>{" "}
          </span>

          {/* ${ (!item?.variants?.stock?.totalQuantity || !item?.variants?.options?.color || !item?.variants?.options?.size) && "h-[60px]"}  */}

          <div className={`flex justify-between`}>
            <span className="_productname">
            {item?.variants?.stock?.totalQuantity && 'QTY'} <span className="_success_color"> {item?.variants?.stock?.totalQuantity}</span></span>

          
          </div>
          <div className="flex justify-between">
              <span className="_productname">Purchase Amount</span>
              <span className="_productname _primary-color flex items-end">{`$${
                item?.variants?.purchaseAmount ?? ""
              }`}</span>
              
            </div>
            <div className="flex justify-between">
              <span className="_productname">WholeSale Amount</span>
              <span className="_productname _primary-color flex items-end">{`$${
                item?.variants?.purchaseAmount ?? ""
              }`}</span>
              
            </div>
            <div className="flex justify-between">
              <span className="_productname">Retail Amount</span>
              <span className="_productname _primary-color flex items-end">{`$${
                item?.variants?.purchaseAmount ?? ""
              }`}</span>
              
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
    // </div>

  );
};

export default CardComponent;
