import React from "react";

interface totalAmount{
  stateData: any
}

const TotalAmount:React.FC<totalAmount> = ({stateData}) => {
  console.log( 'm',stateData)
  return (
    <div className="flex justify-around text-xl mt-4">
      <div>
        <span>Total Amount {stateData?.label3} </span>
        <span className="_primary-color">$ {stateData?.data?.totalAmount}</span>
      </div>
      <div>
        <span>Total no of {stateData?.label2} </span>
        <span className="_primary-color"> {stateData?.data?.totalCount}</span>
      </div>
    </div>
  );
};

export default TotalAmount;
