import { Card } from "antd";
import React from "react";
import { addIcon, noImg } from "../../../assets/images";
import { imageBaseUrl } from "../../../utils/constants";

const CardComponent: React.FC<any> = ({ item }) => {
  const image = imageBaseUrl + item?.image;
  return (
    <Card style={{ width: "11.688rem", height: "16.063rem" }}>
      <img
        src={item?.image ? image : noImg}
        alt="laptop"
  
        className="w-[160.69px] h-[107.74px]"
      />
      {/* <div className="flex flex-col justify-between"> */}

      <div className="flex justify-between mt-1">

        <div className="flex flex-col">
        
        <span className="_productname">{item?.name}</span>
        <span className="_productname">{item?.variants?.options.color}</span>
        <span className="_productname">{item?.variants?.options.size}</span>
        <span className="_productname">{item?.variants?.stock.totalQuantity}</span>
        </div>

        <div className="flex items-end">

        <span className="_productname _primary-color">{`$${item?.variants?.amount}`}</span>

        </div>

        </div>


        <span className="cursor-pointer _bg-primary-color rounded self-center px-6 _white-color flex justify-center mt-2">Add to cart</span>

    
      {/* </div> */}
    </Card>
  );
};

export default CardComponent;
