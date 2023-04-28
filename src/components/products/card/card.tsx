import { Card } from "antd";
import React from "react";
import { addIcon, noImg } from "../../../assets/images";
import { imageBaseUrl } from "../../../utils/constants";

const CardComponent: React.FC<any> = ({ item }) => {
  const image = imageBaseUrl + item?.image;
  return (
    <Card style={{ width: "10.688rem", height: "14.063rem" }}>
      <img
        src={item?.image ? image : noImg}
        alt="laptop"
        style={{ width: "107.74px", height: "107.74px" }}
      />
      <div className="flex flex-col justify-between">
        <span className="_productname">{item?.name}</span>
        <span className="_productname">{`color`}</span>

        <span className="cursor-pointer _bg-primary-color rounded self-center px-3 _white-color">Add to cart</span>
      </div>
    </Card>
  );
};

export default CardComponent;
