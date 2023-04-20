import { Card } from "antd";
import React from "react";
import { addIcon } from "../../../assets/images";

const CardComponent: React.FC<any> = ({ label, img ,color}) => (
  <Card >
    <img src={img} alt="laptop" />
    <div className="flex items-center justify-between">
      <span className='_productname'>{label}</span>
      <span className='_productname'>{color}</span>

      <img className="w-auto cursor-pointer" src={addIcon} alt="add" />
    </div>
  </Card>
);

export default CardComponent;
