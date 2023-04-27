import React, { useState } from "react";
import scanner from "../../assets/icons/layout/scanner.png";
import {
  cart2Icon,
  cartIcon,
  downloadIcon,
  profileIcon,
} from "../../assets/icons";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./header.scss";
import Profilemodal from "./profile-modal/profile-modal";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";

const Header = () => {
  const navigate = useNavigate()
  const [profilemodalOpen, setProfileModalOpen] = useState(false);

  const { data }: any = JSON.parse(localStorage.getItem("user") || "{}");

  // Getting Current Date
  const today = new Date();
  const month = today.getMonth() + 1; // January is 0
  const day = today.getDate();
  const year = today.getFullYear();
  const formattedDate = `${month}/${day}/${year}`;

  return (
    <>
      <div className="_header_wrap flex justify-between items-center w-full pt-3 px-5">
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <img
              src={profileIcon}
              alt="profileIcon"
              className="cursor-pointer w-8 h-8"
              onClick={() => setProfileModalOpen(true)}
            />
            <p className="_profile">{data?.first_name}</p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="_header_easyology _primary-color xs:text-lg sm:text-2xl">
              {data?.store_name}
            </span>
            <span className="_profile">{formattedDate}</span>
          </div>
        </div>

        {/* <div className="w-1/3r flex items-center">
          <div>
            <Input
              type="search"
              placeholder="Search by product name"
              prefix={<SearchOutlined />}
              className="w-60 h-8"
            />
          </div>
          <div className="ml-2">
            <img src={scanner} alt="Product Scanner" />
          </div>
        </div> */}

        <div className="flex justify-end xs:gap-4  sm:gap-9 ml-auto">
          <img className="xs:w-5 xs:h-5  sm:w-7 sm:h-7 cursor-pointer" src={cartIcon} alt="cart" />
          <img
            onClick={() => navigate(ROUTE_CONSTANTS.RECENT_INVOICES)}
            className="xs:w-5 xs:h-5  sm:w-7 sm:h-7 cursor-pointer"
            src={downloadIcon}
            alt="download"
          />
          <img className="xs:w-5 xs:h-5  sm:w-7 sm:h-7 cursor-pointer" src={cart2Icon} alt="cart" />
        </div>
      </div>
      <Profilemodal
        profilemodalOpen={profilemodalOpen}
        setProfileModalOpen={setProfileModalOpen}
      />
    </>
  );
};

export default Header;
