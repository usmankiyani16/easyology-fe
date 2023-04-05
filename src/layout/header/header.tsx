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
import Profilemodal from "../../components/Modals/profile-modal/profile-modal";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../routes/route-constants";

const Header = () => {
  const navigate = useNavigate()
  const [profilemodalOpen, setProfileModalOpen] = useState(false);

  // Getting Current Date

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;

  return (
    <>
      <div className="flex justify-between items-center w-full pt-3 px-5">
        <div className="flex gap-2 w-1/3">
          <div>
            <img
              src={profileIcon}
              alt="profileIcon"
              className="cursor-pointer w-8 h-8"
              onClick={() => setProfileModalOpen(true)}
            />
            <p className="_profile">Profile</p>
          </div>

          <div className="flex flex-col justify-center">
            <span className="_header_easyology _primary-color text-2xl">
              Easyology
            </span>
            <span className="_current_date">{date}</span>
          </div>
        </div>

        <div className="w-1/3r flex items-center">
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
        </div>

        <div className="flex justify-end gap-9 ml-auto">
          <img className="w-7 h-7 cursor-pointer" src={cartIcon} alt="cart" />
          <img
            onClick={() => navigate(ROUTE_CONSTANTS.SLASH + ROUTE_CONSTANTS.RECENT_INVOICES)}
            className="w-7 h-7 cursor-pointer"
            src={downloadIcon}
            alt="download"
          />
          <img className="w-7 h-7 cursor-pointer" src={cart2Icon} alt="cart" />
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
