import React from "react";
import CardComponent from "../card/card";
import { laptopImg } from "../../../assets/images";
const CommonTab: React.FC<any> = ({ data }) => {

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 sm:gap-x-24 ">
      {data?.name ?
        <CardComponent key={data?._id} label={data?.name} img={data?.image ? data?.image : laptopImg} />
        : (<h1>No Product</h1>)
      }
    </div>
  );
};

export default CommonTab;
