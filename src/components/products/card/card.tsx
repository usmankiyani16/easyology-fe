import { Card } from "antd";
import React from "react";
import { addIcon } from "../../../assets/images";

const CardComponent: React.FC<any> = ({ label, img }) => (
  <Card style={{ width: "10.688rem", height: "12.063rem" }}>
    <img src={img} alt="laptop" />
    <div className="flex items-center justify-between">
      <span className='_productname'>{label}</span>
      <img className="w-auto cursor-pointer" src={addIcon} alt="add" />
    </div>
  </Card>
);

export default CardComponent;
