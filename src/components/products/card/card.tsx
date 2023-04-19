import { Card } from "antd";
import React from "react";
import { addIcon } from "../../../assets/images";

const CardComponent: React.FC<any> = ({ label, img ,color}) => (
  <Card style={{ width: "10.688rem", height: "12.063rem" }}>
    <img src={img} alt="laptop"  style={{ width: "107.74px", height: "107.74px" }} />
    <div className="flex items-center justify-between">
      <span className='_productname'>{label}</span>
      <span className='_productname'>{color}</span>

      <img className="w-auto cursor-pointer" src={addIcon} alt="add" />
    </div>
  </Card>
);

export default CardComponent;
