import React from "react";
import {
  cart2Icon,
  cartIcon,
  downloadIcon,
  profileIcon,
} from "../../assets/icons";

const Header = () => {
  
  return (
    <div className="flex justify-between items-center w-full pt-3 px-5">
      <div className="flex gap-4 w-1/3">
        <img src={profileIcon} />
        <div className="flex flex-col justify-center">
          <span className="primary-color text-2xl">Easyology</span>
          <span>date</span>
        </div>
      </div>
      <div className="w-1/3">search</div>
      <div className="flex gap-5 w-1/3 ml-auto ">
        <img className="w-7 h-7" src={cartIcon} alt="cart" />
        <img className="w-7 h-7" src={downloadIcon} alt="download" />
        <img className="w-7 h-7" src={cart2Icon} alt="cart" />
      </div>
    </div>
  );
};

export default Header;
