import React from "react";
import CardComponent from "../card/card";
import { laptopImg } from "../../../assets/images";
const CommonTab: React.FC<any> = ({ data }) => {

  return (
    // <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-x-24 ">
    //   {data?.length && data?.map((card: { name: string; images: any }, index: number) => (
    //     <CardComponent key={index} label={card?.name} img={card?.images} />
    //   ))}
    // </div>
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-x-24 ">
      {data?.name ?
        <CardComponent key={data?._id} label={data?.name} img={data?.images ? data?.images : laptopImg} />
        : (<h1>No Product</h1>)
      }
    </div>
  );
};

export default CommonTab;
