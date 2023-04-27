import React from "react";
import CardComponent from "../card/card";
import { laptopImg } from "../../../assets/images";
import { imageBaseUrl } from "../../../utils/constants";
const CommonTab: React.FC<any> = ({ data }) => {

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-8">
      {data?.name ?
        <CardComponent key={data?._id} label={data?.name} color={data?.color} img={data?.image ? imageBaseUrl + data?.image : laptopImg} />
        : (<h1>No Product</h1>)
      }
    </div>
  );
};

export default CommonTab;
