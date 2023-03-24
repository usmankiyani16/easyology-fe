import React from "react";
import CardComponent from "../card/card";

const CommonTab: React.FC<any> = ({ data }) => {
  return (
    <div className="flex gap-4 grid grid-cols-4">
      {data.map((card: { label: string; img: any }) => (
        <CardComponent label={card.label} img={card.img} />
      ))}
    </div>
  );
};

export default CommonTab;
