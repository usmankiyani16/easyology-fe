import React from "react";
import CardComponent from "../card/card";

const CommonTab: React.FC<any> = ({ data }) => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 sm:gap-x-24 ">
      {data.map((card: { label: string; img: any }, index: number) => (
        <CardComponent key={index} label={card.label} img={card.img} />
      ))}
    </div>
  );
};

export default CommonTab;
