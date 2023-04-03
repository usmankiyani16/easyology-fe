
import React, { FC, useState } from "react";
import scanner from '../../assets/icons/layout/scanner.png'
import {
  cart2Icon,
  cartIcon,
  downloadIcon,
  profileIcon,
} from "../../assets/icons";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import "./header.scss";
import Invoice from '../../components/invoice/invoice'
import { Button, Drawer } from 'antd';



const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const Header: FC<any> = () => {

  
  // Getting Current Date
  const [open, setOpen] = useState(false);
  const showInvoice = () => {setOpen(true);};
  const onClose = () => {setOpen(false);};
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;

  return (
    <div className="flex justify-between items-center w-full pt-3 px-5">
      
      <div className="flex gap-4 w-1/3">
        <img src={profileIcon} />
        <div className="flex flex-col justify-center">
          <span className="_header_easyology _primary-color text-2xl">
            Easyology
          </span>
          <span className="_current_date">{date}</span>
        </div>
      </div>
      {/*  <div className="w-1/3">
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Space>
      </div> */}

      <div className="w-1/3r flex items-center">



        <div>

          <Input type='search' placeholder="Search by product name" prefix={<SearchOutlined />} className='w-60 h-8' />
        </div>
        <div className="ml-2">
          <img src={scanner} alt="Product Scanner" />
        </div>

      </div>

     
      <div className="flex justify-end gap-9 ml-auto">
      
        <img  className="w-7 h-7 cursor-pointer"  src={cartIcon} alt="cart" onClick={showInvoice} />
        <Drawer  className="drawer" placement="right" onClose={onClose} open={open}>
        <Invoice/>
      </Drawer>
        <img className="w-7 h-7 cursor-pointer" src={downloadIcon} alt="download" />
        <img className="w-7 h-7 cursor-pointer" src={cart2Icon} alt="cart2" />
      </div>
    </div>
  );
};

export default Header;
